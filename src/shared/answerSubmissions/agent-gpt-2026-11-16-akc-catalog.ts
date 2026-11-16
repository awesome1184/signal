import type { AnswerRecord } from '../answerBank.js';

/**
 * Remaining entries from the AKC's fully recognized breed register.
 *
 * Source: American Kennel Club, "Breeds by Year Recognized".
 * https://www.akc.org/press-center/articles-resources/facts-and-stats/breeds-year-recognized/
 * The page lists 205 recognized breeds and says it was last updated 2026-01-01.
 *
 * Foundation Stock Service (FSS) breeds are deliberately excluded: FSS is
 * an earlier stage and is not the same as full AKC breed recognition.
 * Point values estimate player familiarity, not measured answer frequency.
 */
export const ANSWER_SUBMISSIONS_AKC_CATALOG: Record<string, AnswerRecord[]> = {
  'akc-dog-breed': [
    { aliases: ["Shetland Sheepdog"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Miniature Schnauzer"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Bernese Mountain Dog"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Vizsla"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Portuguese Water Dog"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Havanese"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Miniature American Shepherd"], score: 15, tier: "FAMILIAR", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Standard Schnauzer"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["American Staffordshire Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["English Cocker Spaniel"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Soft Coated Wheaten Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Tibetan Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Staffordshire Bull Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Chinese Crested"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Chinese Shar-Pei"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Nova Scotia Duck Tolling Retriever"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Dogue de Bordeaux"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Leonberger"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Russell Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Rat Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Fox Terrier"], score: 30, tier: "UNCOMMON", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["English Foxhound"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Welsh Springer Spaniel"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Norwich Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Puli"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["German Wirehaired Pointer"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Silky Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Australian Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Bearded Collie"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Ibizan Hound"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Norfolk Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Petit Basset Griffon Vendéen"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Greater Swiss Mountain Dog"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Parson Russell Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["German Pinscher"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Toy Fox Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Black Russian Terrier"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Neapolitan Mastiff"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Tibetan Mastiff"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Beauceron"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Redbone Coonhound"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Coton de Tulear"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Barbet"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Dogo Argentino"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Bracco Italiano"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Manchester Terrier (Toy)"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Manchester Terrier (Standard)"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Cardigan Welsh Corgi"], score: 60, tier: "RARE", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Glen of Imaal Terrier"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Canaan Dog"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Spinone Italiano"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Polish Lowland Sheepdog"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Irish Red and White Setter"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Norwegian Buhund"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Pyrenean Shepherd"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["American English Coonhound"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Portuguese Podengo Pequeno"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Wirehaired Vizsla"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Bergamasco"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Berger Picard"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Boerboel"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Cirneco dell'Etna"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Spanish Water Dog"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Nederlandse Kooikerhondje"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." },
    { aliases: ["Belgian Laekenois"], score: 85, tier: "DEEP CUT", note: "Listed in the American Kennel Club's 205 fully recognized breeds (2026-01-01 register); point value estimates ordinary-player familiarity." }
  ],
  'canadian-national-park': [
    { aliases: ["Rouge National Urban Park", "Rouge"], score: 85, tier: "DEEP CUT", note: "Listed by Parks Canada on its official National Parks page as a national urban park; a less commonly named Canadian park designation." }
  ]
};
