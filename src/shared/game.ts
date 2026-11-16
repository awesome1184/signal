import { QUESTION_SUBMISSIONS } from './questionSubmissions/agent-gpt-2026-11-15.js';
import { PHASE_A_AGENT_02_QUESTIONS } from './questionSubmissions/agent-02-phase-a-2026-11-15.js';

export type Prompt = {
  id: string;
  channel: string;
  prompt: string;
  context: string;
  hint: string;
  /** Local-only metadata used by the standalone browser preview's archive fallback. */
  sourcePromptId?: string;
  fallbackAnswerId?: string;
};

export type PromptSelectionMode = 'question' | 'answer';

export type DailyPromptSelection = {
  id: string;
  questionId: string;
  mode: PromptSelectionMode;
  answerId?: string;
};

const PACKS: Prompt[][] = [
  [
    { id: 'night-bird', channel: 'FIELD BIOLOGY', prompt: 'Name a bird that is active at night.', context: 'Think beyond the first bird that comes to mind. The answer must be a real bird species.', hint: 'Listen for the unusual calls of the night.' },
    { id: 'blue-mineral', channel: 'EARTH SCIENCE', prompt: 'Name a naturally blue mineral.', context: 'A mineral, not simply a blue rock or a manufactured pigment.', hint: 'Some minerals are named for their color.' },
    { id: 'echo-place', channel: 'ACOUSTICS', prompt: 'Name a place where an echo can be especially clear.', context: 'Think about the shape and surfaces of the space.', hint: 'Hard surfaces and enclosed spaces help.' },
    { id: 'string-instrument', channel: 'SOUND ARCHIVE', prompt: 'Name a stringed musical instrument.', context: 'Any genuine instrument with vibrating strings counts.', hint: 'Look beyond the familiar orchestra.' },
    { id: 'winter-constellation', channel: 'NIGHT SKY', prompt: 'Name a constellation prominent in the Northern Hemisphere winter sky.', context: 'Use the constellation name, not an individual star.', hint: 'There are small constellations near Orion.' },
    { id: 'radio-receiver', channel: 'RADIO HISTORY', prompt: 'Name a device or technology used to receive radio signals.', context: 'The answer should be a receiver or receiving technology, not a broadcaster.', hint: 'Early radio used a very simple detector.' },
    { id: 'night-wait', channel: 'HUMAN GEOGRAPHY', prompt: 'Name a place where someone might wait late at night.', context: 'A specific kind of public place is better than a vague location.', hint: 'Think about travel, food, or overnight work.' }
  ],
  [
    { id: 'natural-glow', channel: 'NATURAL PHENOMENA', prompt: 'Name something in nature that can produce its own visible light.', context: 'The light must be produced by the thing itself, not just reflected.', hint: 'Look in the sea, forest, or night sky.' },
    { id: 'faint-sound', channel: 'LANGUAGE', prompt: 'Name a word that describes a soft, rustling sound.', context: 'A real word is required. Exact spelling matters.', hint: 'There is a wonderfully old-fashioned word for whispering leaves.' },
    { id: 'distant-view', channel: 'OPTICS', prompt: 'Name an instrument used to view distant objects.', context: 'It can be scientific, navigational, or historical.', hint: 'Some early versions were handheld.' },
    { id: 'many-sides', channel: 'GEOMETRY', prompt: 'Name a polygon with more than six sides.', context: 'Give the name of the shape, not just its number of sides.', hint: 'Try a shape with nine, eleven, or twelve sides.' },
    { id: 'lighthouse-place', channel: 'COASTAL ATLAS', prompt: 'Name a famous lighthouse or lighthouse location.', context: 'A named lighthouse or named coastal landmark qualifies.', hint: 'Some stand on dangerous rocks far offshore.' },
    { id: 'rotating-blades', channel: 'ENGINEERING', prompt: 'Name a machine that uses rotating blades.', context: 'The blades must be part of how the machine works.', hint: 'Think about air, water, or industrial processes.' },
    { id: 'signal-distortion', channel: 'RADIO SCIENCE', prompt: 'Name a phenomenon that can distort a radio signal.', context: 'Think about how a signal travels from transmitter to receiver.', hint: 'The atmosphere itself can bend radio waves.' }
  ],
  [
    { id: 'meteorite-feature', channel: 'SPACE GEOLOGY', prompt: 'Name something that can be found in a meteorite.', context: 'A mineral, structure, or characteristic feature is acceptable.', hint: 'Some meteorites contain tiny rounded grains.' },
    { id: 'shelled-animal', channel: 'FIELD BIOLOGY', prompt: 'Name an animal that has a shell.', context: 'The animal itself must have a shell, not simply live inside a human-made one.', hint: 'There are shelled animals in the sea that look almost prehistoric.' },
    { id: 'old-machine', channel: 'SOUND ARCHIVE', prompt: 'Name a sound an old machine might make.', context: 'Use a recognizable sound word or onomatopoeia.', hint: 'Think of gears, bearings, and moving parts.' },
    { id: 'navigation-tool', channel: 'EXPLORATION', prompt: 'Name an instrument used for navigation.', context: 'It can be modern or historical, on land, at sea, or in the air.', hint: 'Before GPS, navigators used the stars.' },
    { id: 'lens-object', channel: 'OPTICS', prompt: 'Name an object that contains a lens.', context: 'The lens should be a functional part of the object.', hint: 'Some lenses are used to make tiny things visible.' },
    { id: 'ring-forming', channel: 'ASTRONOMY', prompt: 'Name something in nature or space that forms a ring.', context: 'A named structure or phenomenon is ideal.', hint: 'The rings do not have to be around a planet.' },
    { id: 'weather-event', channel: 'ATMOSPHERIC SCIENCE', prompt: 'Name a weather or atmospheric phenomenon.', context: 'A specific, recognized phenomenon is better than a broad weather condition.', hint: 'Some appear as halos, colors, or flashes high above storms.' }
  ]
];

/** All approved questions available to the server-side daily rotation. */
export function getQuestionBank(): Prompt[] {
  return [...PACKS.flat(), ...QUESTION_SUBMISSIONS, ...PHASE_A_AGENT_02_QUESTIONS];
}

/** Resolve a stable question ID without relying on its daily pack position. */
export function getPromptById(id: string): Prompt | undefined {
  return getQuestionBank().find((prompt) => prompt.id === id);
}

/**
 * Static local-preview fallback. The Devvit game replaces this with the
 * Redis-backed, shared daily selection returned by /api/bootstrap.
 */
export function getDailyPrompts(dateKey: string): Prompt[] {
  const timestamp = Date.parse(dateKey + 'T00:00:00Z');
  const dayNumber = Number.isFinite(timestamp) ? Math.floor(timestamp / 86400000) : 0;
  const packIndex = ((dayNumber % PACKS.length) + PACKS.length) % PACKS.length;
  return PACKS[packIndex];
}

export function getNewYorkDateKey(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? '00';
  return part('year') + '-' + part('month') + '-' + part('day');
}

export function formatDay(dateKey: string): string {
  const date = new Date(dateKey + 'T12:00:00Z');
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export const ROUND_SECONDS = 25;
export const MAX_SCORE = 700;