import { redis } from '@devvit/web/server';
import { getPromptById, getQuestionBank, type DailyPromptSelection, type Prompt } from '../shared/game';
import { getAnswerEntries, type AnswerEntry } from '../shared/answerBank';

type SavedDailySelection = {
  mode: 'questions' | 'mixed' | 'answer-fallback';
  prompts: DailyPromptSelection[];
};

type RotationState = {
  version: 1;
  // Question IDs stay here permanently once used in a published daily set.
  usedQuestionIds: Record<string, string>;
  // Answer IDs retain their last selected day. Entries older than 30 days are pruned.
  usedAnswerIds: Record<string, string>;
  // Keep recent daily selections for audit/debugging; the permanent maps prevent repeats.
  daily: Record<string, SavedDailySelection>;
};

export type ResolvedDailySelection = {
  mode: SavedDailySelection['mode'];
  prompts: Prompt[];
  // Private server-side mapping; never serialize this array to the browser.
  selections: DailyPromptSelection[];
};

const ROTATION_KEY = 'signal:v1:content-rotation';
const DAILY_PROMPT_COUNT = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

function emptyState(): RotationState {
  return { version: 1, usedQuestionIds: {}, usedAnswerIds: {}, daily: {} };
}

function parseState(raw: string | null): RotationState {
  if (!raw) return emptyState();
  try {
    const value = JSON.parse(raw) as Partial<RotationState>;
    return {
      version: 1,
      usedQuestionIds: value.usedQuestionIds && typeof value.usedQuestionIds === 'object' ? value.usedQuestionIds : {},
      usedAnswerIds: value.usedAnswerIds && typeof value.usedAnswerIds === 'object' ? value.usedAnswerIds : {},
      daily: value.daily && typeof value.daily === 'object' ? value.daily : {}
    };
  } catch {
    console.error('SIGNAL content rotation state was unreadable; starting a fresh rotation state.');
    return emptyState();
  }
}

function dayNumber(dayKey: string): number {
  const timestamp = Date.parse(dayKey + 'T00:00:00Z');
  return Number.isFinite(timestamp) ? Math.floor(timestamp / DAY_MS) : 0;
}

function daysSince(today: string, earlier: string): number {
  return dayNumber(today) - dayNumber(earlier);
}

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function pruneHistory(state: RotationState, today: string): void {
  for (const [answerId, usedOn] of Object.entries(state.usedAnswerIds)) {
    if (daysSince(today, usedOn) > 30 || daysSince(today, usedOn) < 0) {
      delete state.usedAnswerIds[answerId];
    }
  }
  for (const [date, selection] of Object.entries(state.daily)) {
    if (daysSince(today, date) > 30 || daysSince(today, date) < 0) {
      delete state.daily[date];
    }
  }
}

function chooseDailySelection(state: RotationState, dateKey: string): SavedDailySelection {
  // Phase-A question commits stay inactive until Phase-B adds at least one approved answer.
  const answerableQuestionIds = new Set(getAnswerEntries().map((answer) => answer.promptId));
  const unusedQuestions = shuffle(
    getQuestionBank().filter((question) => answerableQuestionIds.has(question.id) && !state.usedQuestionIds[question.id])
  );
  const selectedQuestions = unusedQuestions.slice(0, DAILY_PROMPT_COUNT);
  const prompts: DailyPromptSelection[] = selectedQuestions.map((question) => ({
    id: question.id,
    questionId: question.id,
    mode: 'question'
  }));

  for (const question of selectedQuestions) {
    state.usedQuestionIds[question.id] = dateKey;
  }

  const remainingSlots = DAILY_PROMPT_COUNT - prompts.length;
  if (remainingSlots > 0) {
    const allAnswers = getAnswerEntries();
    const recentAnswerIds = new Set(
      Object.entries(state.usedAnswerIds)
        .filter(([, usedOn]) => {
          const age = daysSince(dateKey, usedOn);
          return age >= 1 && age <= 7;
        })
        .map(([answerId]) => answerId)
    );
    const usedSourceQuestionIds = new Set(prompts.map((prompt) => prompt.questionId));
    const freshAnswers = shuffle(allAnswers.filter((answer) => !recentAnswerIds.has(answer.id)));
    const selectedAnswers: AnswerEntry[] = [];
    const selectedAnswerIds = new Set<string>();

    // Prefer archive answers from question categories not already appearing today.
    for (const answer of freshAnswers) {
      if (selectedAnswers.length >= remainingSlots) break;
      if (usedSourceQuestionIds.has(answer.promptId)) continue;
      selectedAnswers.push(answer);
      selectedAnswerIds.add(answer.id);
      usedSourceQuestionIds.add(answer.promptId);
    }

    // If category variety is limited, use other fresh answer records before repeating any recent answer.
    if (selectedAnswers.length < remainingSlots) {
      for (const answer of freshAnswers) {
        if (selectedAnswers.length >= remainingSlots) break;
        if (selectedAnswerIds.has(answer.id)) continue;
        selectedAnswers.push(answer);
        selectedAnswerIds.add(answer.id);
      }
    }

    // Only if fewer than seven fresh answer records exist, reuse the stalest records
    // to preserve the seven-transmission daily format.
    if (selectedAnswers.length < remainingSlots) {
      const staleAnswers = shuffle(allAnswers.filter((answer) => !selectedAnswerIds.has(answer.id)))
        .sort((left, right) => {
          const leftDate = state.usedAnswerIds[left.id] ?? '0000-00-00';
          const rightDate = state.usedAnswerIds[right.id] ?? '0000-00-00';
          return leftDate.localeCompare(rightDate);
        });
      for (const answer of staleAnswers) {
        if (selectedAnswers.length >= remainingSlots) break;
        selectedAnswers.push(answer);
        selectedAnswerIds.add(answer.id);
      }
    }

    if (selectedAnswers.length < remainingSlots) {
      throw new Error('SIGNAL does not have enough distinct answer records to fill today\'s seven transmissions.');
    }

    selectedAnswers.forEach((answer, index) => {
      prompts.push({
        id: 'archive-' + dateKey + '-' + (index + 1),
        questionId: answer.promptId,
        answerId: answer.id,
        mode: 'answer'
      });
      state.usedAnswerIds[answer.id] = dateKey;
    });
  }

  return {
    mode: prompts.every((prompt) => prompt.mode === 'question')
      ? 'questions'
      : prompts.every((prompt) => prompt.mode === 'answer')
        ? 'answer-fallback'
        : 'mixed',
    prompts
  };
}

function hydrateSelection(selection: SavedDailySelection): ResolvedDailySelection {
  const prompts = selection.prompts.map((selected) => {
    const source = getPromptById(selected.questionId);
    if (!source) {
      throw new Error('SIGNAL daily selection references missing question: ' + selected.questionId);
    }
    if (selected.mode === 'question') return source;
    return {
      ...source,
      id: selected.id,
      channel: 'ARCHIVE // ' + source.channel,
      context: 'Archive fallback: this transmission has one randomly selected answer that has not appeared in the previous seven days. ' + source.context
    };
  });
  return { mode: selection.mode, prompts, selections: selection.prompts };
}

/**
 * Returns one installation-wide daily selection. WATCH/MULTI/EXEC ensures
 * only one concurrent request can publish and reserve the day's questions.
 */
export async function getRotatedDailySelection(dateKey: string): Promise<ResolvedDailySelection> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const transaction = await redis.watch(ROTATION_KEY);
    const raw = await transaction.get(ROTATION_KEY);
    const state = parseState(raw);
    const existing = state.daily[dateKey];

    if (existing && Array.isArray(existing.prompts) && existing.prompts.length === DAILY_PROMPT_COUNT) {
      await transaction.unwatch();
      return hydrateSelection(existing);
    }

    pruneHistory(state, dateKey);
    const selection = chooseDailySelection(state, dateKey);
    state.daily[dateKey] = selection;

    await transaction.multi();
    await transaction.set(ROTATION_KEY, JSON.stringify(state));
    const committed = await transaction.exec();
    if (committed !== null) {
      return hydrateSelection(selection);
    }

    // A concurrent request changed the rotation state. Read the winner's state and retry.
    await new Promise((resolve) => setTimeout(resolve, 20 * (attempt + 1)));
  }

  throw new Error('SIGNAL could not reserve the shared daily question set after repeated concurrent updates.');
}
