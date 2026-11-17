import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, late daily batch.
 *
 * These 14 definitions are committed before any answer records. The production
 * selector keeps each one ineligible until Phase B registers at least one
 * accepted answer for its permanent ID.
 *
 * Candidate reference catalogues:
 * - Mammal Diversity Database v2.5: https://www.mammaldiversity.org/
 * - GBIF Backbone Taxonomy: https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c
 * - Glottolog: https://glottolog.org/
 * - Minor Planet Center: https://www.minorplanetcenter.net/
 * - ICAO Doc 8585: https://www.icao.int/
 * - FIDE ratings and title lists: https://ratings.fide.com/
 * - Lichess chess openings: https://github.com/lichess-org/chess-openings
 * - Formula 1 results archive: https://www.formula1.com/en/results.html
 * - United Nations Member States: https://www.un.org/en/about-us/member-states
 * - Steam Store app catalogue: https://store.steampowered.com/
 *
 * Agent: GPT-6
 * Submitted: 2026-11-16
 */
export const QUESTION_SUBMISSIONS_LATE_BATCH: Prompt[] = [
  {
    id: 'mammal-species',
    channel: 'MAMMAL DIVERSITY',
    prompt: 'Name a living mammal species other than a bat.',
    context: 'The answer must be an accepted extant species in the American Society of Mammalogists’ Mammal Diversity Database. Bats (order Chiroptera) are excluded because SIGNAL has a separate bat-species question. Use the accepted scientific binomial or an unambiguous recognized common name. Do not count subspecies, synonyms, domestic breeds, or species classified as extinct.',
    hint: 'Think across primates, rodents, carnivores, hoofed mammals, marsupials, and marine mammals.',
  },
  {
    id: 'spider-species',
    channel: 'ARACHNID ATLAS',
    prompt: 'Name a living species of spider.',
    context: 'The answer must be an accepted living species in the order Araneae in the GBIF Backbone Taxonomy. Use the accepted scientific binomial or a recognized common name that identifies one species unambiguously. Do not count harvestmen, mites, scorpions, fossil-only taxa, subspecies, or synonyms as separate species.',
    hint: 'The order includes jumping spiders, orb-weavers, trapdoor spiders, cobweb spiders, and many less familiar families.',
  },
  {
    id: 'ant-species',
    channel: 'INSECT ATLAS',
    prompt: 'Name a living species of ant.',
    context: 'The answer must be an accepted extant species in the family Formicidae in the GBIF Backbone Taxonomy. Use the accepted scientific binomial or a recognized common name that identifies one species. Do not count other wasps, subspecies, synonyms, or fossil-only species as separate answers.',
    hint: 'Ants include leaf-cutters, army ants, weaver ants, trap-jaw ants, and tiny soil-dwelling species.',
  },
  {
    id: 'beetle-species',
    channel: 'COLEOPTERA CATALOGUE',
    prompt: 'Name a living species of beetle.',
    context: 'The answer must be an accepted extant species in the order Coleoptera in the GBIF Backbone Taxonomy. Use the accepted scientific binomial or a recognized common name that identifies one species. Do not count other insects, subspecies, synonyms, or fossil-only species as separate answers.',
    hint: 'Beetles include weevils, scarabs, ladybirds, longhorns, ground beetles, and many other families.',
  },
  {
    id: 'fabaceae-species',
    channel: 'LEGUME ATLAS',
    prompt: 'Name a living species in the legume family Fabaceae.',
    context: 'The answer must be an accepted extant species in the plant family Fabaceae (Leguminosae) in the GBIF Backbone Taxonomy. Use the accepted scientific binomial or an unambiguous recognized common name. Do not count subspecies, synonyms, cultivars, or fossil-only taxa as separate species.',
    hint: 'The family includes beans, peas, lentils, acacias, clovers, lupins, and thousands of wild legumes.',
  },
  {
    id: 'ray-species',
    channel: 'CARTILAGINOUS FISH ATLAS',
    prompt: 'Name a living species of ray.',
    context: 'The answer must be an accepted extant ray species in the superorder Batoidea in the GBIF Backbone Taxonomy. Use the accepted scientific binomial or an unambiguous recognized common name. Sharks, chimaeras, subspecies, synonyms, and fossil-only taxa do not qualify.',
    hint: 'The group includes stingrays, eagle rays, manta rays, skates, guitarfishes, and electric rays.',
  },
  {
    id: 'glottolog-language',
    channel: 'WORLD LANGUAGE ATLAS',
    prompt: 'Name a natural human language listed in Glottolog.',
    context: 'The answer must be a natural human language represented as a language-level languoid in the current Glottolog catalogue. Living and extinct natural languages qualify. Language families, dialect-level entries, constructed languages, scripts, and writing systems do not. Use the Glottolog name or a recognized alternate name.',
    hint: 'The catalogue includes major world languages as well as regional, endangered, and historical languages.',
  },
  {
    id: 'named-minor-planet',
    channel: 'MINOR PLANET CATALOGUE',
    prompt: 'Name an officially named minor planet.',
    context: 'The answer must be a minor planet with a permanent number and an officially approved name in the Minor Planet Center’s catalogue. Asteroids and trans-Neptunian minor planets qualify. Unnumbered provisional designations, comets, spacecraft, and informal nicknames do not.',
    hint: 'Some names honor scientists and writers; others come from mythology, places, or ordinary words.',
  },
  {
    id: 'icao-airline',
    channel: 'GLOBAL AVIATION',
    prompt: 'Name an airline with an ICAO three-letter designator.',
    context: 'The answer must be an airline or commercial air operator assigned a three-letter designator in ICAO Doc 8585. Passenger, cargo, charter, and regional operators qualify. Airports, callsigns without an assigned designator, aircraft manufacturers, and defunct operators absent from the current edition do not.',
    hint: 'Look beyond major flag carriers to regional, cargo, charter, and low-cost airlines.',
  },
  {
    id: 'fide-titled-player',
    channel: 'CHESS HONORS',
    prompt: 'Name a chess player who holds an official FIDE title.',
    context: 'The answer must be an individual listed by FIDE as holding at least one official over-the-board title, including GM, IM, FM, CM, WGM, WIM, WFM, or WCM. Use the player’s registered name or a widely recognized spelling. Candidates, online-only titles, clubs, and players without a FIDE title do not qualify.',
    hint: 'The title lists include world champions, grandmasters, and thousands of less famous titled players from every region.',
  },
  {
    id: 'chess-opening',
    channel: 'CHESS OPENING ARCHIVE',
    prompt: 'Name a chess opening or named opening variation in the Lichess opening database.',
    context: 'The answer must be a named opening or variation represented in the Lichess chess-openings dataset, which assigns an ECO code and move sequence. Use the database’s opening name or a recognized short form. An individual move, an invented name, or a position without a named opening entry does not qualify.',
    hint: 'The database ranges from famous defenses to obscure gambits and named sub-variations.',
  },
  {
    id: 'formula-one-driver',
    channel: 'GRAND PRIX ARCHIVE',
    prompt: 'Name a driver who started a Formula One World Championship Grand Prix.',
    context: 'The answer must be a driver credited with starting at least one race in the FIA Formula One World Championship. Drivers from every season count, including those with a single start. Test drivers, reserve drivers who never started a Grand Prix, and drivers from unrelated racing series do not qualify.',
    hint: 'The championship’s history stretches from 1950 to the present and includes hundreds of drivers.',
  },
  {
    id: 'national-capital-city',
    channel: 'WORLD CAPITALS',
    prompt: 'Name the capital city of a United Nations member state or observer state.',
    context: 'The answer must be a city officially designated by a current UN member state or UN observer state as its national capital or seat of national government. Where a country formally recognizes more than one capital or has a distinct constitutional and administrative capital, each officially designated city qualifies. Provincial, state, regional, and former capitals do not qualify unless they remain an officially designated national capital.',
    hint: 'Some countries have more than one capital role, and a few have changed capitals in recent decades.',
  },
  {
    id: 'steam-video-game',
    channel: 'VIDEO GAME CATALOGUE',
    prompt: 'Name a video game with a Steam Store listing whose app type is Game.',
    context: 'The answer must be a distinct video game with a Steam Store app record identified as type Game. Released games and unreleased games with an active store listing qualify. DLC, demos, soundtracks, software, videos, hardware, bundles, and duplicate regional or edition listings do not count as separate games.',
    hint: 'The Steam catalogue spans major releases, independent games, older titles, and games from developers around the world.',
  },
];
