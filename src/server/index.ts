import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createServer, getServerPort, context, redis, reddit } from '@devvit/web/server';
import { getNewYorkDateKey, MAX_SCORE, ROUND_SECONDS } from '../shared/game';
import { evaluateAnswer, getTestAnswer } from '../shared/answerBank';
import { getRotatedDailySelection } from './contentRotation';

const app = new Hono();
const boardKey = (day: string) => 'signal:v1:board:' + day;
const resultsKey = (day: string) => 'signal:v1:results:' + day;
const namesKey = (day: string) => 'signal:v1:names:' + day;
const reportsKey = (day: string) => 'signal:v1:answer-reports:' + day;
const runKey = (day: string, userId: string) => 'signal:v1:run:' + day + ':' + userId;
const MAX_ATTEMPTS_PER_ROUND = 15;
const MIN_ATTEMPT_INTERVAL_MS = 350;
const RUN_RETENTION_SECONDS = 60 * 60 * 24 * 7;
const clampScore = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(MAX_SCORE, Math.floor(value))) : 0;
const displayName = (value: unknown) => {
  if (typeof value !== 'string') return 'Explorer';
  const clean = value.replace(/^u\//i, '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 24);
  return clean || 'Explorer';
};
const isTestUser = (value: unknown) => displayName(value).toLowerCase() === 'shadow_fen';

type StoredEntry = {
  promptId: string;
  answer: string;
  score: number;
  tier: string;
  note: string;
};
type PlayerRun = {
  version: 1;
  dateKey: string;
  phase: 'playing' | 'reveal' | 'complete';
  index: number;
  entries: StoredEntry[];
  deadline: number | null;
  attempts: number;
  lastAttemptAt: number | null;
  lastRejectedAnswer: string;
  completedAt?: string;
};
type MutationPlan<T> = { write: false; value: T } | { write: true; run: PlayerRun; value: T };

function parsePlayerRun(raw: string | null): PlayerRun | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<PlayerRun>;
    if (value.version !== 1 || typeof value.dateKey !== 'string'
      || !['playing', 'reveal', 'complete'].includes(String(value.phase))
      || !Number.isInteger(value.index) || !Array.isArray(value.entries)) return null;
    const entries = value.entries.filter((entry): entry is StoredEntry => Boolean(
      entry && typeof entry.promptId === 'string' && typeof entry.answer === 'string'
      && Number.isFinite(entry.score) && typeof entry.tier === 'string' && typeof entry.note === 'string'
    )).slice(0, 7).map((entry) => ({
      promptId: entry.promptId.slice(0, 100),
      answer: entry.answer.slice(0, 80),
      score: Math.max(0, Math.min(100, Math.floor(entry.score))),
      tier: entry.tier.slice(0, 32),
      note: entry.note.slice(0, 240)
    }));
    const phase = value.phase as PlayerRun['phase'];
    const index = Math.max(0, Math.min(6, Number(value.index)));
    const deadline = typeof value.deadline === 'number' && Number.isFinite(value.deadline) ? value.deadline : null;
    if ((phase === 'playing' && deadline === null) || (phase === 'reveal' && entries.length !== index + 1)
      || (phase === 'complete' && entries.length !== 7)) return null;
    return {
      version: 1,
      dateKey: value.dateKey,
      phase,
      index,
      entries,
      deadline,
      attempts: Number.isFinite(value.attempts) ? Math.max(0, Math.floor(value.attempts!)) : 0,
      lastAttemptAt: Number.isFinite(value.lastAttemptAt) ? value.lastAttemptAt! : null,
      lastRejectedAnswer: typeof value.lastRejectedAnswer === 'string' ? value.lastRejectedAnswer.slice(0, 80) : '',
      ...(typeof value.completedAt === 'string' ? { completedAt: value.completedAt } : {})
    };
  } catch {
    return null;
  }
}

function publicRun(run: PlayerRun | null) {
  if (!run) return null;
  return {
    dateKey: run.dateKey,
    phase: run.phase,
    index: run.index,
    entries: run.entries,
    deadline: run.deadline
  };
}

async function mutatePlayerRun<T>(
  day: string,
  userId: string,
  update: (current: PlayerRun | null) => MutationPlan<T>
): Promise<{ run: PlayerRun | null; value: T }> {
  const key = runKey(day, userId);
  for (let attempt = 0; attempt < 8; attempt++) {
    const transaction = await redis.watch(key);
    const currentRaw = await (transaction.get as unknown as (key: string) => Promise<string | null>)(key);
    const current = parsePlayerRun(currentRaw);
    const plan = update(current);
    if (!plan.write) {
      await transaction.unwatch();
      return { run: current, value: plan.value };
    }
    await transaction.multi();
    await transaction.set(key, JSON.stringify(plan.run));
    const committed = await transaction.exec();
    if (committed !== null) {
      await redis.expire(key, RUN_RETENTION_SECONDS);
      return { run: plan.run, value: plan.value };
    }
    await new Promise((resolve) => setTimeout(resolve, 15 * (attempt + 1)));
  }
  throw new Error('The daily run changed too many times. Please retry.');
}

async function playerRank(day: string, userId: string): Promise<number | null> {
  const [count, rank] = await Promise.all([
    redis.zCard(boardKey(day)),
    redis.zRank(boardKey(day), userId)
  ]);
  return typeof rank === 'number' && rank >= 0 ? count - rank : null;
}

async function leaderboard(day: string) {
  const key = boardKey(day);
  const count = await redis.zCard(key);
  if (!count) return [];
  const rows = await redis.zRange(key, Math.max(0, count - 5), count - 1, { by: 'rank' });
  return Promise.all(rows.reverse().map(async (row) => ({
    name: (await redis.hGet(namesKey(day), row.member)) ?? 'Explorer',
    score: clampScore(row.score)
  })));
}

async function storeCompletedResult(day: string, userId: string, username: string, run: PlayerRun) {
  const score = run.entries.reduce((sum, entry) => sum + entry.score, 0);
  const result = {
    dateKey: day,
    score,
    entries: run.entries,
    completedAt: run.completedAt ?? new Date().toISOString()
  };
  const stored = await redis.hSetNX(resultsKey(day), userId, JSON.stringify(result));
  if (stored) {
    await redis.hSet(namesKey(day), { [userId]: username });
    await redis.zAdd(boardKey(day), { member: userId, score });
  }
  const savedRaw = await redis.hGet(resultsKey(day), userId);
  return savedRaw ? JSON.parse(savedRaw) : result;
}

app.get('/api/health', (c) => c.json({ ok: true, app: 'SIGNAL' }));

app.get('/api/bootstrap', async (c) => {
  const day = getNewYorkDateKey();
  const daily = await getRotatedDailySelection(day);
  const userId = context.userId ?? null;
  const username = displayName(await reddit.getCurrentUsername());
  const raw = userId ? await redis.hGet(resultsKey(day), userId) : null;
  let result = null;
  if (raw) {
    try { result = JSON.parse(raw); }
    catch (error) { console.error('SIGNAL saved result could not be parsed:', error); }
  }
  let run: PlayerRun | null = null;
  if (userId !== null) {
    run = parsePlayerRun(await redis.get(runKey(day, userId)));
  }
  if (!result && run?.phase === 'complete' && userId) {
    result = await storeCompletedResult(day, userId, username, run);
  }
  if (result) run = null;
  return c.json({
    ok: true,
    dateKey: day,
    username,
    playerCount: await redis.zCard(boardKey(day)),
    playerRank: userId ? await playerRank(day, userId) : null,
    leaderboard: await leaderboard(day),
    result,
    run: publicRun(run),
    canTest: isTestUser(username),
    prompts: daily.prompts,
    selectionMode: daily.mode
  });
});

app.post('/api/start', async (c) => {
  const userId = context.userId;
  if (!userId) return c.json({ ok: false, message: 'Sign in to start a daily scan.' }, 401);
  const day = getNewYorkDateKey();
  const username = displayName(await reddit.getCurrentUsername());
  const saved = await redis.hGet(resultsKey(day), userId);
  if (saved) return c.json({ ok: true, completed: true, result: JSON.parse(saved), playerRank: await playerRank(day, userId) });

  const created = await mutatePlayerRun<'existing' | 'started'>(day, userId, (current) => {
    if (current) return { write: false, value: 'existing' as const };
    const now = Date.now();
    const run: PlayerRun = {
      version: 1,
      dateKey: day,
      phase: 'playing',
      index: 0,
      entries: [],
      deadline: now + ROUND_SECONDS * 1000,
      attempts: 0,
      lastAttemptAt: null,
      lastRejectedAnswer: ''
    };
    return { write: true, run, value: 'started' as const };
  });
  if (!created.run) return c.json({ ok: false, message: 'Could not create the daily run. Please retry.' }, 500);
  if (created.run.phase === 'complete') {
    const result = await storeCompletedResult(day, userId, username, created.run);
    return c.json({ ok: true, completed: true, result });
  }
  return c.json({ ok: true, run: publicRun(created.run), resumed: created.value === 'existing' });
});

app.post('/api/check-answer', async (c) => {
  const userId = context.userId;
  let body: { promptId?: string; answer?: string; testMode?: boolean };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, valid: false, message: 'Malformed answer request.' }, 400); }
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
  if (!answer || answer.length > 80) {
    return c.json({ ok: false, valid: false, message: answer ? 'Answers must be 80 characters or fewer.' : 'Enter an answer first.' }, 400);
  }
  const daily = await getRotatedDailySelection(getNewYorkDateKey());
  const selectedIndex = daily.prompts.findIndex((prompt) => prompt.id === promptId);
  if (selectedIndex < 0) return c.json({ ok: false, valid: false, message: 'That transmission is not part of today’s scan.' }, 400);
  const selected = daily.selections[selectedIndex];
  const match = evaluateAnswer(selected.questionId, answer, selected.answerId);

  if (body.testMode) {
    const username = await reddit.getCurrentUsername();
    if (!isTestUser(username)) return c.json({ ok: false, message: 'Test bench access is restricted.' }, 403);
    return c.json({ ok: true, valid: Boolean(match), result: match });
  }
  if (!userId) return c.json({ ok: false, valid: false, message: 'Sign in to submit a daily answer.' }, 401);

  type CheckOutcome =
    | { kind: 'stale' }
    | { kind: 'expired' }
    | { kind: 'limit'; attemptsRemaining: number }
    | { kind: 'fast'; attemptsRemaining: number }
    | { kind: 'accepted'; result: { score: number; tier: string; note: string } }
    | { kind: 'rejected'; attemptsRemaining: number };
  const outcome = await mutatePlayerRun<CheckOutcome>(getNewYorkDateKey(), userId, (current) => {
    if (!current || current.phase !== 'playing' || current.index !== selectedIndex
      || daily.prompts[current.index]?.id !== promptId) {
      return { write: false, value: { kind: 'stale' as const } };
    }
    const now = Date.now();
    if (current.deadline !== null && now >= current.deadline) {
      const timedOut: PlayerRun = {
        ...current,
        phase: 'reveal',
        deadline: null,
        attempts: 0,
        lastAttemptAt: null,
        lastRejectedAnswer: '',
        entries: [...current.entries, {
          promptId,
          answer: '',
          score: 0,
          tier: 'NO SIGNAL',
          note: 'The transmission window closed before an answer arrived.'
        }]
      };
      return { write: true, run: timedOut, value: { kind: 'expired' as const } };
    }
    if (current.attempts >= MAX_ATTEMPTS_PER_ROUND) {
      return { write: false, value: { kind: 'limit' as const, attemptsRemaining: 0 } };
    }
    if (current.lastAttemptAt !== null && now - current.lastAttemptAt < MIN_ATTEMPT_INTERVAL_MS) {
      return { write: false, value: { kind: 'fast' as const, attemptsRemaining: MAX_ATTEMPTS_PER_ROUND - current.attempts } };
    }
    if (match) {
      const accepted: PlayerRun = {
        ...current,
        phase: 'reveal',
        deadline: null,
        attempts: 0,
        lastAttemptAt: null,
        lastRejectedAnswer: '',
        entries: [...current.entries, {
          promptId,
          answer,
          score: match.score,
          tier: match.tier,
          note: match.note
        }]
      };
      return { write: true, run: accepted, value: { kind: 'accepted' as const, result: match } };
    }
    const attempts = current.attempts + 1;
    const rejected: PlayerRun = {
      ...current,
      attempts,
      lastAttemptAt: now,
      lastRejectedAnswer: answer
    };
    return { write: true, run: rejected, value: { kind: 'rejected' as const, attemptsRemaining: MAX_ATTEMPTS_PER_ROUND - attempts } };
  });

  if (outcome.value.kind === 'accepted') {
    return c.json({ ok: true, valid: true, result: outcome.value.result, run: publicRun(outcome.run) });
  }
  if (outcome.value.kind === 'expired') {
    return c.json({ ok: true, valid: false, expired: true, run: publicRun(outcome.run), message: 'The window closed. This round has been recorded as silence.' });
  }
  if (outcome.value.kind === 'limit') {
    return c.json({ ok: false, valid: false, message: 'You have used all 15 attempts for this transmission.', attemptsRemaining: 0 }, 429);
  }
  if (outcome.value.kind === 'fast') {
    return c.json({ ok: false, valid: false, message: 'Give the receiver a moment before trying again.', attemptsRemaining: outcome.value.attemptsRemaining }, 429);
  }
  return c.json({ ok: false, valid: false, message: 'This transmission is no longer active. Refresh to sync your scan.' }, 409);
});

app.post('/api/skip', async (c) => {
  const userId = context.userId;
  if (!userId) return c.json({ ok: false, message: 'Sign in to continue the daily scan.' }, 401);
  let body: { promptId?: string; timeout?: boolean };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, message: 'Malformed request.' }, 400); }
  const day = getNewYorkDateKey();
  const daily = await getRotatedDailySelection(day);
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const selectedIndex = daily.prompts.findIndex((prompt) => prompt.id === promptId);
  if (selectedIndex < 0) return c.json({ ok: false, message: 'Unknown transmission.' }, 400);

  const outcome = await mutatePlayerRun<'stale' | 'early' | 'ok'>(day, userId, (current) => {
    if (!current || current.phase !== 'playing' || current.index !== selectedIndex) {
      return { write: false, value: 'stale' as const };
    }
    const expired = current.deadline !== null && Date.now() >= current.deadline;
    if (body.timeout && !expired) return { write: false, value: 'early' as const };
    const run: PlayerRun = {
      ...current,
      phase: 'reveal',
      deadline: null,
      attempts: 0,
      lastAttemptAt: null,
      lastRejectedAnswer: '',
      entries: [...current.entries, {
        promptId,
        answer: '',
        score: 0,
        tier: 'NO SIGNAL',
        note: expired ? 'The transmission window closed before an answer arrived.' : 'You moved on without transmitting an answer.'
      }]
    };
    return { write: true, run, value: 'ok' as const };
  });
  if (outcome.value === 'early') return c.json({ ok: false, message: 'The transmission window is still open.' }, 409);
  if (outcome.value !== 'ok') return c.json({ ok: false, message: 'This transmission is no longer active. Refresh to sync your scan.' }, 409);
  return c.json({ ok: true, run: publicRun(outcome.run) });
});

app.post('/api/next', async (c) => {
  const userId = context.userId;
  if (!userId) return c.json({ ok: false, message: 'Sign in to continue the daily scan.' }, 401);
  const day = getNewYorkDateKey();
  const username = displayName(await reddit.getCurrentUsername());
  const outcome = await mutatePlayerRun<'missing' | 'complete' | 'not-ready' | 'next'>(day, userId, (current) => {
    if (!current) return { write: false, value: 'missing' as const };
    if (current.phase === 'complete') return { write: false, value: 'complete' as const };
    if (current.phase !== 'reveal') return { write: false, value: 'not-ready' as const };
    if (current.index < 6) {
      const next: PlayerRun = {
        ...current,
        phase: 'playing',
        index: current.index + 1,
        deadline: Date.now() + ROUND_SECONDS * 1000,
        attempts: 0,
        lastAttemptAt: null,
        lastRejectedAnswer: ''
      };
      return { write: true, run: next, value: 'next' as const };
    }
    const complete: PlayerRun = {
      ...current,
      phase: 'complete',
      deadline: null,
      completedAt: new Date().toISOString()
    };
    return { write: true, run: complete, value: 'complete' as const };
  });
  if (!outcome.run) return c.json({ ok: false, message: 'Your daily scan could not be found. Refresh the page and retry.' }, 409);
  if (outcome.value === 'not-ready') return c.json({ ok: false, message: 'Finish the current transmission first.' }, 409);
  if (outcome.value === 'missing') return c.json({ ok: false, message: 'Your daily scan could not be found. Refresh the page and retry.' }, 409);
  if (outcome.run.phase === 'complete') {
    const result = await storeCompletedResult(day, userId, username, outcome.run);
    return c.json({
      ok: true,
      run: publicRun(outcome.run),
      result,
      playerCount: await redis.zCard(boardKey(day)),
      playerRank: await playerRank(day, userId),
      leaderboard: await leaderboard(day)
    });
  }
  return c.json({ ok: true, run: publicRun(outcome.run) });
});

app.post('/api/report-answer', async (c) => {
  const userId = context.userId ?? null;
  if (userId === null) return c.json({ ok: false, message: 'Sign in to report a missing answer.' }, 401);
  let body: { promptId?: string; answer?: string };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, message: 'Malformed report.' }, 400); }
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
  if (!answer || answer.length > 80) return c.json({ ok: false, message: 'Enter an answer of 80 characters or fewer.' }, 400);
  const day = getNewYorkDateKey();
  const run = parsePlayerRun(await redis.get(runKey(day, userId)));
  if (!run || run.phase !== 'playing' || run.lastRejectedAnswer.toLowerCase().replace(/\s+/g, ' ') !== answer.toLowerCase().replace(/\s+/g, ' ')
    || run.entries.length !== run.index) {
    return c.json({ ok: false, message: 'Only a just-rejected answer can be reported.' }, 409);
  }
  const daily = await getRotatedDailySelection(day);
  const selected = daily.selections[run.index];
  if (!selected || daily.prompts[run.index]?.id !== promptId) return c.json({ ok: false, message: 'That transmission is no longer active.' }, 409);
  const fingerprint = answer.toLowerCase().replace(/\s+/g, ' ').slice(0, 80);
  const field = userId + ':' + promptId + ':' + fingerprint;
  await redis.hSet(reportsKey(day), {
    [field]: JSON.stringify({ dateKey: day, userId, promptId, answer, createdAt: new Date().toISOString() })
  });
  return c.json({ ok: true });
});

app.post('/api/test-answer', async (c) => {
  const username = await reddit.getCurrentUsername();
  if (!isTestUser(username)) return c.json({ ok: false, message: 'Test bench access is restricted.' }, 403);
  let body: { promptId?: string; score?: number };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, message: 'Malformed test request.' }, 400); }
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const score = typeof body.score === 'number' ? body.score : 0;
  if (![10, 15, 30, 60, 85, 100].includes(score)) return c.json({ ok: false, message: 'Unknown score tier.' }, 400);
  const daily = await getRotatedDailySelection(getNewYorkDateKey());
  const index = daily.prompts.findIndex((prompt) => prompt.id === promptId);
  if (index < 0) return c.json({ ok: false }, 400);
  const selected = daily.selections[index];
  const answer = getTestAnswer(selected.questionId, score, selected.answerId);
  return c.json({ ok: true, answer });
});

// Legacy client-side final submissions are intentionally disabled. The server now
// records each round as it happens, so a client cannot invent a completed score.
app.post('/api/complete', (c) => c.json({
  ok: false,
  message: 'Daily results are recorded by the server as you play. Refresh to sync your scan.'
}, 410));

app.post('/internal/menu/create-post', async (c) => {
  try {
    const post = await reddit.submitCustomPost({ title: 'SIGNAL // Find the signal in the noise' });
    return c.json({
      navigateTo: 'https://reddit.com/r/' + context.subredditName + '/comments/' + post.id
    });
  } catch (error) {
    console.error('SIGNAL post creation failed:', error);
    return c.json({ showToast: 'Could not create the SIGNAL post.' }, 400);
  }
});

serve({ fetch: app.fetch, createServer, port: getServerPort() });
