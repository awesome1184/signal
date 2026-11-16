import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createServer, getServerPort, context, redis, reddit } from '@devvit/web/server';
import { getNewYorkDateKey, MAX_SCORE } from '../shared/game';
import { evaluateAnswer, getTestAnswer } from '../shared/answerBank';
import { getRotatedDailySelection } from './contentRotation';

const app = new Hono();
const boardKey = (day: string) => 'signal:v1:board:' + day;
const resultsKey = (day: string) => 'signal:v1:results:' + day;
const namesKey = (day: string) => 'signal:v1:names:' + day;
const clampScore = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(MAX_SCORE, Math.floor(value))) : 0;
const displayName = (value: unknown) => {
  if (typeof value !== 'string') return 'Explorer';
  const clean = value.replace(/^u\//i, '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 24);
  return clean || 'Explorer';
};
const isTestUser = (value: unknown) => displayName(value).toLowerCase() === 'shadow_fen';

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

app.get('/api/health', (c) => c.json({ ok: true, app: 'SIGNAL' }));

app.get('/api/bootstrap', async (c) => {
  const day = getNewYorkDateKey();
  const daily = await getRotatedDailySelection(day);
  const userId = context.userId;
  const username = displayName(await reddit.getCurrentUsername());
  const raw = userId ? await redis.hGet(resultsKey(day), userId) : null;
  let result = null;
  if (raw) {
    try { result = JSON.parse(raw); }
    catch (error) { console.error('SIGNAL saved result could not be parsed:', error); }
  }
  const playerCount = await redis.zCard(boardKey(day));
  const canTest = isTestUser(username);
  return c.json({
    ok: true,
    dateKey: day,
    username,
    playerCount,
    leaderboard: await leaderboard(day),
    result,
    canTest,
    prompts: daily.prompts,
    selectionMode: daily.mode
  });
});

app.post('/api/check-answer', async (c) => {
  let body: { promptId?: string; answer?: string };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, valid: false, message: 'Malformed answer request.' }, 400); }
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
  if (!answer || answer.length > 80) {
    return c.json({ ok: false, valid: false, message: answer ? 'Answers must be 80 characters or fewer.' : 'Enter an answer first.' }, 400);
  }
  const daily = await getRotatedDailySelection(getNewYorkDateKey());
  const selected = daily.selections.find((prompt) => prompt.id === promptId);
  if (!selected) {
    return c.json({ ok: false, valid: false }, 400);
  }
  const match = evaluateAnswer(selected.questionId, answer, selected.answerId);
  return c.json({ ok: true, valid: Boolean(match), result: match });
});

app.post('/api/test-answer', async (c) => {
  const username = await reddit.getCurrentUsername();
  if (!isTestUser(username)) {
    return c.json({ ok: false, message: 'Test bench access is restricted.' }, 403);
  }
  let body: { promptId?: string; score?: number };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, message: 'Malformed test request.' }, 400); }
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const score = typeof body.score === 'number' ? body.score : 0;
  if (![10, 15, 30, 60, 85, 100].includes(score)) return c.json({ ok: false, message: 'Unknown score tier.' }, 400);
  const daily = await getRotatedDailySelection(getNewYorkDateKey());
  const selected = daily.selections.find((prompt) => prompt.id === promptId);
  if (!selected) return c.json({ ok: false }, 400);
  const answer = getTestAnswer(selected.questionId, score, selected.answerId);
  return c.json({ ok: true, answer });
});

app.post('/api/complete', async (c) => {
  const userId = context.userId;
  if (!userId) return c.json({ ok: false, message: 'Sign in to save a daily result.' }, 401);

  let body: { entries?: Array<{ promptId?: string; answer?: string }> };
  try { body = await c.req.json(); }
  catch { return c.json({ ok: false, message: 'Malformed result request.' }, 400); }
  const day = getNewYorkDateKey();
  const daily = await getRotatedDailySelection(day);
  const prompts = daily.prompts;
  const submitted = Array.isArray(body.entries) ? body.entries : [];
  if (submitted.length !== prompts.length) {
    return c.json({ ok: false, message: 'A daily result must contain all seven transmissions.' }, 400);
  }
  if (submitted.some((item, index) => item?.promptId !== prompts[index].id
    || typeof item?.answer !== 'string' || item.answer.length > 80)) {
    return c.json({ ok: false, message: 'The submitted transmissions are incomplete or invalid.' }, 400);
  }

  const entries = prompts.map((prompt, index) => {
    const item = submitted[index];
    const answer = typeof item?.answer === 'string' ? item.answer.trim() : '';
    const selected = daily.selections[index];
    const match = evaluateAnswer(selected.questionId, answer, selected.answerId);
    return {
      promptId: prompt.id,
      answer,
      score: match?.score ?? 0,
      tier: match?.tier ?? 'NO SIGNAL',
      note: match?.note ?? (answer ? 'No accepted match in the field catalog.' : 'No answer transmitted.')
    };
  });

  const score = entries.reduce((sum, entry) => sum + entry.score, 0);
  const result = { dateKey: day, score, entries, completedAt: new Date().toISOString() };
  const username = displayName(await reddit.getCurrentUsername());
  const stored = await redis.hSetNX(resultsKey(day), userId, JSON.stringify(result));

  if (stored) {
    await redis.hSet(namesKey(day), { [userId]: username });
    await redis.zAdd(boardKey(day), { member: userId, score });
  }

  const savedRaw = await redis.hGet(resultsKey(day), userId);
  const finalResult = savedRaw ? JSON.parse(savedRaw) : result;
  return c.json({
    ok: true,
    alreadyCompleted: !stored,
    result: finalResult,
    playerCount: await redis.zCard(boardKey(day)),
    leaderboard: await leaderboard(day)
  });
});

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