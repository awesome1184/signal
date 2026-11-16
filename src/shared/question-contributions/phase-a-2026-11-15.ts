import type { Prompt } from '../game';

/**
 * Phase A question-only submission.
 *
 * Stable IDs, wording, acceptance criteria, categories, and hints are frozen
 * for the later answer-research phase. Do not add answer records in this file.
 */
export const PHASE_A_QUESTIONS: Prompt[] = [
  {
    id: 'animal-logo-brand',
    channel: 'BRAND SIGNALS',
    prompt: 'Name a brand whose official logo depicts an animal.',
    context: 'The brand’s official logo or primary brand mark must visibly depict an identifiable animal, including a silhouette or stylized animal figure. An animal name in text alone, or a mascot used only in advertising, does not qualify.',
    hint: 'Some familiar animal marks are reduced to a simple silhouette.'
  },
  {
    id: 'time-travel-film',
    channel: 'CINEMA ARCHIVE',
    prompt: 'Name a feature film that uses time travel as a plot element.',
    context: 'A character, object, or consciousness must move between distinct points in time, or the story must use a time loop as a central device. Flashbacks, visions, and stories merely set in the past or future do not qualify.',
    hint: 'The journey can be to the past, the future, or back through the same day.'
  },
  {
    id: 'video-game-company',
    channel: 'GAME INDUSTRY',
    prompt: 'Name a company that has developed or published a video game.',
    context: 'The company must have a credited development or publishing role on at least one released video game, including arcade, console, computer, browser, or mobile games. Hardware makers qualify only when they also developed or published a game.',
    hint: 'Think beyond the largest console makers and include studios that are no longer active.'
  },
  {
    id: 'uniformed-occupation',
    channel: 'WORK & SOCIETY',
    prompt: 'Name an occupation in which workers commonly wear a job-specific uniform.',
    context: 'The role must have a standardized uniform or protective outfit routinely worn as part of the work in an established setting. Ordinary clothing or optional company-branded merchandise alone does not qualify.',
    hint: 'Some uniforms are designed primarily for safety, while others identify a public-facing role.'
  },
  {
    id: 'right-to-left-language',
    channel: 'WORLD LANGUAGES',
    prompt: 'Name a language that is normally written from right to left.',
    context: 'The language must have a recognized standard or commonly used writing system whose normal line direction is right to left. A language with multiple scripts qualifies when at least one established standard script is written this way.',
    hint: 'The direction of the writing system is the clue, not how many people speak it.'
  },
  {
    id: 'mediterranean-river',
    channel: 'HYDROLOGY',
    prompt: 'Name a river that flows directly into the Mediterranean Sea.',
    context: 'The river must have its own mouth discharging into the Mediterranean or one of its connected named seas, such as the Adriatic or Aegean. A tributary that joins another river before reaching the sea does not qualify.',
    hint: 'Look around the coasts of southern Europe, North Africa, and the eastern Mediterranean.'
  },
  {
    id: 'tool-using-animal',
    channel: 'ANIMAL COGNITION',
    prompt: 'Name an animal species that has been documented using tools.',
    context: 'A recognized animal species must have documented behavior in which it manipulates an external object to accomplish a task, such as obtaining food or solving a problem. Observations in the wild or in captivity qualify; merely using a body part does not.',
    hint: 'Tools can be simple natural objects rather than manufactured devices.'
  },
  {
    id: 'metro-city',
    channel: 'URBAN TRANSIT',
    prompt: 'Name a city served by an operating metro or rapid-transit rail system.',
    context: 'At least one station in the city must serve an operating urban passenger metro or rapid-transit rail network. Tram-only or light-rail-only systems, commuter rail alone, and planned or permanently closed systems do not qualify.',
    hint: 'Think of major cities on every inhabited continent.'
  },
  {
    id: 'mountain-range',
    channel: 'EARTH GEOGRAPHY',
    prompt: 'Name a recognized mountain range on Earth.',
    context: 'A named, geographically recognized chain or system of mountains qualifies, including a recognized subrange with its own name. An individual peak, isolated mountain, or plateau does not.',
    hint: 'Some mountain systems cross several countries, while others are much more localized.'
  },
  {
    id: 'off-earth-lander',
    channel: 'SPACE EXPLORATION',
    prompt: 'Name a spacecraft that has landed on a celestial body other than Earth.',
    context: 'The spacecraft must have made a soft or hard landing on the surface of a non-Earth body, including a moon, planet, asteroid, or comet. Flybys and orbiters that never reached the surface do not qualify.',
    hint: 'A mission still counts if the landing was brief or the spacecraft stopped working soon afterward.'
  }
];
