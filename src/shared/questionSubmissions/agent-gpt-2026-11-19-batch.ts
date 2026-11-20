import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, 2026-11-19.
 *
 * Definitions are committed before their answer records. Each prompt uses an
 * explicit, externally checkable register or objective participation rule.
 * The Redis selector keeps these questions inactive until Phase B contributes
 * at least one accepted answer for each ID.
 *
 * Research starting points:
 * - Species Fungorum (Kew): https://www.speciesfungorum.org/
 * - Plants of the World Online (Kew): https://powo.science.kew.org/
 * - World Flora Online: https://www.worldfloraonline.org/
 * - AlgaeBase: https://www.algaebase.org/
 * - Amphibian Species of the World, Caudata: https://amphibiansoftheworld.amnh.org/Amphibia/Caudata
 * - World Register of Marine Species: https://www.marinespecies.org/
 * - World List of marine Brachyura: https://www.gbif.org/dataset/df170b9c-382c-4b3e-86f5-c802adc629d1
 * - Society for Marine Mammalogy taxonomy list: https://marinemammalscience.org/science-and-publications/list-marine-mammal-species-subspecies/
 * - GeoNames T.PEN feature code: https://www.geonames.org/statistics/T.PEN.html
 * - IAU World Higher Education Database: https://whed.net/
 * - Current tram/LRT system list: https://en.wikipedia.org/wiki/List_of_light_rail_transit_systems
 * - NHL statistics: https://www.nhl.com/stats/
 * - Pro Football Reference: https://www.pro-football-reference.com/
 * - Academy Awards Database: https://awardsdatabase.oscars.org/
 *
 * Submitted by GPT-6.
 */
export const QUESTION_SUBMISSIONS_DAILY_2026_11_19: Prompt[] = [
  {
    id: 'fungus-species',
    channel: 'SPECIES FUNGORUM',
    prompt: 'Name an accepted living species of fungus in Species Fungorum.',
    context: 'The answer must be an accepted extant species in the Species Fungorum global checklist. Mushrooms, molds, yeasts, rusts, smuts, and lichen-forming fungi qualify when the record is an accepted species. Exclude synonyms, fossil-only taxa, subspecies, infraspecific names, and fungal analogues that are not true fungi. Use the accepted scientific binomial or a recognized common name that identifies one species.',
    hint: 'Look beyond familiar mushrooms to yeasts, plant pathogens, bracket fungi, and microscopic species.'
  },
  {
    id: 'tree-species',
    channel: 'KEW TREE CHECKLIST',
    prompt: 'Name an accepted tree species in Plants of the World Online.',
    context: 'The answer must be an accepted extant species in Kew’s Plants of the World Online whose species description identifies its life form as a tree. Use the accepted scientific binomial or a recognized common name identifying one species. Exclude synonyms, cultivars, hybrids, shrubs, vines, and other life forms not identified as trees in the record.',
    hint: 'The checklist spans tropical, temperate, desert, montane, and boreal trees.'
  },
  {
    id: 'moss-species',
    channel: 'WORLD FLORA ONLINE',
    prompt: 'Name an accepted living moss species in World Flora Online.',
    context: 'The answer must be an accepted extant species classified among the true mosses (Bryophyta) in the World Flora Online taxonomic backbone. Use the accepted scientific binomial or an unambiguous recognized common name. Liverworts, hornworts, synonyms, fossil-only taxa, subspecies, and genus-level answers do not qualify.',
    hint: 'Think beyond sphagnum to haircap mosses, cushion mosses, feather mosses, and tiny urban species.'
  },
  {
    id: 'algal-species',
    channel: 'ALGAEBASE',
    prompt: 'Name an accepted living algal species in AlgaeBase.',
    context: 'The answer must be an accepted extant species-level taxon in AlgaeBase. Marine, freshwater, and terrestrial algae from its covered groups qualify. Exclude synonyms, fossil-only taxa, infraspecific varieties, seagrasses (which are flowering plants), and non-algal organisms. Use the accepted scientific binomial or a recognized common name identifying one species.',
    hint: 'Algae include seaweeds, diatoms, dinoflagellates, green algae, red algae, and microscopic freshwater forms.'
  },
  {
    id: 'salamander-species',
    channel: 'AMPHIBIAN SPECIES OF THE WORLD',
    prompt: 'Name a living salamander species listed in Amphibian Species of the World.',
    context: 'The answer must be an extant species in the order Caudata (salamanders and newts) in Amphibian Species of the World 6.2. Use the accepted scientific binomial or an unambiguous recognized common name. Frogs, toads, fossil taxa, subspecies, and synonyms do not count as separate species.',
    hint: 'The order includes lungless salamanders, newts, giant salamanders, sirens, and amphiumas.'
  },
  {
    id: 'polychaete-species',
    channel: 'WORMS POLYCHAETA',
    prompt: 'Name an accepted living polychaete species in the World Register of Marine Species.',
    context: 'The answer must be an accepted extant species classified as Polychaeta in the World Register of Marine Species (WoRMS). Marine and brackish-water species qualify. Exclude synonyms, fossil-only taxa, subspecies, genus-level names, and annelids outside Polychaeta. Use the accepted scientific binomial or a recognized common name identifying one species.',
    hint: 'The group includes bristle worms, fan worms, tube worms, scale worms, and sand worms.'
  },
  {
    id: 'marine-crab-species',
    channel: 'WORLD LIST OF MARINE BRACHYURA',
    prompt: 'Name an accepted living marine crab species in the World List of Marine Brachyura.',
    context: 'The answer must be an accepted extant species of true crab (infraorder Brachyura) in the World List of Marine Brachyura supplied through WoRMS and Catalogue of Life. Use the accepted scientific binomial or a recognized common name identifying one species. Exclude freshwater-only crabs, hermit crabs, king crabs, fossil-only taxa, synonyms, and subspecies.',
    hint: 'The list includes swimming crabs, mud crabs, porcelain crabs, box crabs, decorator crabs, and deep-sea species.'
  },
  {
    id: 'marine-mammal-species',
    channel: 'MARINE MAMMAL TAXONOMY',
    prompt: 'Name a living marine mammal species recognized by the Society for Marine Mammalogy.',
    context: 'The answer must be an extant species in the Society for Marine Mammalogy Committee on Taxonomy’s current List of Marine Mammal Species and Subspecies. Use the accepted scientific binomial or a recognized common name. Do not count subspecies, recently extinct species, proposed unnamed taxa, or non-marine mammals.',
    hint: 'The list includes whales, dolphins, porpoises, seals, sea lions, walruses, manatees, dugongs, sea otters, and polar bears.'
  },
  {
    id: 'geonames-peninsula',
    channel: 'GEONAMES LANDSCAPE GAZETTEER',
    prompt: 'Name a peninsula listed in GeoNames with feature code T.PEN.',
    context: 'The answer must be a named geographic feature in the GeoNames gazetteer whose feature class is T and feature code is PEN (peninsula). Use the primary name or a documented alternate name for that same feature. Capes, islands, isthmuses, bays, and duplicate spellings of one peninsula do not count as separate answers.',
    hint: 'GeoNames records thousands of peninsulas, from famous landforms to small local projections of land.'
  },
  {
    id: 'university-whed',
    channel: 'WORLD HIGHER EDUCATION DATABASE',
    prompt: 'Name a higher education institution listed in the IAU World Higher Education Database.',
    context: 'The answer must be a distinct degree-conferring higher education institution with its own Global WHED ID in the IAU World Higher Education Database. It must meet WHED recognition criteria, including recognition by the national competent body and at least a four-year degree or equivalent. Use the institution’s listed English name or its recorded native-language name. Do not count unaccredited providers, individual departments, or branch campuses as separate institutions when linked to a parent.',
    hint: 'The database covers more than 20,000 recognized institutions across nearly 200 countries and territories.'
  },
  {
    id: 'tramway-city',
    channel: 'WORLD TRAMWAY NETWORKS',
    prompt: 'Name a city with an operational tram, streetcar, or light-rail transit system.',
    context: 'The answer must be a city currently served by a year-round tram, streetcar, or light-rail system operating as part of its regular public transport network. Use the city or municipality identified as the primary location of the system. Exclude heritage-only or tourist-only lines, seasonal services, suspended systems, and systems still under construction.',
    hint: 'Look beyond Europe to networks in Asia, Africa, the Americas, and Oceania.'
  },
  {
    id: 'nhl-player',
    channel: 'NATIONAL HOCKEY LEAGUE',
    prompt: 'Name a player who appeared in at least one NHL regular-season game.',
    context: 'The answer must be an individual credited with at least one regular-season game played in the National Hockey League. Players from every NHL season qualify, including players with only one appearance. Playoff-only participants, preseason-only participants, coaches, referees, and players who appeared only in other leagues do not qualify.',
    hint: 'The NHL has recorded players since 1917, including short-career players and early-era skaters.'
  },
  {
    id: 'nfl-player',
    channel: 'NATIONAL FOOTBALL LEAGUE',
    prompt: 'Name a player who appeared in at least one NFL regular-season game.',
    context: 'The answer must be an individual credited with at least one regular-season appearance in the National Football League. Players from all NFL eras qualify, including players with very short careers. College-only players, preseason-only participants, coaches, officials, and players who appeared only in other professional leagues do not qualify.',
    hint: 'The historical player register extends far beyond Super Bowl-era stars.'
  },
  {
    id: 'oscar-acting-nominee',
    channel: 'ACADEMY AWARDS ACTING ARCHIVE',
    prompt: 'Name an actor who received a competitive Academy Award nomination for acting.',
    context: 'The answer must be an individual nominated in one of the Academy Awards’ four competitive acting categories: Actor in a Leading Role, Actress in a Leading Role, Actor in a Supporting Role, or Actress in a Supporting Role. Winners and non-winning nominees both qualify. Exclude honorary awards, nominations only in non-acting categories, and nominations for people who were not credited as performers. Use the nominee’s recognized professional name.',
    hint: 'The list includes performers from silent cinema to the latest ceremony and from film industries around the world.'
  }
];
