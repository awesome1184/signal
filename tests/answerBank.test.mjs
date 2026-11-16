import test from 'node:test';
import assert from 'node:assert/strict';

const { evaluateAnswer, getAnswerEntries, getTestAnswer } = await import('../node_modules/.cache/signal-test-dist/answerBank.js');
const { getQuestionBank } = await import('../node_modules/.cache/signal-test-dist/game.js');

test('archive questions accept any matching answer in their question catalog', () => {
  const familiar = evaluateAnswer('night-bird', 'owl');
  const uncommon = evaluateAnswer('night-bird', 'tawny frogmouth');
  const deepCut = evaluateAnswer('night-bird', 'oilbird');

  assert.equal(familiar?.score, 10);
  assert.equal(uncommon?.score, 30);
  assert.equal(deepCut?.score, 100);
});

test('catalog evaluation has no selected-answer restriction parameter', () => {
  assert.equal(evaluateAnswer.length, 2);
});

test('every canonical catalog answer remains accepted at its assigned rarity', () => {
  const entries = getAnswerEntries();
  assert.ok(entries.length > 1000, 'expected a substantial answer catalog');

  for (const entry of entries) {
    const result = evaluateAnswer(entry.promptId, entry.canonical);
    assert.ok(result, `expected ${entry.canonical} to be accepted for ${entry.promptId}`);
    assert.equal(result.score, entry.score, `score mismatch for ${entry.promptId}: ${entry.canonical}`);
    assert.equal(result.tier, entry.tier, `tier mismatch for ${entry.promptId}: ${entry.canonical}`);
  }
});


test('every approved question has a familiar 10-point starting answer', () => {
  for (const question of getQuestionBank()) {
    const answer = getTestAnswer(question.id, 10);
    assert.ok(answer, `expected ${question.id} to have a 10-point answer`);
    assert.ok(evaluateAnswer(question.id, answer), `expected ${answer} to be accepted for ${question.id}`);
  }
});

test('reference catalogs preserve familiar anchors and common aliases', () => {
  assert.equal(evaluateAnswer('holocene-volcano', 'Mount Fuji')?.score, 10);
  assert.equal(evaluateAnswer('holocene-volcano', 'Etna')?.score, 10);
  assert.equal(evaluateAnswer('holocene-volcano', 'Krakatoa')?.score, 10);
  assert.equal(evaluateAnswer('holocene-volcano', 'Santorini')?.score, 85);
  assert.equal(evaluateAnswer('confirmed-exoplanet', 'Sirius')?.score, 10);
  assert.equal(evaluateAnswer('confirmed-exoplanet', '55 Cnc e')?.score, 30);
  assert.equal(evaluateAnswer('confirmed-exoplanet', 'Kepler-1000 b')?.score, 100);
  assert.equal(evaluateAnswer('confirmed-exoplanet', 'Kepler-1000b')?.score, 100);
});

test('test-bench answers are drawn from the whole question catalog', () => {
  const entries = getAnswerEntries();
  for (const score of [10, 15, 30, 60, 85, 100]) {
    const entry = entries.find((candidate) => candidate.score === score);
    assert.ok(entry, `expected catalog entry for ${score} points`);
    const answer = getTestAnswer(entry.promptId, score);
    assert.ok(answer, `expected a test answer for ${entry.promptId} at ${score}`);
    assert.equal(evaluateAnswer(entry.promptId, answer)?.score, score);
  }
});
