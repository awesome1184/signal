import type { Prompt } from '../game.js';

/**
 * Independent Phase A question-only contribution.
 *
 * IDs and wording are distinct from the existing catalog and the other
 * visible Phase A submissions. No answer records are included here.
 *
 * Agent: GPT-6
 * Submitted: 2026-11-15
 */
export const GPT6_PHASE_A_QUESTIONS: Prompt[] = [
  {
    id: 'university',
    channel: 'GLOBAL EDUCATION',
    prompt: 'Name a university.',
    context: 'Acceptance criteria: the answer must be a distinct, officially recognized higher-education institution authorized to award university-level degrees. Current and formally documented historical universities count, including specialist, technical, open, and religious institutions. A school, research center, campus, or unaccredited diploma provider without degree-awarding university status does not.',
    hint: 'Look beyond famous research universities to regional, specialist, and historical institutions.'
  },
  {
    id: 'scheduled-passenger-airport',
    channel: 'GLOBAL AVIATION',
    prompt: 'Name an airport that has handled scheduled passenger flights.',
    context: 'Acceptance criteria: the answer must be a named civil airport that has hosted at least one scheduled passenger service operated by an airline. Current and historical airports count. A private airstrip, military airfield without scheduled passenger service, heliport, or airport used only for unscheduled charter flights does not.',
    hint: 'Include regional airports and former airline hubs, not just the world’s busiest airports.'
  },
  {
    id: 'museum',
    channel: 'CULTURAL INSTITUTIONS',
    prompt: 'Name a museum.',
    context: 'Acceptance criteria: the answer must be a named institution that identifies as a museum and maintains a collection or exhibition program for public education, research, or preservation. Art, history, science, natural history, technology, community, and specialist museums count. A temporary exhibition, commercial gallery without museum status, or private collection never open to the public does not.',
    hint: 'Think about local, national, university, specialist, and community museums around the world.'
  },
  {
    id: 'named-bridge',
    channel: 'BUILT WORLD',
    prompt: 'Name a bridge with an established name.',
    context: 'Acceptance criteria: the answer must be a specific, named constructed bridge or viaduct that carries or carried pedestrians, roads, railways, or utilities across a physical gap or obstacle. Current and historic structures count. Natural arches, tunnels, unnamed bridge types, and proposed structures that were never built do not.',
    hint: 'Consider road, railway, pedestrian, aqueduct, historic, and suspension bridges.'
  },
  {
    id: 'cheese-variety',
    channel: 'GLOBAL FOODWAYS',
    prompt: 'Name a variety of cheese.',
    context: 'Acceptance criteria: the answer must be a recognized, distinctly named cheese variety made by coagulating animal milk, with an identifiable tradition, production method, or regional identity. Cheeses from any country and milk source count. Brands, individual product flavors, sauces, and dishes containing cheese do not count as separate varieties.',
    hint: 'Look beyond supermarket staples to regional and traditional cheeses.'
  },
  {
    id: 'pasta-shape',
    channel: 'GLOBAL FOODWAYS',
    prompt: 'Name a type or shape of pasta.',
    context: 'Acceptance criteria: the answer must be a recognized named pasta form or variety, fresh or dried, from any culinary tradition. Regional names and established shape variants count when they identify a distinct form. Prepared dishes, sauces, brands, and non-pasta dumplings do not.',
    hint: 'Pasta comes in far more shapes than the familiar tubes and long strands.'
  },
  {
    id: 'dance-style',
    channel: 'WORLD CULTURE',
    prompt: 'Name a style or form of dance.',
    context: 'Acceptance criteria: the answer must be an established named dance style, genre, or traditional dance form with a recognizable practice or technique. Folk, social, ballroom, classical, ritual, contemporary, and street styles from any culture count. An individual dance step, song, performer, or one-off choreography does not.',
    hint: 'Think across folk traditions, social dances, classical forms, and modern street styles.'
  },
  {
    id: 'historical-battle',
    channel: 'MILITARY HISTORY',
    prompt: 'Name a battle from history.',
    context: 'Acceptance criteria: the answer must be a specifically named historical armed engagement recognized as a battle or siege in a reputable historical reference. Land, sea, and air battles from any period or region count. A whole war, campaign, political revolution, massacre, or isolated skirmish not recognized as a named battle does not.',
    hint: 'Look across ancient, medieval, early modern, and contemporary military history.'
  },
  {
    id: 'aircraft-model',
    channel: 'AVIATION ARCHIVE',
    prompt: 'Name a model of aircraft that has flown.',
    context: 'Acceptance criteria: the answer must be a distinct, named or officially designated atmospheric aircraft design that has completed at least one flight. Fixed-wing aircraft, helicopters, gliders, airships, and uncrewed aircraft count, including prototypes and experimental models. A proposed design that was never built and flown, an engine, or a spacecraft does not.',
    hint: 'Include civilian, military, experimental, historic, and uncrewed designs.'
  },
  {
    id: 'documented-shipwreck',
    channel: 'MARITIME HISTORY',
    prompt: 'Name a vessel that became a documented shipwreck.',
    context: 'Acceptance criteria: the answer must be a specifically named vessel whose sinking, grounding, destruction, or deliberate scuttling is documented by a historical, maritime, or archaeological source. Civilian, military, commercial, and exploratory vessels from any era count. A vessel merely retired or dismantled without being wrecked does not.',
    hint: 'Think about famous disasters, naval losses, exploration voyages, and ancient wrecks.'
  }
];
