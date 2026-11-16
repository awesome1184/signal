import { QUESTION_SUBMISSIONS } from './questionSubmissions/agent-gpt-2026-11-15.js';
import { QUESTION_SUBMISSIONS_BATCH_2 } from './questionSubmissions/agent-gpt-2026-11-15-second-batch.js';
import { QUESTION_SUBMISSIONS_BATCH_3 } from './questionSubmissions/agent-gpt-2026-11-16.js';

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
    { id: 'night-bird', channel: 'FIELD BIOLOGY', prompt: 'Name a bird that is active at night.', context: 'Think beyond the first bird that comes to mind. The answer must be a real nocturnal bird species or a recognized kind of nocturnal bird. Mythical creatures do not qualify.', hint: 'Listen for the unusual calls of the night.' },
    { id: 'blue-mineral', channel: 'EARTH SCIENCE', prompt: 'Name a naturally blue mineral.', context: 'A mineral species or mineral variety with a naturally blue color qualifies; a rock made from multiple minerals or a manufactured pigment does not.', hint: 'Some minerals are named for their color.' },
    { id: 'echo-place', channel: 'ACOUSTICS', prompt: 'Name a place where an echo can be especially clear.', context: 'Think about the shape and surfaces of the space.', hint: 'Hard surfaces and enclosed spaces help.' },
    { id: 'string-instrument', channel: 'SOUND ARCHIVE', prompt: 'Name a stringed musical instrument.', context: 'Any genuine instrument with vibrating strings counts.', hint: 'Look beyond the familiar orchestra.' },
    { id: 'winter-constellation', channel: 'NIGHT SKY', prompt: 'Name a constellation prominent in the Northern Hemisphere winter sky.', context: 'Use the constellation name, not an individual star.', hint: 'There are small constellations near Orion.' },
    { id: 'radio-receiver', channel: 'RADIO HISTORY', prompt: 'Name a device or technology used to receive radio signals.', context: 'The answer must be a device or component used to receive or detect radio signals, not a broadcaster or transmitter.', hint: 'Early radio used a very simple detector.' },
    { id: 'night-wait', channel: 'HUMAN GEOGRAPHY', prompt: 'Name a place where someone might wait late at night.', context: 'A specific kind of public place is better than a vague location.', hint: 'Think about travel, food, or overnight work.' }
  ],
  [
    { id: 'natural-glow', channel: 'NATURAL PHENOMENA', prompt: 'Name something in nature that can produce its own visible light.', context: 'The light must be produced by the thing itself, not just reflected.', hint: 'Look in the sea, forest, or night sky.' },
    { id: 'faint-sound', channel: 'LANGUAGE', prompt: 'Name a word for a soft, quiet, or rustling sound.', context: 'A real word for a quiet, soft, or rustling sound is required. Exact spelling matters.', hint: 'There is a wonderfully old-fashioned word for whispering leaves.' },
    { id: 'distant-view', channel: 'OPTICS', prompt: 'Name an instrument used to view distant objects.', context: 'It can be scientific, navigational, or historical.', hint: 'Some early versions were handheld.' },
    { id: 'many-sides', channel: 'GEOMETRY', prompt: 'Name a polygon with more than six sides.', context: 'Give the name of the shape, not just its number of sides.', hint: 'Try a shape with nine, eleven, or twelve sides.' },
    { id: 'lighthouse-place', channel: 'COASTAL ATLAS', prompt: 'Name a kind of place or a specific landmark associated with lighthouses.', context: 'The answer must be either a type of coastal setting where lighthouses are commonly located or a specifically named lighthouse or location associated with one. Generic unrelated locations do not qualify.', hint: 'Some stand on dangerous rocks far offshore.' },
    { id: 'rotating-blades', channel: 'ENGINEERING', prompt: 'Name a machine that uses a rotating mechanism.', context: 'The machine must rely on a rotating assembly, such as blades, a rotor, or rotating cups, as part of its operation.', hint: 'Think about air, water, or industrial processes.' },
    { id: 'signal-distortion', channel: 'RADIO SCIENCE', prompt: 'Name a phenomenon that can distort a radio signal.', context: 'Think about how a signal travels from transmitter to receiver.', hint: 'The atmosphere itself can bend radio waves.' }
  ],
  [
    { id: 'meteorite-feature', channel: 'SPACE GEOLOGY', prompt: 'Name something that can be found in a meteorite.', context: 'A mineral, structure, or characteristic feature is acceptable.', hint: 'Some meteorites contain tiny rounded grains.' },
    { id: 'shelled-animal', channel: 'FIELD BIOLOGY', prompt: 'Name an animal that has a shell.', context: 'The answer must be a shelled animal or a recognized group of shelled animals. A shell or shell plates must be part of the animal itself, not a human-made enclosure.', hint: 'There are shelled animals in the sea that look almost prehistoric.' },
    { id: 'old-machine', channel: 'SOUND ARCHIVE', prompt: 'Name a sound an old machine might make.', context: 'Use a recognizable sound word or onomatopoeia.', hint: 'Think of gears, bearings, and moving parts.' },
    { id: 'navigation-tool', channel: 'EXPLORATION', prompt: 'Name an instrument used for navigation.', context: 'It can be modern or historical, on land, at sea, or in the air.', hint: 'Before GPS, navigators used the stars.' },
    { id: 'lens-object', channel: 'OPTICS', prompt: 'Name an optical device or component that uses a lens.', context: 'A lens must be a functional optical element of the device or component.', hint: 'Some lenses are used to make tiny things visible.' },
    { id: 'ring-forming', channel: 'ASTRONOMY', prompt: 'Name something in nature or space that forms a ring.', context: 'A named structure or phenomenon is ideal.', hint: 'The rings do not have to be around a planet.' },
    { id: 'weather-event', channel: 'ATMOSPHERIC SCIENCE', prompt: 'Name a weather or atmospheric phenomenon.', context: 'A specific, recognized phenomenon is better than a broad weather condition.', hint: 'Some appear as halos, colors, or flashes high above storms.' }
  ]
];

/** All approved questions available to the server-side daily rotation. */
export function getQuestionBank(): Prompt[] {
  return [...PACKS.flat(), ...QUESTION_SUBMISSIONS, ...QUESTION_SUBMISSIONS_BATCH_2, ...QUESTION_SUBMISSIONS_BATCH_3];
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
