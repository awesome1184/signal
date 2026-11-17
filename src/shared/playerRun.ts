export type StoredEntry = {
  promptId: string;
  answer: string;
  score: number;
  tier: string;
  note: string;
};

export type PlayerRun = {
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

export function parsePlayerRun(raw: string | null): PlayerRun | null {
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
