import type { Prompt } from '../game.js';

/**
 * Phase A question-only contribution.
 *
 * These definitions are intentionally separate from answer-bank files. They
 * enter the central question catalog now, but contentRotation keeps them
 * ineligible for production rotation until Phase B supplies accepted answers.
 *
 * Agent: GPT-6
 * Submitted: 2026-11-15
 */
export const QUESTION_SUBMISSIONS: Prompt[] = [
  {
    id: 'french-official-country',
    channel: 'WORLD LANGUAGES',
    prompt: 'Name a country where French is an official language.',
    context: 'The answer must be a sovereign country whose national government recognizes French as an official language at the national level, alone or alongside other languages. Regional-only official status or French being widely spoken without official status does not qualify.',
    hint: 'French has official status on several continents.'
  },
  {
    id: 'animal-logo-brand',
    channel: 'BRAND IDENTITIES',
    prompt: 'Name a brand whose official logo includes an animal.',
    context: 'The animal must be a recognizable visual element in the brand’s official logo or primary brand mark. An animal appearing only in an advertisement, product name, or temporary campaign does not qualify.',
    hint: 'Look at sportswear, cars, food, technology, and luxury labels.'
  },
  {
    id: 'uniformed-occupation',
    channel: 'WORKING WORLD',
    prompt: 'Name a job in which workers commonly wear a uniform.',
    context: 'The answer must be a recognizable occupation in which standardized clothing is widely required or customary as part of the role. Ordinary business attire or protective equipment used only at an unusual worksite is not enough.',
    hint: 'Think about public service, transport, healthcare, hospitality, and trades.'
  },
  {
    id: 'time-travel-film',
    channel: 'CINEMA',
    prompt: 'Name a movie in which time travel is a central plot device.',
    context: 'The answer must be a released, feature-length narrative film in which a person, object, or consciousness travels through time, or a time loop materially drives the story. A historical setting, flashback, or vision alone does not qualify.',
    hint: 'Time travel appears in science fiction, comedy, action, and animation.'
  },
  {
    id: 'naruto-character',
    channel: 'ANIME ARCHIVE',
    prompt: 'Name a character from the Naruto franchise.',
    context: 'The answer must be a named character appearing in the official Naruto manga or anime franchise, including the official Boruto sequel. Fan-created characters and unnamed background extras do not qualify.',
    hint: 'Think beyond Team 7 and the best-known village leaders.'
  },
  {
    id: 'one-piece-character',
    channel: 'ANIME ARCHIVE',
    prompt: 'Name a character from One Piece.',
    context: 'The answer must be a named character appearing in the official One Piece manga or its official anime adaptation. Fan-created characters and characters appearing only in unofficial works do not qualify.',
    hint: 'The world is full of pirates, marines, royalty, and strange creatures.'
  },
  {
    id: 'video-game-company',
    channel: 'INTERACTIVE ENTERTAINMENT',
    prompt: 'Name a company or studio that makes video games.',
    context: 'The answer must be an identifiable company or independent studio that has developed or published at least one commercially released video game. A hardware maker or storefront counts only if it has also developed or published games.',
    hint: 'Include major publishers, regional studios, and small independent developers.'
  },
  {
    id: 'programming-language',
    channel: 'COMPUTER SCIENCE',
    prompt: 'Name a programming language.',
    context: 'The answer must be a distinct language with documented syntax or an implementation for expressing computations. General-purpose, scripting, domain-specific, visual, and esoteric languages count; markup languages, data formats, frameworks, and libraries alone do not.',
    hint: 'Think about languages used for websites, science, embedded systems, and education.'
  },
  {
    id: 'culinary-spice-plant',
    channel: 'GLOBAL CUISINE',
    prompt: 'Name a plant that is used to produce a culinary spice.',
    context: 'A named plant or recognized plant species qualifies when one or more of its parts are used as a culinary seasoning. A plant used only medicinally, ornamentally, or for fragrance does not qualify.',
    hint: 'Spices can come from seeds, bark, roots, flowers, fruits, and other plant parts.'
  },
  {
    id: 'international-river',
    channel: 'WORLD GEOGRAPHY',
    prompt: 'Name a river that flows through or along the border of more than one country.',
    context: 'The answer must be a named natural river whose course crosses an international border or forms part of one. A river entirely within one country and a canal do not qualify.',
    hint: 'Look at major river basins in Europe, Africa, Asia, and South America.'
  }
];
