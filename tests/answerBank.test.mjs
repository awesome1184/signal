import test from 'node:test';
import assert from 'node:assert/strict';

const { evaluateAnswer, getAnswerEntries, getTestAnswer, normalizeAnswer } = await import('../node_modules/.cache/signal-test-dist/answerBank.js');
const { getQuestionBank, getPromptById, getDailyPrompts, getNewYorkDateKey } = await import('../node_modules/.cache/signal-test-dist/game.js');
const { parsePlayerRun } = await import('../node_modules/.cache/signal-test-dist/playerRun.js');

test('saved player runs are validated and sanitized before server use', () => {
  const valid = {
    version: 1,
    dateKey: '2026-11-16',
    phase: 'playing',
    index: 0,
    entries: [],
    deadline: 1000,
    attempts: 2.8,
    lastAttemptAt: 500,
    lastRejectedAnswer: 'bad answer'
  };
  assert.deepEqual(parsePlayerRun(JSON.stringify(valid)), {
    ...valid,
    attempts: 2,
    lastAttemptAt: 500
  });

  const sanitizedEntry = {
    promptId: 'p'.repeat(120),
    answer: 'a'.repeat(100),
    score: 140.8,
    tier: 'T'.repeat(40),
    note: 'n'.repeat(300)
  };
  const reveal = parsePlayerRun(JSON.stringify({
    ...valid,
    phase: 'reveal',
    index: 0,
    deadline: null,
    entries: [sanitizedEntry],
    attempts: -4,
    lastAttemptAt: null,
    lastRejectedAnswer: 'r'.repeat(100)
  }));
  assert.ok(reveal);
  assert.equal(reveal.phase, 'reveal');
  assert.equal(reveal.entries[0].promptId.length, 100);
  assert.equal(reveal.entries[0].answer.length, 80);
  assert.equal(reveal.entries[0].score, 100);
  assert.equal(reveal.entries[0].tier.length, 32);
  assert.equal(reveal.entries[0].note.length, 240);
  assert.equal(reveal.attempts, 0);
  assert.equal(reveal.lastRejectedAnswer.length, 80);
  assert.equal(parsePlayerRun(null), null);
  assert.equal(parsePlayerRun('not json'), null);
});

test('saved player runs reject impossible persisted phase and entry combinations', () => {
  const base = {
    version: 1,
    dateKey: '2026-11-16',
    phase: 'playing',
    index: 0,
    entries: [],
    deadline: 1000,
    attempts: 0,
    lastAttemptAt: null,
    lastRejectedAnswer: ''
  };
  assert.equal(parsePlayerRun(JSON.stringify({ ...base, deadline: null })), null);
  assert.equal(parsePlayerRun(JSON.stringify({ ...base, phase: 'reveal', entries: [] })), null);
  assert.equal(parsePlayerRun(JSON.stringify({ ...base, phase: 'complete', entries: [] })), null);
  assert.equal(parsePlayerRun(JSON.stringify({ ...base, phase: 'unknown' })), null);
  assert.equal(parsePlayerRun(JSON.stringify({ ...base, version: 2 })), null);
});

test('globally familiar football clubs are not buried in the deep-cut tier', () => {
  for (const name of [
    'Real Madrid', 'Bayern Munich', 'Borussia Dortmund', 'Juventus', 'AC Milan',
    'Paris Saint-Germain', 'Barcelona', 'Manchester United', 'Man Utd',
    'Liverpool', 'Arsenal', 'Chelsea', 'Manchester City'
  ]) {
    assert.equal(evaluateAnswer('football-club-openfootball', name)?.score, 10, name);
  }
  for (const name of [
    'Atletico Madrid', 'Boca Juniors', 'River Plate', 'Sporting CP', 'Al Ahly',
    'Zamalek', 'Tottenham', 'West Ham', 'Everton', 'Newcastle United',
    'Leeds United', 'Celtic', 'Rangers', 'FC Porto', 'PSV Eindhoven', 'Sevilla FC'
  ]) {
    assert.equal(evaluateAnswer('football-club-openfootball', name)?.score, 15, name);
  }
});

test('passenger-car catalog excludes pickup and commercial truck models', () => {
  const truckModels = [
  "Chevrolet S-10 Pickup",
  "Chevrolet Silverado",
  "Dodge Dakota",
  "Ford F-100",
  "Ford F-250",
  "Ford F-350",
  "Ford F-450",
  "Ford F-550",
  "Ford F-590",
  "Ford F-600",
  "Ford F-700",
  "Ford F-800",
  "Ford Ranger",
  "GMC Canyon",
  "GMC C/K Pickup",
  "GMC P Truck Forward",
  "GMC Sierra",
  "Isuzu Pickup",
  "Mazda B-Series",
  "Mitsubishi Mighty Max",
  "Nissan Frontier",
  "Nissan Pickup",
  "Nissan Titan",
  "Ram 1500",
  "Ram 2500",
  "Ram 3500",
  "Toyota Pick-Up"
];
  for (const model of truckModels) {
    assert.equal(evaluateAnswer('car-model', model), null, model);
  }
  assert.equal(evaluateAnswer('car-model', 'Ford F-150'), null);
});

test('major airports are assigned rarity tiers by ordinary familiarity', () => {
  assert.equal(evaluateAnswer('airport-iata', 'Chicago O\'Hare International Airport')?.score, 10);
  assert.equal(evaluateAnswer('airport-iata', 'ORD')?.score, 10);
  assert.equal(evaluateAnswer('airport-iata', 'Seattle–Tacoma International Airport')?.score, 15);
  assert.equal(evaluateAnswer('airport-iata', 'Miami International Airport')?.score, 15);
  assert.equal(evaluateAnswer('airport-iata', 'Orlando International Airport')?.score, 30);
  assert.equal(evaluateAnswer('airport-iata', 'Dublin Airport')?.score, 30);
  assert.equal(evaluateAnswer('airport-iata', 'Minneapolis–Saint Paul International Airport / Wold–Chamberlain Field')?.score, 60);
  assert.equal(evaluateAnswer('airport-iata', 'Portland International Airport')?.score, 60);
});

test('natural light answers include stars and direct sunlight, not reflected moonlight', () => {
  assert.equal(evaluateAnswer('natural-glow', 'Sun')?.score, 10);
  assert.equal(evaluateAnswer('natural-glow', 'the Sun')?.score, 10);
  assert.equal(evaluateAnswer('natural-glow', 'stars')?.score, 10);
  assert.equal(evaluateAnswer('natural-glow', 'Moon'), null);
});

test('familiar pasta shapes and common football-club names have sensible tiers and aliases', () => {
  assert.equal(evaluateAnswer('pasta-shape', 'Spaghetti')?.score, 10);
  assert.equal(evaluateAnswer('pasta-shape', 'Macaroni')?.score, 10);
  assert.equal(evaluateAnswer('pasta-shape', 'Penne')?.score, 10);
  assert.equal(evaluateAnswer('pasta-shape', 'Lasagna')?.score, 15);
  assert.equal(evaluateAnswer('pasta-shape', 'Farfalle')?.score, 15);
  assert.equal(evaluateAnswer('pasta-shape', 'Ravioli')?.score, 15);
  assert.equal(evaluateAnswer('football-club-openfootball', 'Manchester United')?.answerId, 'manchester united fc');
  assert.equal(evaluateAnswer('football-club-openfootball', 'Man Utd')?.answerId, 'manchester united fc');
  assert.equal(evaluateAnswer('football-club-openfootball', 'PSG')?.answerId, 'paris saint germain');
});

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

test('New York daily boundaries remain correct across both daylight-saving changes', () => {
  assert.equal(getNewYorkDateKey(new Date('2026-03-09T03:59:59Z')), '2026-03-08');
  assert.equal(getNewYorkDateKey(new Date('2026-03-09T04:00:00Z')), '2026-03-09');
  assert.equal(getNewYorkDateKey(new Date('2026-11-02T04:59:59Z')), '2026-11-01');
  assert.equal(getNewYorkDateKey(new Date('2026-11-02T05:00:00Z')), '2026-11-02');
});

test('local preview prompt packs are stable and rotate on a three-day cycle', () => {
  const first = getDailyPrompts('2026-11-16').map((question) => question.id);
  const second = getDailyPrompts('2026-11-17').map((question) => question.id);
  const third = getDailyPrompts('2026-11-18').map((question) => question.id);
  const fourth = getDailyPrompts('2026-11-19').map((question) => question.id);

  assert.equal(first.length, 7);
  assert.equal(new Set(first).size, 7);
  assert.notDeepEqual(first, second);
  assert.notDeepEqual(second, third);
  assert.deepEqual(first, fourth);
  assert.deepEqual(first, getDailyPrompts('2026-11-16').map((question) => question.id));
});

test('every catalog alias resolves to the record that owns it', () => {
  const entries = getAnswerEntries();
  let checkedAliases = 0;

  for (const entry of entries) {
    assert.ok(entry.aliases.length > 0, `expected aliases for ${entry.promptId}: ${entry.canonical}`);
    for (const alias of entry.aliases) {
      const result = evaluateAnswer(entry.promptId, alias);
      assert.ok(result, `expected alias "${alias}" to resolve for ${entry.promptId}`);
      assert.equal(result.answerId, entry.id, `alias collision for "${alias}" in ${entry.promptId}`);
      assert.equal(result.score, entry.score, `score mismatch for alias "${alias}" in ${entry.promptId}`);
      assert.equal(result.tier, entry.tier, `tier mismatch for alias "${alias}" in ${entry.promptId}`);
      checkedAliases++;
    }
  }

  assert.ok(checkedAliases > entries.length, 'expected aliases beyond canonical names');
});

test('question IDs are unique and every answer pool references a defined question', () => {
  const questions = getQuestionBank();
  const ids = new Set(questions.map((question) => question.id));

  assert.ok(questions.length >= 80, 'expected the expanded question bank');
  assert.equal(ids.size, questions.length, 'question IDs must be unique');

  for (const question of questions) {
    assert.ok(getPromptById(question.id), `expected ID lookup for ${question.id}`);
    assert.ok(question.channel.trim(), `missing channel for ${question.id}`);
    assert.ok(question.prompt.trim(), `missing prompt for ${question.id}`);
    assert.ok(question.context.trim(), `missing scope for ${question.id}`);
    assert.ok(question.hint.trim(), `missing hint for ${question.id}`);
  }

  for (const entry of getAnswerEntries()) {
    assert.ok(ids.has(entry.promptId), `orphan answer pool for ${entry.promptId}`);
    assert.equal(getPromptById(entry.promptId)?.id, entry.promptId);
  }
});

test('answer normalization preserves sex markers and folds accents consistently', () => {
  assert.equal(normalizeAnswer('Nidoran♂'), 'nidoran male');
  assert.equal(normalizeAnswer('Nidoran♀'), 'nidoran female');
  assert.equal(normalizeAnswer('São Paulo'), 'sao paulo');
  assert.equal(normalizeAnswer('Bayern München'), 'bayern munchen');
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


test('every answerable question has a familiar 10-point starting answer', () => {
  // Phase-A question definitions can be committed before their Phase-B answer
  // contributions. The production rotation keeps those prompts inactive.
  const answerableQuestionIds = new Set(getAnswerEntries().map((entry) => entry.promptId));
  assert.ok(answerableQuestionIds.size > 0, 'expected at least one answerable question');

  for (const question of getQuestionBank()) {
    if (!answerableQuestionIds.has(question.id)) continue;
    const answer = getTestAnswer(question.id, 10);
    assert.ok(answer, `expected active question ${question.id} to have a 10-point answer`);
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


test('expanded non-exoplanet catalogs accept source-backed long-tail additions', () => {
  assert.equal(evaluateAnswer('pokemon-species', 'Snom')?.score, 100);
  assert.equal(evaluateAnswer('pokemon-species', 'Nidoran male')?.answerId, 'nidoran male');
  assert.equal(evaluateAnswer('pokemon-species', 'Nidoran♂')?.answerId, 'nidoran male');
  assert.equal(evaluateAnswer('pokemon-species', 'Nidoran♀')?.answerId, 'nidoran female');
  assert.equal(evaluateAnswer('pokemon-species', 'Nidoran'), null);
  assert.equal(evaluateAnswer('lunar-crater', 'Aitken')?.score, 85);
  assert.equal(evaluateAnswer('shark-species', 'Bluntnose sixgill shark')?.score, 85);
  assert.ok(evaluateAnswer('ich-heritage-element', 'Yoga'));
});


test('catalog entries exclude non-qualifying landmarks and vehicle types', () => {
  assert.equal(evaluateAnswer('canadian-national-park', 'Rouge National Urban Park'), null);
  assert.equal(evaluateAnswer('unesco-world-heritage', 'Eiffel Tower'), null);
  assert.equal(evaluateAnswer('car-model', 'Ford F-150'), null);
});

test('AKC expansion follows the fully recognized breed register, not FSS candidates', () => {
  assert.equal(evaluateAnswer('akc-dog-breed', 'Barbet')?.score, 60);
  assert.equal(evaluateAnswer('akc-dog-breed', 'Bernese Mountain Dog')?.score, 15);
  assert.equal(evaluateAnswer('akc-dog-breed', 'Nederlandse Kooikerhondje')?.score, 85);
  assert.equal(evaluateAnswer('akc-dog-breed', 'American Leopard Hound'), null);
});

test('2026-11-18 Phase A questions are answer-ready after the separate Phase B catalog commit', () => {
  const ids = [
    'ramsar-wetland-site',
    'unesco-global-geopark',
    'bgci-botanic-garden',
    'glims-glacier',
    'usgs-waterfall',
    'nga-world-port',
    'geonames-island',
    'geonames-cave',
    'geonames-dam',
    'grammy-winning-album',
    'bafta-winning-film',
    'olympic-medalist',
    'mlb-player',
    'ngc-ic-galaxy'
  ];
  const questionIds = new Set(getQuestionBank().map((question) => question.id));
  const entries = getAnswerEntries();
  const batchEntries = entries.filter((entry) => ids.includes(entry.promptId));
  assert.ok(batchEntries.length >= 500, `expected at least 500 archive-ready entries, got ${batchEntries.length}`);

  assert.equal(ids.length, 14);
  const batchAliases = new Set();
  for (const entry of batchEntries) {
    for (const alias of entry.aliases) {
      const normalized = normalizeAnswer(alias);
      assert.ok(!batchAliases.has(normalized), `duplicate normalized alias across the batch: ${alias}`);
      batchAliases.add(normalized);
    }
  }
  for (const id of ids) {
    assert.ok(questionIds.has(id), `expected question catalog entry for ${id}`);
    const pool = entries.filter((entry) => entry.promptId === id);
    assert.ok(pool.length >= 10, `expected a researched answer pool for ${id}`);
    for (const score of [10, 15, 30, 60, 85, 100]) {
      assert.ok(pool.some((entry) => entry.score === score), `expected ${score}-point entry for ${id}`);
    }
    assert.equal(pool.filter((entry) => entry.score === 100).length, 1, `expected exactly one 100-point answer for ${id}`);
    const target = getTestAnswer(id, 100);
    assert.ok(target, `expected a 100-point target for ${id}`);
    assert.equal(evaluateAnswer(id, target)?.score, 100);
    const seenAliases = new Set();
    for (const entry of pool) {
      assert.equal(entry.tier, ({
        10: 'BACKGROUND',
        15: 'FAMILIAR',
        30: 'UNCOMMON',
        60: 'RARE',
        85: 'DEEP CUT',
        100: 'SIGNAL FOUND'
      })[entry.score]);
      for (const alias of entry.aliases) {
        const normalized = normalizeAnswer(alias);
        assert.ok(!seenAliases.has(normalized), `duplicate normalized alias in ${id}: ${alias}`);
        seenAliases.add(normalized);
      }
    }
  }
});
