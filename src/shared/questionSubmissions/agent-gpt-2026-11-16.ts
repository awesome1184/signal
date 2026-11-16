import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution, daily batch.
 *
 * Definitions are committed before answer records. The server selector only
 * activates a question after its first accepted answer is added in Phase B.
 * All scopes are tied to a named reference catalogue or an explicit taxonomic
 * or registry criterion to keep broad pools defensible.
 *
 * Agent: GPT-6
 * Submitted: 2026-11-16
 */
export const QUESTION_SUBMISSIONS_BATCH_3: Prompt[] = [
  {
    id: 'bat-species',
    channel: 'MAMMAL ATLAS',
    prompt: 'Name a living species of bat.',
    context: 'The answer must be a currently accepted living bat species in the Bat Species of the World taxonomic database maintained by the Global Bat Taxonomy Working Group. Use its accepted scientific binomial or an unambiguous recognized common name. Subspecies, fossil-only taxa, and synonyms that are not accepted species are not separate answers.',
    hint: 'There are more than 1,500 recognized bat species, from tiny pipistrelles to flying foxes.'
  },
  {
    id: 'frog-species',
    channel: 'AMPHIBIAN ATLAS',
    prompt: 'Name a species of frog or toad.',
    context: 'The answer must be an accepted living species in the order Anura in Amphibian Species of the World, the American Museum of Natural History reference. Both frogs and toads count. Use the accepted scientific binomial or a recognized common name; exclude salamanders, caecilians, synonyms, and extinct fossil species.',
    hint: 'The order includes thousands of species on every continent except Antarctica.'
  },
  {
    id: 'snake-species',
    channel: 'REPTILE ATLAS',
    prompt: 'Name a living species of snake.',
    context: 'The answer must be a currently accepted living species in the suborder Serpentes in The Reptile Database. Use the accepted scientific binomial or an unambiguous recognized common name. Do not count subspecies as separate species, synonyms, extinct fossil taxa, or other reptiles.',
    hint: 'The database includes tiny threadsnakes, sea snakes, vipers, boas, and pythons.'
  },
  {
    id: 'swallowtail-species',
    channel: 'BUTTERFLY ARCHIVE',
    prompt: 'Name a species of swallowtail butterfly.',
    context: 'The answer must be an accepted species in the butterfly family Papilionidae (swallowtails), as recognized by Catalogue of Life. Use the scientific binomial or a recognized common name. Do not count subspecies, hybrids, or species from other butterfly families.',
    hint: 'The family includes birdwings, birdwings’ relatives, parnassians, and familiar swallowtails.'
  },
  {
    id: 'orchid-species',
    channel: 'BOTANICAL ATLAS',
    prompt: 'Name an orchid species.',
    context: 'The answer must be an accepted species in the plant family Orchidaceae in the World Orchids synonymic checklist. Use the accepted scientific binomial or a clearly unambiguous common name. Hybrids, subspecies, varieties, and synonyms do not count as separate species.',
    hint: 'The orchid family contains tens of thousands of accepted species across hundreds of genera.'
  },
  {
    id: 'coral-species',
    channel: 'REEF BIOLOGY',
    prompt: 'Name a coral species listed in the Coral Trait Database.',
    context: 'The answer must be a species-level coral taxon present in the Coral Trait Database species catalogue. Use its accepted scientific binomial. Do not submit a genus alone, a common name without an unambiguous species match, a synonym, or a non-coral reef organism.',
    hint: 'The database includes reef-building stony corals and many other coral groups from around the world.'
  },
  {
    id: 'ich-heritage-element',
    channel: 'LIVING HERITAGE',
    prompt: 'Name an element on UNESCO’s Lists of Intangible Cultural Heritage.',
    context: 'The answer must be an element formally inscribed on one of UNESCO’s Intangible Cultural Heritage lists or registers, including the Representative List, the List of Intangible Cultural Heritage in Need of Urgent Safeguarding, or the Register of Good Safeguarding Practices. Use the official English title or an unambiguous recognized short form. A practice that is not inscribed does not qualify.',
    hint: 'The entries include crafts, performing arts, food traditions, festivals, knowledge, and social practices.'
  },
  {
    id: 'biosphere-reserve',
    channel: 'BIOSPHERE NETWORK',
    prompt: 'Name a UNESCO biosphere reserve.',
    context: 'The answer must be a site currently designated within UNESCO’s World Network of Biosphere Reserves. Use the official reserve name or a recognized short form. Proposed sites, national parks without biosphere-reserve designation, and former or withdrawn reserves do not qualify.',
    hint: 'The network spans terrestrial, coastal, marine, and transboundary landscapes in more than 140 countries.'
  },
  {
    id: 'unesco-creative-city',
    channel: 'CREATIVE CITIES',
    prompt: 'Name a city in UNESCO’s Creative Cities Network.',
    context: 'The answer must be a city currently listed as a member of UNESCO’s Creative Cities Network in one of its recognized creative fields: crafts and folk art, design, film, gastronomy, literature, media arts, music, or architecture. Use the city’s official listed name; applicants and non-member cities do not count.',
    hint: 'Member cities are recognized for creativity in fields ranging from gastronomy and music to design and literature.'
  },
  {
    id: 'confirmed-exoplanet',
    channel: 'EXOPLANET CATALOGUE',
    prompt: 'Name a well-known star or a confirmed exoplanet outside our Solar System.',
    context: 'The answer must be either a named star other than the Sun, using a recognized proper name or standard star designation, or a planet listed as confirmed in NASA’s Exoplanet Archive. Do not submit a planet candidate, false positive, star cluster, galaxy, or object inside our Solar System.',
    hint: 'Try familiar stars such as Sirius, Polaris, or Betelgeuse, or a famous exoplanet such as Proxima Centauri b.'
  },
  {
    id: 'lunar-crater',
    channel: 'LUNAR NOMENCLATURE',
    prompt: 'Name a named surface feature on the Moon.',
    context: 'The answer must be a named lunar surface feature recorded in the IAU/USGS Gazetteer of Planetary Nomenclature. Craters, maria (lunar seas), mountains, valleys, and rilles count. Use the official name or a recognized English name; features on other worlds do not qualify.'
    hint: 'Familiar examples include the Sea of Tranquility, Tycho Crater, and the Sea of Serenity.'
  },
  {
    id: 'wine-grape-variety',
    channel: 'VINEYARD ARCHIVE',
    prompt: 'Name a grape variety used to make wine.',
    context: 'The answer must be a distinct grape cultivar documented as a wine grape in the University of Adelaide global wine-grape database or the Vitis International Variety Catalogue. Use a recognized cultivar name or established synonym. Table grapes, rootstocks, breeding lines without documented wine use, and duplicate synonyms do not count as separate answers.',
    hint: 'Think beyond Cabernet and Chardonnay: thousands of wine grapes are cultivated around the world.'
  },
  {
    id: 'protected-eu-cheese',
    channel: 'EUROPEAN CHEESE REGISTER',
    prompt: 'Name a cheese protected by an EU PDO or PGI registration.',
    context: 'The answer must be a cheese name registered in the European Union eAmbrosia register as a Protected Designation of Origin (PDO) or Protected Geographical Indication (PGI). Use the registered product name or a recognized short form. Unregistered local cheeses, non-cheese products, and names protected only outside the EU do not qualify.',
    hint: 'France, Italy, Spain, and Greece account for many protected regional cheeses.'
  },
  {
    id: 'roller-coaster',
    channel: 'AMUSEMENT PARK ARCHIVE',
    prompt: 'Name a roller coaster listed in the Roller Coaster DataBase (RCDB).',
    context: 'The answer must be a distinct roller coaster ride with its own record in the Roller Coaster DataBase. Operating, defunct, and under-construction rides count if RCDB lists them as roller coasters. Use the ride’s listed name or a recognized former name; parks, manufacturers, water slides, and duplicate aliases are not separate answers.',
    hint: 'RCDB catalogs thousands of coasters worldwide, including wooden, steel, launched, inverted, and hybrid rides.'
  }
];
