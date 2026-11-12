import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createServer, getServerPort, context, redis, reddit } from '@devvit/web/server';
import { getDailyPrompts, getNewYorkDateKey, MAX_SCORE } from '../shared/game';
import { evaluateAnswer } from '../shared/answerBank';

const app = new Hono();
const boardKey = (day: string) => 'signal:v1:board:' + day;
const resultsKey = (day: string) => 'signal:v1:results:' + day;
const namesKey = (day: string) => 'signal:v1:names:' + day;
const clampScore = (value: number) => Math.max(0, Math.min(MAX_SCORE, Math.floor(value)));

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
  const userId = context.userId;
  const username = (await reddit.getCurrentUsername()) ?? 'Explorer';
  const raw = userId ? await redis.hGet(resultsKey(day), userId) : null;
  const result = raw ? JSON.parse(raw) : null;
  const playerCount = await redis.zCard(boardKey(day));
  return c.json({ ok: true, dateKey: day, username, playerCount, leaderboard: await leaderboard(day), result });
});

app.post('/api/check-answer', async (c) => {
  const body = await c.req.json<{ promptId?: string; answer?: string }>();
  const promptId = typeof body.promptId === 'string' ? body.promptId : '';
  const answer = typeof body.answer === 'string' ? body.answer.slice(0, 80) : '';
  const prompts = getDailyPrompts(getNewYorkDateKey());
  if (!prompts.some((prompt) => prompt.id === promptId)) {
    return c.json({ ok: false, valid: false }, 400);
  }
  const match = evaluateAnswer(promptId, answer);
  return c.json({ ok: true, valid: Boolean(match), result: match });
});

app.post('/api/complete', async (c) => {
  const userId = context.userId;
  if (!userId) return c.json({ ok: false, message: 'Sign in to save a daily result.' }, 401);

  const body = await c.req.json<{ entries?: Array<{ promptId?: string; answer?: string }> }>();
  const day = getNewYorkDateKey();
  const prompts = getDailyPrompts(day);
  const submitted = Array.isArray(body.entries) ? body.entries : [];

  const entries = prompts.map((prompt, index) => {
    const item = submitted[index];
    const answer = typeof item?.answer === 'string' ? item.answer.slice(0, 80) : '';
    const match = item?.promptId === prompt.id ? evaluateAnswer(prompt.id, answer) : null;
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
  const username = (await reddit.getCurrentUsername()) ?? 'Explorer';
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