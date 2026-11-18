import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, 2026-11-17.
 *
 * Every question is tied to a named, maintained catalogue or an explicit
 * registry rule. Phase B answer records are committed separately. The daily
 * Redis selector keeps these IDs inactive until their answer pools exist.
 *
 * Reference starting points:
 * - Discover Life World Bee Checklist: https://www.discoverlife.org/mp/20q?search=Apoidea
 * - World Odonata List: https://www.pugetsound.edu/puget-sound-museum-natural-history/biodiversity-resources/insects/dragonflies/world-odonata-list
 * - FishBase: https://www.fishbase.se/
 * - MolluscaBase: https://www.molluscabase.org/
 * - GeoNames feature codes and gazetteer: https://www.geonames.org/export/codes.html
 * - Protected Planet: https://www.protectedplanet.net/
 * - Meteoritical Bulletin Database: https://www.lpi.usra.edu/meteor/metbull.cfm
 * - USGS/IAU Mars Gazetteer: https://planetarynames.wr.usgs.gov/Page/MARS/target
 * - Academy Awards Database: https://awardsdatabase.oscars.org/
 * - Project Gutenberg: https://www.gutenberg.org/ebooks/
 * - NBA Stats: https://www.nba.com/stats/
 * - IETF RFC Series: https://www.ietf.org/process/rfcs/
 * - Television Academy awards database: https://www.televisionacademy.com/awards/nominees-winners
 *
 * Submitted by GPT-6.
 */
export const QUESTION_SUBMISSIONS_DAILY_2026_11_17: Prompt[] = [
  {
    id: 'bee-species',
    channel: 'GLOBAL BEE CHECKLIST',
    prompt: 'Name a living bee species listed in the Discover Life World Bee Checklist.',
    context: 'The answer must be an accepted living species in the Discover Life World Bee Checklist. Use the accepted scientific binomial or a recognized common name that identifies one species unambiguously. Do not count subspecies, synonyms, fossil-only taxa, hybrids, or genus-level names as separate species.',
    hint: 'The checklist covers honey bees, bumble bees, carpenter bees, leafcutter bees, mining bees, sweat bees, and many less familiar groups.'
  },
  {
    id: 'odonate-species',
    channel: 'WORLD ODONATA',
    prompt: 'Name a living dragonfly or damselfly species in the World Odonata List.',
    context: 'The answer must be an accepted extant species in the World Odonata List. Both true dragonflies and damselflies qualify. Use the accepted scientific binomial or an unambiguous recognized common name. Fossil taxa, subspecies, synonyms, and genus names do not count as separate species.',
    hint: 'Look beyond familiar skimmers and darners to jewelwings, spreadwings, threadtails, clubtails, and tropical damselflies.'
  },
  {
    id: 'marine-fish-species',
    channel: 'FISHBASE MARINE INDEX',
    prompt: 'Name a fish species in FishBase whose habitat includes marine water.',
    context: 'The answer must be a valid species in FishBase with a marine habitat record, including species recorded as marine-only or as using both marine and brackish water. Freshwater-only species, non-fish animals, subspecies, synonyms, and genus-level names do not qualify. Use the accepted scientific binomial or a recognized common name identifying one species.',
    hint: 'Think across reef fish, open-ocean fish, deep-sea fish, coastal fish, and species that migrate between habitats.'
  },
  {
    id: 'mollusc-species',
    channel: 'MOLLUSCABASE',
    prompt: 'Name an accepted living mollusc species in MolluscaBase.',
    context: 'The answer must be an accepted extant species in MolluscaBase. Marine, freshwater, and terrestrial molluscs all qualify. Fossil-only species, synonyms, subspecies, infraspecific taxa, and non-molluscan animals do not count as separate answers. Use the accepted scientific binomial or a recognized common name identifying one species.',
    hint: 'The catalogue includes snails, slugs, clams, mussels, oysters, chitons, squid, cuttlefish, and octopuses.'
  },
  {
    id: 'geonames-stream',
    channel: 'GEONAMES HYDROGRAPHY',
    prompt: 'Name a stream listed in GeoNames with feature code H.STM or H.STMS.',
    context: 'The answer must be a named geographic feature in the GeoNames gazetteer whose feature class is H and feature code is STM (stream) or STMS (streams). Use the primary name or a documented alternate name for that same feature. Lakes, canals, rivers represented only by another feature code, unnamed reaches, and duplicate spellings of one feature do not count as separate answers.',
    hint: 'GeoNames includes named streams and creeks from every continent, including small local watercourses.'
  },
  {
    id: 'geonames-lake',
    channel: 'GEONAMES HYDROGRAPHY',
    prompt: 'Name a lake listed in GeoNames with feature code H.LK.',
    context: 'The answer must be a named geographic feature in the GeoNames gazetteer whose feature class is H and feature code is LK (lake). Use the primary name or a documented alternate name for that same feature. Ponds, reservoirs, bays, seas, and duplicate spellings of one lake do not count as separate answers.',
    hint: 'Look beyond the Great Lakes to lakes in Africa, Asia, South America, remote islands, and high mountain regions.'
  },
  {
    id: 'protected-national-park',
    channel: 'PROTECTED PLANET',
    prompt: 'Name a national park outside Canada recorded in Protected Planet.',
    context: 'The answer must match a current protected-area record in Protected Planet’s World Database of Protected and Conserved Areas whose official site name or national designation identifies it as a national park outside Canada. Use the recorded site name. OECMs, proposed sites, nature reserves that are not designated national parks, and Canadian parks do not qualify.',
    hint: 'The category includes national parks in Africa, Asia, Europe, Oceania, and the Americas.'
  },
  {
    id: 'meteorite-name',
    channel: 'METEORITICS ARCHIVE',
    prompt: 'Name a valid meteorite in the Meteoritical Bulletin Database.',
    context: 'The answer must be an individually recognized meteorite with a valid name in the Meteoritical Bulletin Database, as approved by the Meteoritical Society’s Nomenclature Committee. Use the database spelling or an official abbreviation documented there. Provisional names, dense collection areas, pseudometeorites, and specimens of doubtful origin do not qualify as individual valid meteorites.',
    hint: 'The database includes witnessed falls, Antarctic finds, lunar and martian meteorites, iron meteorites, and ordinary chondrites.'
  },
  {
    id: 'mars-crater',
    channel: 'MARS GAZETTEER',
    prompt: 'Name an impact crater on Mars with a name approved by the International Astronomical Union.',
    context: 'The answer must be a feature in the USGS Gazetteer of Planetary Nomenclature whose target body is Mars and whose approved feature type is Crater. Use the IAU-approved name. Craters on other bodies, unapproved informal names, and other Martian feature types such as valleys, mountains, and plains do not qualify.',
    hint: 'Some are famous rover destinations; many others honor scientists, writers, and towns.'
  },
  {
    id: 'academy-award-winning-film',
    channel: 'ACADEMY AWARDS',
    prompt: 'Name a feature film that won a competitive Academy Award.',
    context: 'The answer must be a feature-length film listed as a winner in at least one competitive film category in the official Academy Awards Database. Animated, documentary, international, and live-action feature films qualify. Short films, nominees that did not win, honorary awards, and Scientific and Technical Award recipient organizations do not qualify.',
    hint: 'A film can qualify through acting, directing, writing, picture, international feature, animation, documentary, or craft categories.'
  },
  {
    id: 'gutenberg-novel',
    channel: 'PROJECT GUTENBERG',
    prompt: 'Name a novel available in the Project Gutenberg ebook catalogue.',
    context: 'The answer must be a distinct novel published as an ebook in Project Gutenberg’s catalogue. Use the catalogue title or a recognized title variant for the same work. Plays, poems, short-story collections, nonfiction, individual chapters, and duplicate editions of the same novel do not count as separate answers.',
    hint: 'The catalogue ranges from famous classics to translated, historical, adventure, mystery, and lesser-known novels.'
  },
  {
    id: 'nba-player',
    channel: 'NBA HISTORY',
    prompt: 'Name a player who made at least one regular-season appearance in the National Basketball Association.',
    context: 'The answer must be an individual credited with at least one regular-season appearance in the NBA. Players from every NBA season qualify, including players with only one appearance. ABA-only players, WNBA players, preseason-only participants, coaches, and players who never appeared in an NBA regular-season game do not qualify.',
    hint: 'The player list spans the league’s earliest seasons through current rosters and includes many short-career players.'
  },
  {
    id: 'ietf-protocol',
    channel: 'IETF RFC ARCHIVE',
    prompt: 'Name an Internet protocol or protocol extension specified in an IETF RFC.',
    context: 'The answer must be a named Internet protocol or protocol extension specified in a published IETF Request for Comments document. Use the protocol’s recognized name or abbreviation. A software product, vendor implementation, RFC document title that is not a protocol, Internet draft without a published RFC, or unrelated data format does not qualify.',
    hint: 'Consider transport, routing, naming, messaging, security, real-time media, and application-layer protocols.'
  },
  {
    id: 'emmy-nominated-series',
    channel: 'TELEVISION ACADEMY',
    prompt: 'Name a television series or miniseries that received a Primetime Emmy nomination.',
    context: 'The answer must be a television series, limited series, miniseries, or anthology series with at least one nomination in the Primetime Emmy Awards, including Primetime Creative Arts categories, as recorded by the Television Academy. Daytime, International, News and Documentary, Sports, Children’s and Family, and regional Emmy nominations do not qualify. Use the program’s recognized title.',
    hint: 'Drama, comedy, animation, reality, variety, limited series, and technical categories all provide eligible programs.'
  }
];
