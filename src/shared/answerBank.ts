import { ANSWER_SUBMISSIONS_BATCH_2 } from './answerSubmissions/agent-gpt-2026-11-15-second-batch.js';
import { ANSWER_SUBMISSIONS_BATCH_3 } from './answerSubmissions/agent-gpt-2026-11-16.js';
import { ANSWER_SUBMISSIONS_ACCESSIBILITY } from './answerSubmissions/agent-gpt-2026-11-16-accessibility.js';
import { ANSWER_SUBMISSIONS_CORE_EXPANSION } from './answerSubmissions/agent-gpt-2026-11-16-core-expansion.js';

export type AnswerResult = { score: number; tier: string; note: string; answerId?: string };
export type AnswerRecord = AnswerResult & { aliases: string[] };

export type AnswerEntry = {
  id: string;
  promptId: string;
  canonical: string;
  aliases: string[];
  score: number;
  tier: string;
  note: string;
};

const BASE_BANK: Record<string, AnswerRecord[]> = {
  ...ANSWER_SUBMISSIONS_BATCH_2,
  ...ANSWER_SUBMISSIONS_BATCH_3,
  ...ANSWER_SUBMISSIONS_ACCESSIBILITY,
  'night-bird': [
    { aliases: ['owl'], score: 10, tier: 'BACKGROUND', note: 'A familiar night hunter.' },
    { aliases: ['barn owl', 'western barn owl'], score: 15, tier: 'FAMILIAR', note: 'A specific species, though widely known.' },
    { aliases: ['tawny frogmouth', 'tawny frog mouth'], score: 30, tier: 'UNCOMMON', note: 'A nocturnal bird with remarkable camouflage.' },
    { aliases: ['nightjar', 'night jar'], score: 60, tier: 'RARE', note: 'A well-hidden nocturnal bird with a distinctive call.' },
    { aliases: ['potoo'], score: 85, tier: 'DEEP CUT', note: 'A master of camouflage from Central and South America.' },
    { aliases: ['oilbird', 'oil bird', 'guacharo'], score: 100, tier: 'SIGNAL FOUND', note: 'A cave-dwelling bird that navigates with echolocation.' }
  ],
  'blue-mineral': [
    { aliases: ['turquoise'], score: 10, tier: 'BACKGROUND', note: 'A familiar blue-green mineral.' },
    { aliases: ['aquamarine', 'blue beryl'], score: 15, tier: 'FAMILIAR', note: 'A blue variety of beryl.' },
    { aliases: ['lazurite', 'blue lazurite'], score: 30, tier: 'UNCOMMON', note: 'A naturally blue mineral that is a principal component of lapis lazuli.' },
    { aliases: ['sodalite', 'blue sodalite'], score: 60, tier: 'RARE', note: 'A rich blue mineral often used ornamentally.' },
    { aliases: ['azurite', 'blue azurite'], score: 85, tier: 'DEEP CUT', note: 'A vivid copper mineral with intense blue color.' },
    { aliases: ['vivianite', 'blue vivianite'], score: 100, tier: 'SIGNAL FOUND', note: 'A phosphate mineral that can form deep-blue crystals.' }
  ],
  'echo-place': [
    { aliases: ['empty hall', 'hall', 'empty auditorium'], score: 10, tier: 'BACKGROUND', note: 'A familiar reflective space.' },
    { aliases: ['cave', 'limestone cave'], score: 15, tier: 'FAMILIAR', note: 'A classic place to hear an echo.' },
    { aliases: ['canyon', 'canyons'], score: 30, tier: 'UNCOMMON', note: 'Steep rock walls can return a strong echo.' },
    { aliases: ['tunnel', 'railway tunnel', 'road tunnel'], score: 30, tier: 'UNCOMMON', note: 'A long, hard-sided passage reflects sound.' },
    { aliases: ['cistern'], score: 60, tier: 'RARE', note: 'An underground tank can make sound linger.' },
    { aliases: ['slot canyon'], score: 100, tier: 'SIGNAL FOUND', note: 'A narrow canyon can produce focused echoes.' }
  ],
  'string-instrument': [
    { aliases: ['guitar', 'violin', 'cello'], score: 10, tier: 'BACKGROUND', note: 'A very familiar string instrument.' },
    { aliases: ['harp', 'concert harp'], score: 15, tier: 'FAMILIAR', note: 'A classic plucked instrument.' },
    { aliases: ['banjo', 'five string banjo'], score: 30, tier: 'UNCOMMON', note: 'A plucked instrument with a resonator.' },
    { aliases: ['erhu', 'chinese violin'], score: 60, tier: 'RARE', note: 'A two-string bowed instrument from China.' },
    { aliases: ['nyckelharpa'], score: 85, tier: 'DEEP CUT', note: 'A keyed fiddle from Sweden.' },
    { aliases: ['hardanger fiddle', 'hardingfele'], score: 100, tier: 'SIGNAL FOUND', note: 'A Norwegian fiddle with sympathetic strings.' }
  ],
  'winter-constellation': [
    { aliases: ['orion'], score: 10, tier: 'BACKGROUND', note: 'One of the easiest winter constellations to recognize.' },
    { aliases: ['taurus'], score: 15, tier: 'FAMILIAR', note: 'A prominent constellation near Orion.' },
    { aliases: ['gemini'], score: 30, tier: 'UNCOMMON', note: 'The Twins are especially visible in winter.' },
    { aliases: ['auriga', 'the charioteer'], score: 60, tier: 'RARE', note: 'A winter constellation surrounding Capella.' },
    { aliases: ['lepus'], score: 85, tier: 'DEEP CUT', note: 'The Hare sits just below Orion.' },
    { aliases: ['monoceros', 'the unicorn'], score: 100, tier: 'SIGNAL FOUND', note: 'The faint Unicorn lies between familiar winter patterns.' }
  ],
  'radio-receiver': [
    { aliases: ['radio', 'am radio', 'fm radio'], score: 10, tier: 'BACKGROUND', note: 'The everyday receiver.' },
    { aliases: ['car stereo'], score: 15, tier: 'FAMILIAR', note: 'A radio receiver built into a vehicle.' },
    { aliases: ['radio scanner', 'scanner'], score: 30, tier: 'UNCOMMON', note: 'A receiver that searches across radio frequencies.' },
    { aliases: ['crystal radio', 'crystal set', 'crystal receiver'], score: 60, tier: 'RARE', note: 'An early receiver that can work without a battery.' },
    { aliases: ['software defined radio', 'software-defined radio', 'sdr'], score: 85, tier: 'DEEP CUT', note: 'A receiver that uses software to process radio signals.' },
    { aliases: ['coherer'], score: 100, tier: 'SIGNAL FOUND', note: 'An early radio-wave detector used in wireless receivers.' }
  ],
  'night-wait': [
    { aliases: ['bus stop', 'bus shelter'], score: 10, tier: 'BACKGROUND', note: 'A familiar late-night waiting place.' },
    { aliases: ['train station', 'railway station'], score: 15, tier: 'FAMILIAR', note: 'A place where late services bring people together.' },
    { aliases: ['airport'], score: 30, tier: 'UNCOMMON', note: 'Airports are built for waiting at all hours.' },
    { aliases: ['ferry terminal', 'ferry station'], score: 60, tier: 'RARE', note: 'A less expected place to wait for departure.' },
    { aliases: ['all night diner', '24 hour diner'], score: 85, tier: 'DEEP CUT', note: 'A late-night refuge for travelers and shift workers.' },
    { aliases: ['observatory'], score: 100, tier: 'SIGNAL FOUND', note: 'A fitting place to wait for the sky to reveal something.' }
  ],
  'natural-glow': [
    { aliases: ['firefly', 'lightning bug'], score: 10, tier: 'BACKGROUND', note: 'A familiar bioluminescent insect.' },
    { aliases: ['glowworm', 'glow worm'], score: 15, tier: 'FAMILIAR', note: 'Several species use light to attract prey.' },
    { aliases: ['bioluminescent plankton'], score: 30, tier: 'UNCOMMON', note: 'Tiny organisms can make waves glow blue.' },
    { aliases: ['foxfire', 'fox fire'], score: 60, tier: 'RARE', note: 'A faint glow produced by fungi in decaying wood.' },
    { aliases: ['atolla jellyfish', 'atolla', 'alarm jelly'], score: 85, tier: 'DEEP CUT', note: 'A deep-sea jellyfish that emits flashes of blue bioluminescence.' },
    { aliases: ['sea sparkle', 'sea sparkles', 'noctiluca scintillans'], score: 100, tier: 'SIGNAL FOUND', note: 'A plankton species that can make the sea sparkle.' }
  ],
  'faint-sound': [
    { aliases: ['whisper'], score: 10, tier: 'BACKGROUND', note: 'A familiar soft sound.' },
    { aliases: ['rustle'], score: 15, tier: 'FAMILIAR', note: 'A light sound made by leaves or paper.' },
    { aliases: ['murmur'], score: 30, tier: 'UNCOMMON', note: 'A low, indistinct sound.' },
    { aliases: ['susurrus'], score: 60, tier: 'RARE', note: 'A soft whispering or rustling sound.' },
    { aliases: ['susurration'], score: 85, tier: 'DEEP CUT', note: 'The act or sound of whispering or rustling.' },
    { aliases: ['sough'], score: 100, tier: 'SIGNAL FOUND', note: 'A low rushing sound, often made by the wind.' }
  ],
  'distant-view': [
    { aliases: ['telescope'], score: 10, tier: 'BACKGROUND', note: 'The familiar instrument for distant objects.' },
    { aliases: ['binoculars', 'field glasses'], score: 15, tier: 'FAMILIAR', note: 'A portable paired optical instrument.' },
    { aliases: ['spyglass', 'spy glass'], score: 30, tier: 'UNCOMMON', note: 'A small handheld telescope.' },
    { aliases: ['sextant', 'marine sextant'], score: 60, tier: 'RARE', note: 'A navigational instrument that measures angles.' },
    { aliases: ['theodolite'], score: 85, tier: 'DEEP CUT', note: 'A precision instrument for measuring angles.' },
    { aliases: ['astrolabe', 'planispheric astrolabe'], score: 100, tier: 'SIGNAL FOUND', note: 'A historical instrument used to model the sky.' }
  ],
  'many-sides': [
    { aliases: ['octagon'], score: 10, tier: 'BACKGROUND', note: 'An eight-sided polygon.' },
    { aliases: ['heptagon'], score: 15, tier: 'FAMILIAR', note: 'A seven-sided polygon.' },
    { aliases: ['nonagon'], score: 30, tier: 'UNCOMMON', note: 'A nine-sided polygon.' },
    { aliases: ['decagon'], score: 30, tier: 'UNCOMMON', note: 'A ten-sided polygon.' },
    { aliases: ['hendecagon', 'undecagon', '11 gon'], score: 60, tier: 'RARE', note: 'An eleven-sided polygon.' },
    { aliases: ['dodecagon', '12 gon'], score: 85, tier: 'DEEP CUT', note: 'A twelve-sided polygon.' },
    { aliases: ['enneadecagon'], score: 100, tier: 'SIGNAL FOUND', note: 'A nineteen-sided polygon.' }
  ],
  'lighthouse-place': [
    { aliases: ['coast'], score: 10, tier: 'BACKGROUND', note: 'A broad coastal setting.' },
    { aliases: ['island'], score: 15, tier: 'FAMILIAR', note: 'Many lighthouses stand on islands.' },
    { aliases: ['harbor'], score: 30, tier: 'UNCOMMON', note: 'Harbors often rely on lighthouse signals.' },
    { aliases: ['cape hatteras lighthouse', 'cape hatteras', 'cape hatteras light'], score: 60, tier: 'RARE', note: 'A well-known lighthouse on North Carolina’s Outer Banks.' },
    { aliases: ['bass rock lighthouse', 'bass rock'], score: 85, tier: 'DEEP CUT', note: 'A lighthouse on an island in the Firth of Forth.' },
    { aliases: ['eddystone lighthouse', 'eddystone', 'eddystone light'], score: 100, tier: 'SIGNAL FOUND', note: 'A famous lighthouse on a reef off Devon.' }
  ],
  'rotating-blades': [
    { aliases: ['fan', 'ceiling fan', 'desk fan'], score: 10, tier: 'BACKGROUND', note: 'A common machine with rotating blades.' },
    { aliases: ['helicopter'], score: 15, tier: 'FAMILIAR', note: 'Its rotor blades provide lift.' },
    { aliases: ['turbine', 'water turbine', 'wind turbine'], score: 30, tier: 'UNCOMMON', note: 'A rotating machine that extracts energy from a fluid.' },
    { aliases: ['propeller', 'boat propeller', 'aircraft propeller'], score: 60, tier: 'RARE', note: 'Rotating blades push a vehicle through air or water.' },
    { aliases: ['centrifuge'], score: 85, tier: 'DEEP CUT', note: 'A spinning rotor separates materials by density.' },
    { aliases: ['anemometer'], score: 100, tier: 'SIGNAL FOUND', note: 'A wind instrument with rotating cups or blades.' }
  ],
  'signal-distortion': [
    { aliases: ['static'], score: 10, tier: 'BACKGROUND', note: 'The familiar crackle of interference.' },
    { aliases: ['interference'], score: 15, tier: 'FAMILIAR', note: 'Unwanted signals can disrupt reception.' },
    { aliases: ['multipath', 'multipath propagation', 'multipath interference'], score: 30, tier: 'UNCOMMON', note: 'A signal arrives by multiple paths and interferes with itself.' },
    { aliases: ['ionosphere'], score: 60, tier: 'RARE', note: 'Changes in the ionosphere can alter radio propagation.' },
    { aliases: ['tropospheric ducting', 'tropospheric propagation'], score: 85, tier: 'DEEP CUT', note: 'Atmospheric layers can trap and carry radio waves unusually far.' },
    { aliases: ['sporadic e', 'sporadic-e'], score: 100, tier: 'SIGNAL FOUND', note: 'Intense ionization can unexpectedly alter VHF propagation.' }
  ],
  'meteorite-feature': [
    { aliases: ['iron'], score: 10, tier: 'BACKGROUND', note: 'Iron is common in many meteorites.' },
    { aliases: ['nickel'], score: 15, tier: 'FAMILIAR', note: 'Nickel is a useful clue in identifying meteorites.' },
    { aliases: ['olivine'], score: 30, tier: 'UNCOMMON', note: 'A common mineral in stony meteorites.' },
    { aliases: ['chondrule', 'chondrules'], score: 60, tier: 'RARE', note: 'A small rounded grain formed from molten droplets.' },
    { aliases: ['regmaglypt', 'regmaglypts', 'regmaglyptic feature'], score: 85, tier: 'DEEP CUT', note: 'Thumbprint-like depressions formed during atmospheric passage.' },
    { aliases: ['widmanstatten pattern', 'widmanstatten'], score: 100, tier: 'SIGNAL FOUND', note: 'A crystalline pattern in iron meteorites.' }
  ],
  'shelled-animal': [
    { aliases: ['turtle'], score: 10, tier: 'BACKGROUND', note: 'A familiar shelled reptile.' },
    { aliases: ['snail'], score: 15, tier: 'FAMILIAR', note: 'A familiar mollusk with a coiled shell.' },
    { aliases: ['clam'], score: 30, tier: 'UNCOMMON', note: 'A bivalve with two hinged shell halves.' },
    { aliases: ['nautilus', 'chambered nautilus'], score: 60, tier: 'RARE', note: 'A cephalopod with a chambered external shell.' },
    { aliases: ['chiton', 'coat of mail shell'], score: 85, tier: 'DEEP CUT', note: 'A marine mollusk with eight overlapping shell plates.' },
    { aliases: ['monoplacophoran'], score: 100, tier: 'SIGNAL FOUND', note: 'A deep-sea mollusk with a single cap-like shell.' }
  ],
  'old-machine': [
    { aliases: ['hum'], score: 10, tier: 'BACKGROUND', note: 'A familiar continuous mechanical sound.' },
    { aliases: ['rattle'], score: 15, tier: 'FAMILIAR', note: 'Loose parts can make a machine rattle.' },
    { aliases: ['clank'], score: 30, tier: 'UNCOMMON', note: 'A sharp metallic impact.' },
    { aliases: ['chuff'], score: 60, tier: 'RARE', note: 'A short rhythmic puffing sound.' },
    { aliases: ['whirr', 'whir', 'whirring'], score: 85, tier: 'DEEP CUT', note: 'A steady spinning or mechanical sound.' },
    { aliases: ['chatter'], score: 100, tier: 'SIGNAL FOUND', note: 'A rapid series of short mechanical clicks or impacts.' }
  ],
  'navigation-tool': [
    { aliases: ['compass'], score: 10, tier: 'BACKGROUND', note: 'The familiar direction-finding instrument.' },
    { aliases: ['sextant'], score: 15, tier: 'FAMILIAR', note: 'A classic instrument for celestial navigation.' },
    { aliases: ['astrolabe'], score: 30, tier: 'UNCOMMON', note: 'A historical instrument used to solve problems involving stars.' },
    { aliases: ['theodolite'], score: 60, tier: 'RARE', note: 'A surveying instrument for measuring angles.' },
    { aliases: ['octant'], score: 85, tier: 'DEEP CUT', note: 'A predecessor to the sextant.' },
    { aliases: ['nocturnal'], score: 100, tier: 'SIGNAL FOUND', note: 'A historical instrument for telling time at night from the stars.' }
  ],
  'lens-object': [
    { aliases: ['camera'], score: 10, tier: 'BACKGROUND', note: 'A common optical device.' },
    { aliases: ['microscope'], score: 15, tier: 'FAMILIAR', note: 'A device that uses lenses to magnify small objects.' },
    { aliases: ['projector'], score: 30, tier: 'UNCOMMON', note: 'A lens focuses and enlarges an image.' },
    { aliases: ['loupe'], score: 60, tier: 'RARE', note: 'A small magnifying lens used by jewelers and watchmakers.' },
    { aliases: ['fresnel lens', 'fresnel lighthouse lens'], score: 85, tier: 'DEEP CUT', note: 'A thin lens made of concentric sections, often used in lighthouses.' },
    { aliases: ['barlow lens'], score: 100, tier: 'SIGNAL FOUND', note: 'An auxiliary lens used to increase a telescope’s effective focal length.' }
  ],
  'ring-forming': [
    { aliases: ['tree'], score: 10, tier: 'BACKGROUND', note: 'Many trees form annual growth rings.' },
    { aliases: ['saturn'], score: 15, tier: 'FAMILIAR', note: 'The best-known ringed planet.' },
    { aliases: ['atoll'], score: 30, tier: 'UNCOMMON', note: 'A ring-shaped coral reef around a lagoon.' },
    { aliases: ['fairy ring', 'mushroom ring'], score: 60, tier: 'RARE', note: 'A naturally occurring ring of mushrooms.' },
    { aliases: ['ring nebula', 'messier 57', 'm57'], score: 85, tier: 'DEEP CUT', note: 'A planetary nebula with a ring-like appearance.' },
    { aliases: ['einstein ring'], score: 100, tier: 'SIGNAL FOUND', note: 'A ring of light created by gravitational lensing.' }
  ],
  'weather-event': [
    { aliases: ['tornado'], score: 10, tier: 'BACKGROUND', note: 'A familiar rotating column of air.' },
    { aliases: ['hail'], score: 15, tier: 'FAMILIAR', note: 'Ice pellets formed in strong thunderstorms.' },
    { aliases: ['sundog', 'sun dog', 'parhelion'], score: 30, tier: 'UNCOMMON', note: 'A bright patch of light caused by ice crystals.' },
    { aliases: ['virga'], score: 60, tier: 'RARE', note: 'Precipitation that evaporates before reaching the ground.' },
    { aliases: ['fallstreak hole', 'hole punch cloud'], score: 85, tier: 'DEEP CUT', note: 'A circular gap in a cloud layer caused by ice formation.' },
    { aliases: ['sprites', 'red sprites'], score: 100, tier: 'SIGNAL FOUND', note: 'Brief electrical flashes high above thunderstorms.' }
  ]
};

// Merge supplemental entries into the original pools after their base arrays,
// so existing question records are extended rather than overwritten.
const BANK: Record<string, AnswerRecord[]> = {
  ...BASE_BANK,
  ...Object.fromEntries(
    Object.entries(ANSWER_SUBMISSIONS_CORE_EXPANSION).map(([promptId, additions]) => [
      promptId,
      [...(BASE_BANK[promptId] ?? []), ...additions]
    ])
  )
};

export function normalizeAnswer(value: string): string {
  return value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s+#-]/g, ' ')
    .replace(/[\s-]+/g, ' ')
    .trim();
}

function answerRecordId(_promptId: string, record: AnswerRecord): string {
  // The same canonical answer is one archive item even if it qualifies for multiple questions.
  return normalizeAnswer(record.aliases[0] ?? '');
}

/** Flatten the approved answer database for archive rotation and auditing. */
export function getAnswerEntries(): AnswerEntry[] {
  const unique = new Map<string, AnswerEntry>();
  for (const [promptId, records] of Object.entries(BANK)) {
    for (const record of records) {
      const id = answerRecordId(promptId, record);
      if (unique.has(id)) continue;
      unique.set(id, {
        id,
        promptId,
        canonical: record.aliases[0] ?? '',
        aliases: [...record.aliases],
        score: record.score,
        tier: record.tier,
        note: record.note
      });
    }
  }
  return [...unique.values()];
}

export function evaluateAnswer(promptId: string, rawAnswer: string, selectedAnswerId?: string): AnswerResult | null {
  const answer = normalizeAnswer(rawAnswer);
  if (!answer) return null;
  const match = (BANK[promptId] ?? []).find((record) =>
    (!selectedAnswerId || answerRecordId(promptId, record) === selectedAnswerId)
    && record.aliases.some((alias) => normalizeAnswer(alias) === answer)
  );
  return match ? {
    score: match.score,
    tier: match.tier,
    note: match.note,
    answerId: answerRecordId(promptId, match)
  } : null;
}

export function getTestAnswer(promptId: string, score: number, selectedAnswerId?: string): string | null {
  const record = (BANK[promptId] ?? []).find((candidate) =>
    candidate.score === score
    && (!selectedAnswerId || answerRecordId(promptId, candidate) === selectedAnswerId)
  );
  return record?.aliases[0] ?? null;
}
