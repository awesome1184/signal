import type { Prompt } from '../game.js';

/**
 * Phase A question-only submission from the GPT-6 agent, 2026-11-15.
 *
 * These IDs and prompt wordings are intended to be frozen after Phase A
 * integration. Answer pools are intentionally absent and belong in Phase B.
 */
export const PHASE_A_QUESTIONS: Prompt[] = [
  {
    id: 'beetle-species',
    channel: 'FIELD ENTOMOLOGY',
    prompt: 'Name a species of beetle.',
    context: 'Any currently accepted living species in the order Coleoptera qualifies. Give its accepted scientific binomial or an unambiguous established common name. A subspecies, genus, family, or alternate scientific synonym does not count as a separate species.',
    hint: 'This is one of the largest and most diverse groups in the animal kingdom.'
  },
  {
    id: 'orchid-species',
    channel: 'BOTANICAL ATLAS',
    prompt: 'Name a species of orchid.',
    context: 'Any currently accepted living species in the family Orchidaceae qualifies. Use its accepted scientific binomial or an established common name. Cultivars and horticultural hybrids do not count as separate species unless recognized taxonomically as a species.',
    hint: 'Look beyond the familiar flowers sold by florists.'
  },
  {
    id: 'living-language',
    channel: 'LINGUISTIC ATLAS',
    prompt: 'Name a living language.',
    context: 'A distinct natural language with living first-language speakers qualifies, including signed languages and creoles. A dialect counts separately only when established linguistic references treat it as a distinct language. Alternate names and spellings for one language are the same answer.',
    hint: 'Thousands are spoken around the world, including many with small speaker communities.'
  },
  {
    id: 'national-park-world',
    channel: 'GLOBAL GEOGRAPHY',
    prompt: 'Name a national park outside the United States.',
    context: 'The place must hold an official national-park designation from the responsible national government or its parks authority in a country other than the United States and its territories. A nature reserve, regional park, national monument, or tourist park does not qualify unless it is officially designated a national park.',
    hint: 'Think about protected landscapes on every continent.'
  },
  {
    id: 'unesco-world-heritage',
    channel: 'WORLD HERITAGE',
    prompt: 'Name a UNESCO World Heritage Site.',
    context: 'The answer must be a property currently inscribed on UNESCO’s World Heritage List, whether cultural, natural, mixed, or transnational. Use the official listed property name. A tentative-list entry or a component of a serial property does not count separately unless it is itself independently inscribed.',
    hint: 'The list includes historic cities, monuments, landscapes, and natural wonders.'
  },
  {
    id: 'space-mission',
    channel: 'SPACE EXPLORATION',
    prompt: 'Name a space mission.',
    context: 'A formally named mission or spacecraft program that has launched at least one spacecraft or payload into space qualifies. Include crewed flight, planetary exploration, astronomy, Earth observation, meteorology, communications, and space science. A launch vehicle, launch event, or mission proposal that never flew does not qualify.',
    hint: 'The answer can come from any country, agency, university, or private operator.'
  },
  {
    id: 'music-genre',
    channel: 'WORLD MUSIC',
    prompt: 'Name a genre of music.',
    context: 'A recognized musical style or genre qualifies, including regional, historical, and contemporary genres and established subgenres. The answer must be a style of music, not an artist, song, album, instrument, recording format, or performance technique. Synonymous labels for one style are not separate identities.',
    hint: 'Look beyond the broad labels used by radio stations.'
  },
  {
    id: 'earth-volcano',
    channel: 'VOLCANO ATLAS',
    prompt: 'Name a volcano on Earth.',
    context: 'A named volcanic mountain, island volcano, submarine volcano, or volcanic complex identified as a volcano in a geological or volcanological reference qualifies, whether active, dormant, or extinct. A broad geographic region or generic lava field does not count unless the named feature itself is classified as a volcano.',
    hint: 'Some are famous landmarks; others lie beneath the ocean.'
  },
  {
    id: 'fungus-species',
    channel: 'MYCOLOGY',
    prompt: 'Name a species of fungus.',
    context: 'Any currently accepted species in the kingdom Fungi qualifies, including mushrooms, molds, yeasts, and other fungal groups. Give an accepted scientific binomial or an unambiguous established common name. A genus, family, common food category, or taxonomic synonym is not a separate species.',
    hint: 'Many fungi are microscopic or live in places people rarely notice.'
  },
  {
    id: 'mythological-figure',
    channel: 'WORLD MYTHOLOGY',
    prompt: 'Name a figure from a mythology.',
    context: 'A named deity, spirit, legendary hero, or other being attested in a traditional mythology qualifies. Include traditions from any region or era. A modern fictional character does not qualify solely because it borrows a mythological name or motif; alternate names for the same figure are one identity.',
    hint: 'Look well beyond the best-known stories from Greece and Rome.'
  }
];
