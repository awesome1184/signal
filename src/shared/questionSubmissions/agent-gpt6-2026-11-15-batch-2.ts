import type { Prompt } from '../game.js';

/**
 * SIGNAL Phase A question-only submission, batch 2.
 *
 * Acceptance criteria are recorded in each context field. Answer records are
 * intentionally omitted and must be added only during Phase B.
 */
export const QUESTION_SUBMISSIONS_BATCH_2: Prompt[] = [
  {
    id: 'national-park',
    channel: 'WORLD ATLAS',
    prompt: 'Name a national park.',
    context: 'Acceptance: The answer must be a specifically named geographic park formally designated as a national park by a national government or an authorized national-level agency. Current and historically designated national parks qualify. A protected area does not qualify solely because it is scenic, large, or informally called a park.',
    hint: 'Look across continents, islands, forests, deserts, and marine environments.'
  },
  {
    id: 'named-volcano',
    channel: 'VOLCANOLOGY',
    prompt: 'Name a volcano.',
    context: 'Acceptance: The answer must identify a specifically named volcanic feature recognized by a geological or volcanological authority, such as a volcanic mountain, island, caldera, field, or submarine volcano. Active, dormant, and extinct volcanoes qualify, including those on other planetary bodies. A broad volcanic region without a named individual feature does not.',
    hint: 'Some are underwater or even on worlds beyond Earth.'
  },
  {
    id: 'board-game',
    channel: 'TABLETOP ARCHIVE',
    prompt: 'Name a board game.',
    context: 'Acceptance: A named tabletop game qualifies when its principal play uses a board or defined playing surface and it has documented rules. Include modern, traditional, regional, and historical games. Exclude video games and card-only games that do not use a board or defined playing surface.',
    hint: 'Think beyond the games most commonly found in toy stores.'
  },
  {
    id: 'space-science-mission',
    channel: 'SPACE EXPLORATION',
    prompt: 'Name a space science mission.',
    context: 'Acceptance: A named mission qualifies if it sends a spacecraft, space observatory, or scientific instrument beyond Earth’s atmosphere to investigate a celestial body, the Sun, the wider universe, or the space environment. Include flybys, orbiters, landers, sample-return missions, and space telescopes. Exclude missions dedicated solely to routine communications, navigation, or commercial services.',
    hint: 'Consider probes, landers, orbiters, and space telescopes.'
  },
  {
    id: 'dinosaur-genus',
    channel: 'PALEONTOLOGY',
    prompt: 'Name a genus of dinosaur.',
    context: 'Acceptance: The answer must be a formally published genus classified within Dinosauria in a recognized paleontological or taxonomic reference. Include non-avian dinosaurs and avian dinosaurs when the genus is treated as part of Dinosauria. Exclude species epithets without the genus, informal nicknames, and names that are only proposed or known to be invalid synonyms.',
    hint: 'The fossil record includes far more than the most famous giant dinosaurs.'
  },
  {
    id: 'butterfly-species',
    channel: 'LEPIDOPTEROLOGY',
    prompt: 'Name a species of butterfly.',
    context: 'Acceptance: The answer must identify a recognized butterfly species in a reputable zoological taxonomy or field guide. Common names and scientific binomials qualify. Exclude moths, subspecies given without their parent species, and broader family or genus names.',
    hint: 'Butterflies live in nearly every region where flowering plants grow.'
  },
  {
    id: 'tree-species',
    channel: 'BOTANICAL ATLAS',
    prompt: 'Name a species of tree.',
    context: 'Acceptance: The answer must be a recognized botanical species that is described by a reputable botanical reference as growing in tree form, with a woody trunk and persistent above-ground structure. Include native and cultivated tree species. Exclude cultivars, genera without a species, and plants described only as shrubs, vines, or herbs.',
    hint: 'Consider forests from tropical rainforests to boreal and desert regions.'
  },
  {
    id: 'mythological-deity',
    channel: 'WORLD MYTHOLOGY',
    prompt: 'Name a deity from a documented mythology or traditional religion.',
    context: 'Acceptance: The answer must be a named god, goddess, or other being treated as divine in a documented historical, cultural, or living traditional religious or mythological system. Include regional and Indigenous traditions. Exclude heroes, monsters, spirits not regarded as divine, and deities created solely for modern fictional works.',
    hint: 'Look beyond the best-known pantheons of ancient Greece and Rome.'
  },
  {
    id: 'musical-genre',
    channel: 'GLOBAL MUSIC',
    prompt: 'Name a musical genre.',
    context: 'Acceptance: The answer must be a named genre or established subgenre documented in music references or by a recognized musical community, with identifiable stylistic, historical, or cultural conventions. Include regional, traditional, popular, and experimental genres. Exclude a mood adjective, a single artist, or an individual song.',
    hint: 'Genres develop across regions, eras, communities, and instruments.'
  },
  {
    id: 'architectural-style',
    channel: 'ARCHITECTURE ARCHIVE',
    prompt: 'Name an architectural style.',
    context: 'Acceptance: The answer must be a named architectural style, movement, or regional tradition documented in architectural history and identified by recurring design characteristics or a recognized historical context. Include historical and contemporary styles. Exclude an individual building, architect, construction material, or engineering technique by itself.',
    hint: 'Think across ancient, regional, revival, and modern architecture.'
  }
];
