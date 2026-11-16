import type { Prompt } from '../game.js';

/**
 * SIGNAL Phase A question-only submission, agent 02.
 *
 * Permanent IDs, exact prompt wording, and acceptance boundaries are defined
 * here. Answer records are intentionally deferred to Phase B.
 */
export const PHASE_A_AGENT_02_QUESTIONS: Prompt[] = [
  {
    id: 'automobile-manufacturer',
    channel: 'MOBILITY INDUSTRY',
    prompt: 'Name a company that has manufactured automobiles.',
    context: 'The answer must be a named company or automaker that has designed, assembled, or manufactured at least one complete passenger car or light commercial vehicle intended for road use. Current and defunct manufacturers count, including contract manufacturers. Parts suppliers, dealerships, vehicle models, and tuning shops that never produced complete vehicles do not.',
    hint: 'Look beyond today’s largest car brands and include historic manufacturers.'
  },
  {
    id: 'scheduled-passenger-airport',
    channel: 'GLOBAL TRANSIT',
    prompt: 'Name an airport that has handled scheduled passenger flights.',
    context: 'The answer must be a named, identifiable airport that has operated published scheduled passenger air services, either currently or historically. Charter-only airfields, military bases without scheduled public passenger service, and proposed airports that never opened do not qualify.',
    hint: 'Airports that have closed or changed names can still qualify.'
  },
  {
    id: 'caribbean-island',
    channel: 'ISLAND ATLAS',
    prompt: 'Name an island in the Caribbean.',
    context: 'The answer must be a naturally occurring, individually named island or cay in the Caribbean region, including the Greater Antilles, Lesser Antilles, and Lucayan Archipelago. An entire country, island group, reef, or uninhabited rock without an established geographic name does not qualify.',
    hint: 'Both large inhabited islands and small named cays count.'
  },
  {
    id: 'natural-lake',
    channel: 'INLAND WATERS',
    prompt: 'Name a natural lake on Earth.',
    context: 'The answer must be an individually named natural body of standing inland water identified as a lake in a recognized geographic or hydrological source. Freshwater, saline, high-altitude, and seasonal lakes qualify. Artificial reservoirs, swimming pools, and ordinary ponds do not.',
    hint: 'Some of the world’s largest lakes are salty, shallow, or located at high altitude.'
  },
  {
    id: 'cheese-variety',
    channel: 'CULINARY ARCHIVE',
    prompt: 'Name a recognized variety of cheese.',
    context: 'The answer must be a named cheese type or regional variety documented in a culinary, food-science, or geographic reference. Traditional and protected regional varieties qualify. A company or product brand does not count unless its name is also the established name of the cheese variety; synonyms for one cheese are one answer.',
    hint: 'Cheese traditions vary widely by region, milk source, and aging method.'
  },
  {
    id: 'bread-variety',
    channel: 'GLOBAL BAKERY',
    prompt: 'Name a recognized variety of bread.',
    context: 'The answer must be a distinct, named bread type or regional bread variety documented in a culinary or food reference. Include flatbreads, loaves, rolls, and leavened or unleavened breads. Cakes, pastries, crackers, sandwiches, and bakery-specific branded products do not qualify.',
    hint: 'Bread comes in far more forms than sliced loaves and baguettes.'
  },
  {
    id: 'dance-style',
    channel: 'MOVEMENT ARCHIVE',
    prompt: 'Name a recognized style or form of dance.',
    context: 'The answer must be a named dance style, tradition, or form recognized in a dance, cultural, or historical reference. Folk, social, ballroom, classical, ceremonial, and street-dance forms qualify. A single choreographed routine, performer, or musical genre alone does not.',
    hint: 'Think across traditional, social, stage, and contemporary dance.'
  },
  {
    id: 'historical-battle',
    channel: 'HISTORY ARCHIVE',
    prompt: 'Name a battle recorded in history.',
    context: 'The answer must identify a distinct, named armed engagement documented by historical sources. Land, naval, aerial, and conventionally named siege battles qualify, from ancient to modern history. A war, campaign, political revolution, or an unnamed skirmish does not.',
    hint: 'Battles have been fought on land, at sea, in the air, and across many eras.'
  },
  {
    id: 'architectural-style',
    channel: 'BUILT ENVIRONMENT',
    prompt: 'Name a recognized architectural style.',
    context: 'The answer must be a named architectural style, school, or movement recognized in architectural or art-historical references, including regional and vernacular traditions. A single building, architect, construction material, or engineering technique alone does not qualify.',
    hint: 'Styles can be tied to a place, a historical period, or a design movement.'
  },
  {
    id: 'official-public-holiday',
    channel: 'CIVIC CALENDAR',
    prompt: 'Name an official public holiday observed by a government.',
    context: 'The answer must be a recurring named holiday formally recognized as a public or non-working holiday by at least one national, state, provincial, or territorial government. Religious, cultural, and civic holidays qualify when officially listed. Unofficial observances and one-off commemorations do not.',
    hint: 'Some holidays are national, while others are official only in one region.'
  }
];
