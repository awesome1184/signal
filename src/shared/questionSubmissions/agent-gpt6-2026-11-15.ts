import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution.
 *
 * These prompts are intentionally submitted without answer records. They are
 * not part of the production question bank until Phase A integration is
 * complete and Phase B adds at least one validated accepted answer per ID.
 *
 * Agent: GPT-6 (independent contribution batch)
 * Submitted: 2026-11-15
 */
export const QUESTION_SUBMISSIONS: Prompt[] = [
  {
    id: 'butterfly-species',
    channel: 'FIELD BIOLOGY',
    prompt: 'Name a species of butterfly.',
    context: 'The answer must be a currently recognized living butterfly species in the superfamily Papilionoidea, including skippers. A common species name or its accepted scientific binomial qualifies. Moths, subspecies that are not accepted as species, and fictional species do not qualify.',
    hint: 'Butterflies live on nearly every continent and range from tiny blues to giant swallowtails.'
  },
  {
    id: 'earth-volcano',
    channel: 'EARTH SCIENCE',
    prompt: 'Name a volcano on Earth.',
    context: 'The answer must be a distinct, named volcanic feature recognized as a volcano by a geological authority or reputable gazetteer. Active, dormant, extinct, and submarine volcanoes all qualify. A nearby town, an individual eruption, or a crater that is not recognized as a separate volcano does not.',
    hint: 'Look beyond famous cone-shaped mountains: some volcanoes are underwater or hidden beneath ice.'
  },
  {
    id: 'mountain-range',
    channel: 'WORLD GEOGRAPHY',
    prompt: 'Name a mountain range on Earth.',
    context: 'The answer must be a named natural group or chain of mountains recognized as a mountain range in a reputable geographic reference. Major ranges and officially recognized subranges qualify. Individual peaks, isolated mountains, and plateaus do not qualify unless the named feature is itself classified as a range.',
    hint: 'Mountain ranges appear on every inhabited continent and beneath the ocean.'
  },
  {
    id: 'national-park',
    channel: 'GLOBAL CONSERVATION',
    prompt: 'Name a national park anywhere in the world.',
    context: 'The answer must be a real protected area that has an official national-park designation, or a direct official equivalent translated into English, from the responsible government authority. Current and historical designations qualify. A place that is merely called a park by tourists, or has only a different protected-area status, does not.',
    hint: 'Think across Africa, Asia, the Americas, Europe, and Oceania, not just the best-known parks.'
  },
  {
    id: 'solar-system-moon',
    channel: 'SOLAR SYSTEM',
    prompt: 'Name a natural moon in the Solar System.',
    context: 'The answer must be a confirmed natural satellite orbiting a planet, dwarf planet, asteroid, comet, or other Solar System body. Use its recognized proper name or official provisional designation. Artificial spacecraft, unconfirmed candidates, and planets themselves do not qualify.',
    hint: 'Many of the smallest known moons orbit distant giant planets or minor planets.'
  },
  {
    id: 'metro-city',
    channel: 'URBAN TRANSIT',
    prompt: 'Name a city with an operating metro or subway system.',
    context: 'The answer must be a city currently served by a passenger rapid-transit railway commonly classified as a metro, subway, underground, or equivalent system. The city may share a network with neighboring municipalities. Commuter rail, trams, light rail alone, and bus rapid transit do not qualify.',
    hint: 'Major networks exist in cities on every populated continent.'
  },
  {
    id: 'board-game',
    channel: 'TABLETOP GAMES',
    prompt: 'Name a board game.',
    context: 'The answer must be a distinct, named tabletop game played on a board or defined playing surface, whether modern, traditional, or historical. Published editions, regional names, and well-established variants qualify when they identify a distinct game. Card-only games, video games without a tabletop counterpart, sports, and tabletop role-playing systems do not.',
    hint: 'Consider strategy games, family games, abstract games, and traditional games from around the world.'
  },
  {
    id: 'automobile-manufacturer',
    channel: 'TRANSPORT INDUSTRY',
    prompt: 'Name an automaker that has produced passenger cars.',
    context: 'The answer must be a real manufacturer or distinct vehicle marque that has produced complete road-going passenger automobiles under that name. Current, historic, and defunct automakers qualify. Parts suppliers, dealerships, coachbuilders that never marketed complete cars under their own marque, and truck-only manufacturers do not.',
    hint: 'Look beyond current global giants to defunct marques and manufacturers from smaller markets.'
  },
  {
    id: 'frog-species',
    channel: 'FIELD BIOLOGY',
    prompt: 'Name a species of frog.',
    context: 'The answer must be a currently recognized living species in the amphibian order Anura. Common names and accepted scientific binomials qualify; this includes animals commonly called frogs or toads. Extinct fossil species, subspecies not accepted at species rank, and salamanders do not qualify.',
    hint: 'There are frogs in deserts, forests, mountains, wetlands, and even underground.'
  },
  {
    id: 'space-probe',
    channel: 'SPACE EXPLORATION',
    prompt: 'Name a robotic spacecraft sent to explore space.',
    context: 'The answer must be a named uncrewed spacecraft whose mission was to investigate the Sun, a celestial body, or the space environment beyond Earth orbit. Flyby probes, orbiters, landers, rovers, and sample-return craft qualify. Crewed vehicles, launch vehicles, and communications or Earth-observation satellites alone do not.',
    hint: 'Think of missions that flew past planets, landed on worlds, or studied the Sun.'
  }
];
