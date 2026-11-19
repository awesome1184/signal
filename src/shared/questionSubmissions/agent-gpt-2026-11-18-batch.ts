import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, 2026-11-18.
 *
 * Definitions are intentionally committed before answer records. Each prompt
 * has a registry-backed acceptance rule. The Redis selector only activates a
 * question after its Phase B answer pool is registered.
 *
 * Reference starting points:
 * - Ramsar List: https://www.ramsar.org/our-work/wetlands-international-importance/ramsar-list
 * - UNESCO Global Geoparks: https://www.unesco.org/en/iggp/geoparks
 * - BGCI GardenSearch: https://www.bgci.org/resources/bgci-databases/gardensearch/
 * - GLIMS Glacier Database: https://www.glims.org/maps/textsearch/
 * - USGS waterfalls and rapids dataset: https://www.usgs.gov/data/waterfalls-and-rapids-conterminous-united-states-linked-national-hydrography-datasets-v20
 * - NGA World Port Index: https://msi.nga.mil/Publications/WPI
 * - GeoNames gazetteer and feature codes: https://www.geonames.org/export/codes.html
 * - Recording Academy awards: https://www.grammy.com/awards/
 * - BAFTA awards database: https://www.bafta.org/awards/search/
 * - Olympic results: https://olympics.com/en/olympic-games/olympic-results
 * - MLB Stats API: https://statsapi.mlb.com/api/v1/
 * - NGC/IC catalogue: https://cds.unistra.fr/
 *
 * Submitted by GPT-6.
 */
export const QUESTION_SUBMISSIONS_DAILY_2026_11_18: Prompt[] = [
  {
    id: 'ramsar-wetland-site',
    channel: 'RAMSAR WETLAND REGISTER',
    prompt: 'Name a Wetland of International Importance on the Ramsar List.',
    context: 'The answer must be a currently designated site on the Convention on Wetlands’ official List of Wetlands of International Importance. Use the site’s official Ramsar name. Do not submit a country, wetland type, proposed site, or an alternate-language spelling as a separate site.',
    hint: 'The list includes marshes, lakes, peatlands, mangroves, reefs, estuaries, and other wetlands on every continent.'
  },
  {
    id: 'unesco-global-geopark',
    channel: 'UNESCO GEOPARK NETWORK',
    prompt: 'Name a UNESCO Global Geopark.',
    context: 'The answer must be a currently designated UNESCO Global Geopark on UNESCO’s official list. Use its listed name. Aspiring geoparks, national geoparks without UNESCO designation, and duplicate names for transnational parks count only when they refer to a distinct listed geopark.',
    hint: 'The network includes geoparks in Europe, Asia, Africa, the Americas, and Oceania.'
  },
  {
    id: 'bgci-botanic-garden',
    channel: 'GLOBAL BOTANIC GARDENS',
    prompt: 'Name a botanic garden or arboretum listed in BGCI GardenSearch.',
    context: 'The answer must be a distinct institution in BGCI’s GardenSearch whose listed institution type is a botanic garden or arboretum. Use its recorded institution name. Zoos, seed banks, tissue-culture collections, public parks, and other GardenSearch institution types do not qualify unless the record also identifies the institution as a botanic garden or arboretum.',
    hint: 'Look across university gardens, historic royal gardens, national collections, specialist arboreta, and regional botanical institutions.'
  },
  {
    id: 'glims-glacier',
    channel: 'GLIMS GLACIER DATABASE',
    prompt: 'Name a glacier recorded in the GLIMS Glacier Database.',
    context: 'The answer must identify a named glacier in the GLIMS Glacier Database. Use the Glacier Name field or a documented alternate name for the same glacier. Unnamed outlines, internal-rock polygons, proglacial lakes, extinct-glacier layers, and repeat analyses of the same glacier do not count as separate answers.',
    hint: 'The database covers glaciers from polar icefields to high mountain ranges and tropical glaciers.'
  },
  {
    id: 'usgs-waterfall',
    channel: 'USGS WATERFALL INVENTORY',
    prompt: 'Name a waterfall recorded in the USGS Waterfalls and Rapids dataset.',
    context: 'The answer must be a named waterfall feature in the USGS Waterfalls and Rapids in the Conterminous United States dataset. Use the recorded waterfall name or an unambiguous official variant. Rapids, unnamed features, duplicate records for the same fall, and locations outside the dataset’s conterminous-US coverage do not qualify.',
    hint: 'The inventory combines field and map records from the World Waterfall Database, US Forest Service sources, and the USGS geographic-names system.'
  },
  {
    id: 'nga-world-port',
    channel: 'WORLD PORT INDEX',
    prompt: 'Name a port, harbour, or terminal listed in the NGA World Port Index.',
    context: 'The answer must be a distinct port, harbour, or terminal record in the National Geospatial-Intelligence Agency’s World Port Index (Publication 150). Use the record’s port name; when names are duplicated, include the country or region to identify the intended record. Marinas, individual ships, and facilities absent from the index do not qualify.',
    hint: 'The index spans commercial ports, harbours, and terminals across more than 190 country codes.'
  },
  {
    id: 'geonames-island',
    channel: 'GEONAMES ISLAND GAZETTEER',
    prompt: 'Name an island or islet listed in GeoNames.',
    context: 'The answer must be a named GeoNames feature in feature class T with feature code ISL or ISLET. Use the primary name or a documented alternate name for that same feature. Island groups recorded only as ISLS, artificial islands, land-tied islands, and duplicate spellings of one island do not count as separate answers.',
    hint: 'GeoNames records islands from large inhabited islands to remote oceanic islets.'
  },
  {
    id: 'geonames-cave',
    channel: 'GEONAMES CAVE GAZETTEER',
    prompt: 'Name a cave listed in GeoNames.',
    context: 'The answer must be a named GeoNames feature with feature class S and feature code CAVE. Use the primary name or a documented alternate name for the same cave. Burial caves recorded only as BUR, natural tunnels, mines, and unnamed cavities do not qualify as separate cave entries.',
    hint: 'The gazetteer includes caves in karst regions, mountains, deserts, and coastal cliffs.'
  },
  {
    id: 'geonames-dam',
    channel: 'GEONAMES WATER INFRASTRUCTURE',
    prompt: 'Name a dam listed in GeoNames.',
    context: 'The answer must be a named GeoNames feature with feature class S and feature code DAM. Use the primary name or a documented alternate name for that same dam. Ruined dams (DAMQ), subsurface dams (DAMSB), weirs, spillways, dikes, and hydroelectric stations do not qualify as separate dams.',
    hint: 'GeoNames includes dams on rivers and reservoirs around the world, from major hydroelectric projects to smaller water-control structures.'
  },
  {
    id: 'grammy-winning-album',
    channel: 'GRAMMY AWARD ARCHIVE',
    prompt: 'Name an album that won a competitive Grammy Award.',
    context: 'The answer must be an album or soundtrack album explicitly credited as a winner in at least one competitive Grammy category in the Recording Academy’s official awards archive. Nominees that did not win, singles, songs, artists, producers, and noncompetitive honors do not qualify as albums.',
    hint: 'Eligible albums span pop, rock, rap, country, jazz, classical, Latin, global, folk, comedy, and soundtrack categories.'
  },
  {
    id: 'bafta-winning-film',
    channel: 'BAFTA FILM AWARDS',
    prompt: 'Name a feature film that won a competitive BAFTA Film Award.',
    context: 'The answer must be a feature-length film credited as a winner in at least one competitive category in BAFTA’s official Film Awards database. Short films, nominees that did not win, television or games awards, regional BAFTAs, and noncompetitive special honours do not qualify.',
    hint: 'A film can qualify through Best Film, acting, directing, screenplay, animation, documentary, or craft categories.'
  },
  {
    id: 'olympic-medalist',
    channel: 'OLYMPIC RESULTS ARCHIVE',
    prompt: 'Name an athlete who won an Olympic medal.',
    context: 'The answer must be an athlete credited with a gold, silver, or bronze medal in the official Olympic Games, Summer or Winter. Athletes in team events count when credited in the official results. Demonstration events, Youth Olympic Games, non-Olympic championships, and athletes who only competed without medalling do not qualify.',
    hint: 'The archive spans more than a century of Summer and Winter Games, including individual and team events.'
  },
  {
    id: 'mlb-player',
    channel: 'MAJOR LEAGUE BASEBALL',
    prompt: 'Name a player who appeared in at least one Major League Baseball regular-season game.',
    context: 'The answer must be an individual credited with at least one regular-season appearance in Major League Baseball. Players from every MLB season qualify, including players with very short careers. Minor-league-only players, spring-training participants without an MLB regular-season appearance, coaches, and umpires do not qualify.',
    hint: 'The player record spans the National and American Leagues from the nineteenth century through current seasons.'
  },
  {
    id: 'ngc-ic-galaxy',
    channel: 'NGC / IC DEEP SKY CATALOGUE',
    prompt: 'Name a galaxy listed in the New General Catalogue or Index Catalogue.',
    context: 'The answer must be an object in the NGC or IC catalogue whose astronomical object type is a galaxy. Use its NGC or IC designation or a recognized proper name for the same object. Star clusters, nebulae, individual stars, duplicate catalogue designations for one galaxy, and objects not in either catalogue do not qualify.',
    hint: 'Beyond famous spiral galaxies, the catalogues include dwarf, lenticular, elliptical, irregular, and interacting galaxies.'
  }
];
