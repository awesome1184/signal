import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, evening batch.
 *
 * Each prompt is tied to a named catalogue or an explicit objective rule.
 * Answer records are committed separately; the Redis selector keeps these
 * questions inactive until the answer bank contains at least one accepted
 * answer for the corresponding ID.
 *
 * Agent: GPT-6
 * Submitted: 2026-11-16
 */
export const QUESTION_SUBMISSIONS_EVENING_BATCH: Prompt[] = [
  {
    id: 'bird-species',
    channel: 'GLOBAL BIRD ATLAS',
    prompt: 'Name a living bird species included in the AviList global checklist.',
    context: 'The answer must be an accepted living species in AviList v2026, the global consensus checklist. Use its accepted English name or scientific binomial. Subspecies, hybrids, fossil-only species, and synonyms that AviList does not accept as separate species do not count.',
    hint: 'The checklist spans familiar backyard birds, seabirds, birds of prey, and rare island endemics.'
  },
  {
    id: 'lizard-species',
    channel: 'REPTILE ATLAS',
    prompt: 'Name a living species of lizard.',
    context: 'The answer must be a currently accepted living lizard species in The Reptile Database (the lizard/Sauria group). Use its accepted scientific binomial or an unambiguous recognized common name. Snakes, turtles, crocodilians, tuataras, subspecies, fossil-only taxa, and synonyms are not separate answers.',
    hint: 'Geckos, skinks, iguanas, chameleons, and monitor lizards all count.'
  },
  {
    id: 'freshwater-fish-species',
    channel: 'FRESHWATER BIOLOGY',
    prompt: 'Name a fish species recorded as freshwater in FishBase.',
    context: 'The answer must be a valid fish species in FishBase whose habitat record includes freshwater or freshwater-brackish water. Marine-only species, non-fish aquatic animals, subspecies, and synonyms are not separate answers. Use a scientific binomial or an unambiguous common name.',
    hint: 'Think of river, lake, and wetland fish from every continent.'
  },
  {
    id: 'fern-species',
    channel: 'BOTANICAL ARCHIVE',
    prompt: 'Name a fern or lycophyte species in the World Ferns checklist.',
    context: 'The answer must be an accepted species in World Ferns, the synonymic checklist of ferns and lycophytes. Use its accepted scientific binomial or an unambiguous recognized common name. Hybrids, infraspecific taxa, synonyms, and unplaced names do not count as separate species.',
    hint: 'The group includes tree ferns, maidenhair ferns, bracken, clubmosses, and tiny epiphytes.'
  },
  {
    id: 'cactus-species',
    channel: 'DESERT BOTANY',
    prompt: 'Name an accepted species in the cactus family Cactaceae.',
    context: 'The answer must be an accepted species in the family Cactaceae in Kew Plants of the World Online or World Flora Online. Use its accepted scientific binomial or a clearly unambiguous common name. Hybrids, subspecies, varieties, and taxonomic synonyms do not count as separate species.',
    hint: 'Cacti range from tiny globular plants to towering columnar species and epiphytes.'
  },
  {
    id: 'mountain-peak-6000m',
    channel: 'HIGH MOUNTAIN ATLAS',
    prompt: 'Name a named mountain summit with an elevation of at least 6,000 metres.',
    context: 'The answer must be a distinct named summit whose accepted elevation is 6,000 metres or higher, documented in a recognized mountaineering or geographic reference such as the Himalayan Database or Peakbagger. Use the summit name, not merely a mountain range or climbing route. Unnamed points and duplicate spellings of the same summit do not count separately.',
    hint: 'Most qualifying summits are in the Himalaya, Karakoram, Hindu Kush, Andes, and Pamirs.'
  },
  {
    id: 'airport-iata',
    channel: 'WORLD AIRPORT INDEX',
    prompt: 'Name an operating airport with an IATA three-letter airport code.',
    context: 'The answer must be a currently operating airport facility with its own assigned three-letter IATA airport code. Use the airport name or its unambiguous commonly used name. Metropolitan-area codes, railway or ferry codes, heliports without airport status, closed airports, and airports without an IATA code do not qualify.',
    hint: 'Major hubs are easy; smaller regional and island airports count too.'
  },
  {
    id: 'afi-feature-film',
    channel: 'AMERICAN CINEMA ARCHIVE',
    prompt: 'Name a film listed in the AFI Catalog of Feature Films.',
    context: 'The answer must have its own movie-title record in the American Film Institute Catalog of Feature Films. Films from any period covered by the catalog qualify, including silent and early cinema. A television episode, television series, stage production, or film that is not represented by an AFI Catalog record does not qualify.',
    hint: 'The catalog spans more than a century of American filmmaking, from silent-era titles to modern releases.'
  },
  {
    id: 'animated-tv-series',
    channel: 'TELEVISION ARCHIVE',
    prompt: 'Name an animated television series.',
    context: 'The answer must be a television or streaming series whose episodes are primarily animated. Anime, adult animation, children’s animation, stop-motion, and computer animation count. A theatrical film, one-off special, individual episode, or collection of unrelated shorts without a series identity does not count.',
    hint: 'Look across anime, sitcoms, children’s shows, adult animation, and international productions.'
  },
  {
    id: 'video-game-series',
    channel: 'INTERACTIVE ENTERTAINMENT',
    prompt: 'Name a video game series with at least two distinct released games.',
    context: 'The answer must be an identifiable video game franchise or series with at least two distinct released games, documented by a recognized game catalogue such as MobyGames. Use the franchise or series name. A single game, expansion-only grouping, hardware platform, publisher, or unrelated collection of games does not qualify.',
    hint: 'Think across role-playing games, platformers, simulations, strategy, sports, and indie franchises.'
  },
  {
    id: 'football-club-openfootball',
    channel: 'GLOBAL FOOTBALL ATLAS',
    prompt: 'Name a football club listed in the OpenFootball worldwide clubs dataset.',
    context: 'The answer must be a distinct association-football club recorded in the OpenFootball clubs dataset. Active and historical clubs count. Use the club’s listed name or a recognized alias from the dataset. National teams, leagues, stadiums, and clubs absent from the dataset do not qualify.',
    hint: 'The dataset includes clubs from Africa, Asia, Europe, the Americas, the Caribbean, and the Pacific.'
  },
  {
    id: 'linux-distribution',
    channel: 'OPEN-SOURCE SYSTEMS',
    prompt: 'Name a Linux distribution.',
    context: 'The answer must be a distinct operating-system distribution built around the Linux kernel and documented as a distribution in DistroWatch or an equivalent maintained distribution catalogue. Active and discontinued distributions count. Desktop environments, package managers, software repositories, and individual versions of the same distribution do not count separately.',
    hint: 'Look beyond Ubuntu and Fedora to regional, specialist, lightweight, and historical distributions.'
  },
  {
    id: 'pasta-shape',
    channel: 'GLOBAL CUISINE',
    prompt: 'Name a distinct named pasta shape.',
    context: 'The answer must be a recognized pasta form or named regional pasta type, including dried shapes and traditional handmade forms. Use the established name. A sauce, complete prepared dish, brand, or spelling variant of an already listed shape is not a separate answer.',
    hint: 'Italian regional pasta includes unusual shapes far beyond spaghetti, penne, and fusilli.'
  },
  {
    id: 'car-model',
    channel: 'AUTOMOTIVE ARCHIVE',
    prompt: 'Name a production passenger-car model.',
    context: 'The answer must be a distinct model nameplate used for a production passenger car by an automobile manufacturer. Current and discontinued models qualify. Do not count a trim level, model year, generation, concept-only vehicle, commercial truck, or a manufacturer as a separate model.',
    hint: 'Think across manufacturers, countries, body styles, and decades.'
  }
];
