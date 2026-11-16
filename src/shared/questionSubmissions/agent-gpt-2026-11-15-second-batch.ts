import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, batch 2.
 *
 * Question definitions are committed separately from accepted answer records.
 * contentRotation makes each question eligible only after Phase B contributes
 * at least one valid answer. Criteria are deliberately explicit to keep the
 * answer pools broad without accepting unrelated near-matches.
 *
 * Agent: GPT-6
 * Submitted: 2026-11-15
 */
export const QUESTION_SUBMISSIONS_BATCH_2: Prompt[] = [
  {
    id: 'holocene-volcano',
    channel: 'VOLCANO ATLAS',
    prompt: 'Name a volcano listed in the Smithsonian Global Volcanism Program Holocene Volcano List.',
    context: 'The answer must be a named volcanic feature in the Smithsonian Global Volcanism Program Holocene list. This includes volcanoes with observed, dated, credible, or otherwise recorded Holocene evidence; it does not require a currently erupting volcano. Use the catalogue name or an unambiguous recognized alias.',
    hint: 'Familiar examples include Mount Fuji, Mount Etna, Kilauea, and Mount Vesuvius.'
  },
  {
    id: 'solar-system-moon',
    channel: 'PLANETARY ATLAS',
    prompt: 'Name a named moon orbiting a planet or dwarf planet in our Solar System.',
    context: 'The answer must be an officially named natural satellite of one of the eight planets or an officially recognized dwarf planet. Include small ring moons and distant irregular satellites. Do not count moons of asteroids or trans-Neptunian objects that are not recognized as dwarf planets, or an unnamed provisional designation.',
    hint: 'The outer planets have hundreds of small and irregular moons.'
  },
  {
    id: 'unesco-world-heritage',
    channel: 'WORLD HERITAGE',
    prompt: 'Name a property on the UNESCO World Heritage List.',
    context: 'The answer must be a property currently inscribed on UNESCO’s World Heritage List. Cultural, natural, and mixed properties count, including transboundary properties. Use the official property name or a clearly recognized short form; tentative-list sites and delisted properties do not count.',
    hint: 'The list includes natural landscapes, archaeological sites, cities, buildings, and cultural routes.'
  },
  {
    id: 'canadian-national-park',
    channel: 'CANADIAN PARKS',
    prompt: 'Name a national park or national park reserve in Canada.',
    context: 'The answer must be a site formally designated as a national park or national park reserve in Canada and listed by Parks Canada. National historic sites, provincial parks, marine conservation areas, and proposed parks do not count unless the named site also has national park or reserve status.',
    hint: 'Banff and Jasper are two famous examples; the list also includes parks in every Canadian region.'
  },
  {
    id: 'pokemon-species',
    channel: 'POKÉDEX ARCHIVE',
    prompt: 'Name a Pokémon species listed in the National Pokédex.',
    context: 'The answer must be the official species name of a Pokémon in the National Pokédex. Regional forms, alternate forms, Mega Evolutions, Gigantamax forms, and other forms of the same species do not count as separate answers. Use the official English name.',
    hint: 'There are Pokémon from every generation, not just the original 151.'
  },
  {
    id: 'shark-species',
    channel: 'MARINE BIOLOGY',
    prompt: 'Name a living shark species.',
    context: 'The answer must be an extant member of the shark group (selachimorphs), identified by a recognized common or scientific species name. Rays, skates, chimaeras, extinct fossil species, and vague answers such as “reef shark” without a recognized species are not accepted.',
    hint: 'Sharks range from tiny deep-sea species to the largest fish in the ocean.'
  },
  {
    id: 'akc-dog-breed',
    channel: 'CANINE REGISTER',
    prompt: 'Name a dog breed recognized by the American Kennel Club.',
    context: 'The answer must be one of the dog breeds currently recognized by the American Kennel Club (AKC). Use the AKC’s official breed name or a widely accepted spelling variant. Unrecognized varieties, designer crosses, and mixed breeds do not count.',
    hint: 'The AKC registry includes breeds from every group, including hounds, terriers, and working dogs.'
  },
  {
    id: 'nobel-physics-laureate',
    channel: 'SCIENCE HONORS',
    prompt: 'Name an individual who has received the Nobel Prize in Physics.',
    context: 'The answer must be a person who has been officially named as a Nobel Prize in Physics laureate. A person who won only another Nobel category, an institution, or someone merely nominated for the prize does not qualify. A laureate who won more than once is still one answer.',
    hint: 'The laureates include experimentalists, theorists, astronomers, and inventors.'
  },
  {
    id: 'dinosaur-genus',
    channel: 'PALEONTOLOGY',
    prompt: 'Name a genus of non-avian dinosaur.',
    context: 'The answer must be a genus-level name for a non-avian dinosaur, using an accepted taxonomic name. Do not submit an individual species epithet by itself, a common group such as “raptor,” a pterosaur, a marine reptile, or a modern bird. Synonyms and dubious names are excluded where identified by the reference database.',
    hint: 'Look beyond the famous giants to smaller, newly described, and fragmentary genera.'
  },
  {
    id: 'mars-exploration-mission',
    channel: 'MARS EXPLORATION',
    prompt: 'Name a spacecraft mission sent to investigate Mars or one of its moons.',
    context: 'The answer must be a real space mission launched with the objective of investigating Mars or its moons, including flybys, orbiters, landers, rovers, and sample-return efforts. Successful and unsuccessful launch attempts count if they were genuine Mars missions; proposals that never launched do not.',
    hint: 'Missions have been sent by the United States, Soviet Union, Russia, Europe, India, China, Japan, and the United Arab Emirates.'
  },
  {
    id: 'space-observatory',
    channel: 'ORBITAL ASTRONOMY',
    prompt: 'Name a space-based astronomical telescope or observatory.',
    context: 'The answer must be a spacecraft or observatory placed in space primarily to observe astronomical objects or phenomena beyond Earth’s atmosphere. Optical, infrared, ultraviolet, X-ray, gamma-ray, microwave, and gravitational-wave observatories count. Earth-observation satellites and ground-based telescopes do not.',
    hint: 'Some observatories study visible light, while others detect X-rays, infrared, or gamma rays.'
  },
  {
    id: 'metro-city',
    channel: 'URBAN TRANSIT',
    prompt: 'Name a city with an operational metro, subway, or underground rapid-transit system.',
    context: 'The answer must be a city served by an operating electrified urban rapid-transit rail system classified as a metro, subway, or underground. Use the city or metropolitan system name commonly associated with the network. Planned systems, commuter rail, and street-running tram-only networks do not qualify.',
    hint: 'Metro networks operate in cities on every inhabited continent except Antarctica.'
  },
  {
    id: 'woodwind-instrument',
    channel: 'MUSICAL INSTRUMENTS',
    prompt: 'Name a woodwind musical instrument.',
    context: 'The answer must be a recognized woodwind instrument that produces sound through an air column, usually with an edge-blown mouthpiece or a reed. The instrument may be made from wood, metal, or another material. Brass instruments and percussion instruments do not count.',
    hint: 'The family includes flutes, single-reed instruments, double-reed instruments, and many regional traditions.'
  },
  {
    id: 'board-game',
    channel: 'TABLETOP ARCHIVE',
    prompt: 'Name a board game.',
    context: 'The answer must be a distinct tabletop game whose play is organized around a board or defined playing surface and established rules. Traditional, abstract-strategy, family, party, and modern hobby games count. Standalone card games, role-playing systems without a board, video games, expansions, and alternate editions of the same game do not count as separate answers.',
    hint: 'Think across ancient games, classic family games, and modern strategy titles.'
  }
];
