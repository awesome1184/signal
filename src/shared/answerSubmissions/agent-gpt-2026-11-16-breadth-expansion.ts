import type { AnswerRecord } from '../answerBank.js';

/**
 * Breadth expansion for established SIGNAL questions.
 *
 * Research references checked 2026-11-16:
 * - UNESCO Intangible Cultural Heritage lists:
 *   https://ich.unesco.org/en/lists?type=00002
 * - UNESCO Man and the Biosphere reserve directory:
 *   https://www.unesco.org/en/mab/list
 * - UNESCO Creative Cities directory and dataset:
 *   https://www.unesco.org/en/creative-cities/grid?hub=80094
 *   https://data.unesco.org/explore/dataset/cce001/
 * - NASA lunar feature guide and IAU/USGS Planetary Names:
 *   https://moon.nasa.gov/
 *   https://planetarynames.wr.usgs.gov/
 * - Vitis International Variety Catalogue:
 *   https://www.vivc.de/
 * - EU eAmbrosia / protected geographical indications register:
 *   https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/
 *   https://eur-lex.europa.eu/
 *
 * Each canonical answer is listed first; alternate accepted names are aliases.
 * Rarity is an estimated player-familiarity tier, not a measured survey rate.
 */

type AnswerName = string | readonly string[];
type TierGroup = {
  score: number;
  tier: string;
  note: string;
  names: AnswerName[];
};

function records(...groups: TierGroup[]): AnswerRecord[] {
  return groups.flatMap((group) => group.names.map((name) => ({
    aliases: typeof name === 'string' ? [name] : [...name],
    score: group.score,
    tier: group.tier,
    note: group.note
  })));
}

export const ANSWER_SUBMISSIONS_BREADTH_EXPANSION: Record<string, AnswerRecord[]> = {
  'ich-heritage-element': records(
    {
      score: 10, tier: 'BACKGROUND',
      note: 'A UNESCO-inscribed hospitality tradition with an internationally recognizable name.',
      names: [
        ['Arabic coffee, a symbol of generosity', 'Arabic coffee']
      ]
    },
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A recognized French social dining tradition on UNESCO’s Representative List.',
      names: [
        ['Gastronomic meal of the French', 'French gastronomic meal']
      ]
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A formally inscribed food or drink tradition with a distinct regional identity.',
      names: [
        ['Breakfast culture in Malaysia: dining experience in a multi-ethnic society', 'Breakfast culture in Malaysia', 'Malaysian breakfast culture'],
        ['Asturian cider culture', 'Asturian cider'],
        ['Reog Ponorogo performing art', 'Reog Ponorogo']
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'An inscribed craft, ritual, or performance tradition with a specific official title.',
      names: [
        ['Art of dry stone construction, knowledge and techniques', 'Art of dry stone construction', 'Dry stone construction'],
        ['Art of crafting and playing rubab/rabab', 'Art of crafting and playing the rubab', 'Rubab', 'Rabab'],
        ['Betashar, traditional wedding ritual', 'Betashar'],
        ['Ceremony of Mehregan', 'Mehregan']
      ]
    },
    {
      score: 85, tier: 'DEEP CUT',
      note: 'A less widely known element formally inscribed on a UNESCO intangible-heritage list.',
      names: [
        ['Craftsmanship of traditional woven textile Kente', 'Kente weaving', 'Traditional Kente weaving'],
        ['Tomyum Kung', 'Tom Yum Kung', 'Tom Yum Goong'],
        ['Wosana ritual and associated practices', 'Wosana ritual'],
        ['Cooking and eating Mulgi puder, traditional mashed potato with barley in the Mulgimaa region', 'Mulgi puder'],
        ['Craftsmanship of Aleppo Ghar soap', 'Aleppo Ghar soap']
      ]
    }
  ),

  'biosphere-reserve': records(
    {
      score: 10, tier: 'BACKGROUND',
      note: 'A recognizable US landscape that is also part of UNESCO’s biosphere-reserve network.',
      names: [
        ['Denali', 'Denali Biosphere Reserve'],
        'Everglades & Dry Tortugas'
      ]
    },
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A well-known US protected landscape with UNESCO biosphere-reserve designation.',
      names: [
        ['Big Bend', 'Big Bend Biosphere Reserve'],
        ['Olympic', 'Olympic Biosphere Reserve'],
        'Sequoia-Kings Canyon',
        ['Channel Islands', 'Channel Islands Biosphere Reserve']
      ]
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A less widely named US member of UNESCO’s biosphere-reserve network.',
      names: [
        ['Isle Royale', 'Isle Royale Biosphere Reserve'],
        ['Mammoth Cave Area', 'Mammoth Cave Biosphere Reserve'],
        ['Big Thicket', 'Big Thicket Biosphere Reserve'],
        ['Cascade Head', 'Cascade Head Biosphere Reserve'],
        ['Congaree', 'Congaree Biosphere Reserve']
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'A formally designated regional biosphere reserve that is less familiar outside its area.',
      names: [
        ['Crown of the Continent', 'Crown of the Continent Biosphere Reserve'],
        'Mojave and Colorado Deserts',
        ['New Jersey Pinelands', 'New Jersey Pinelands Biosphere Reserve'],
        ['Rocky Mountains', 'Rocky Mountains Biosphere Reserve'],
        ['Hawaiian Islands', 'Hawaiian Islands Biosphere Reserve']
      ]
    }
  ),

  'unesco-creative-city': records(
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A widely recognizable city that is officially part of UNESCO’s Creative Cities Network.',
      names: [
        ['Barcelona', 'Barcelona UNESCO Creative City'],
        ['Austin', 'Austin UNESCO Creative City'],
        ['Seattle', 'Seattle UNESCO Creative City']
      ]
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A member city recognized by UNESCO for a specific creative field.',
      names: [
        ['Bristol', 'Bristol UNESCO Creative City'],
        ['Dundee', 'Dundee UNESCO Creative City'],
        ['Iowa City', 'Iowa City UNESCO Creative City']
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'A recognized member of the international Creative Cities Network.',
      names: [
        'Reykjavik'
      ]
    }
  ),

  'lunar-crater': records(
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A prominent named lunar plain or mare visible in standard maps of the Moon.',
      names: [
        ['Mare Imbrium', 'Sea of Showers'],
        ['Mare Humorum', 'Sea of Moisture'],
        ['Mare Nubium', 'Sea of Clouds'],
        ['Mare Frigoris', 'Sea of Cold']
      ]
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A named lunar mare or sea that is less familiar to casual observers.',
      names: [
        ['Mare Vaporum', 'Sea of Vapors'],
        ['Mare Australe', 'Southern Sea'],
        ['Mare Orientale', 'Eastern Sea'],
        ['Mare Ingenii', 'Sea of Cleverness'],
        ['Mare Insularum', 'Sea of Islands']
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'An officially named lunar mare with a distinctive geographic name.',
      names: [
        ['Mare Marginis', 'Sea of the Edge'],
        ['Mare Moscoviense', 'Sea of Muscovy'],
        ['Mare Smythii', 'Smyth’s Sea'],
        ['Mare Undarum', 'Sea of Waves'],
        ['Mare Spumans', 'Sea of Foam']
      ]
    },
    {
      score: 85, tier: 'DEEP CUT',
      note: 'A less commonly named lunar surface feature.',
      names: [
        ['Mare Cognitum', 'Sea That Has Become Known']
      ]
    }
  ),

  'wine-grape-variety': records(
    {
      score: 10, tier: 'BACKGROUND',
      note: 'A familiar international grape cultivar used to make wine.',
      names: ['Malbec']
    },
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A widely grown wine-grape variety with broad international recognition.',
      names: ['Cabernet Franc', 'Gamay']
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A recognized wine grape with substantial regional or international use.',
      names: [
        'Pinot Blanc',
        'Pinotage',
        ['Palomino Fino', 'Palomino'],
        'Montepulciano'
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'A distinct wine cultivar more strongly associated with particular regions or styles.',
      names: ['Muscadelle', 'Petit Manseng', 'Torrontés']
    },
    {
      score: 85, tier: 'DEEP CUT',
      note: 'A less commonly encountered, but recognized, wine-grape cultivar.',
      names: ["Nero d'Avola", 'Verdelho', 'Baga', 'Mencía', 'Savagnin']
    }
  ),

  'protected-eu-cheese': records(
    {
      score: 15, tier: 'FAMILIAR',
      note: 'A recognizable cheese whose name has EU geographical-indication protection.',
      names: [
        'Brie de Meaux',
        'Camembert de Normandie',
        ['Reblochon', 'Reblochon de Savoie'],
        ['Munster', 'Munster-Géromé']
      ]
    },
    {
      score: 30, tier: 'UNCOMMON',
      note: 'A registered regional cheese with PDO or PGI protection.',
      names: [
        ['Maroilles', 'Marolles'],
        'Saint-Nectaire',
        'Abondance',
        'Pont-l’Évêque',
        'Neufchâtel',
        'Brillat-Savarin'
      ]
    },
    {
      score: 60, tier: 'RARE',
      note: 'A less familiar cheese on the EU geographical-indications register.',
      names: [
        'Brie de Melun',
        'Chaource',
        'Valençay',
        'Salers',
        ['Cantal', 'Fourme de Cantal'],
        'Laguiole',
        'Banon',
        'Tomme des Pyrénées'
      ]
    },
    {
      score: 85, tier: 'DEEP CUT',
      note: 'A specialist regional cheese with EU protection.',
      names: [
        'Pouligny-Saint-Pierre',
        'Tomme des Bauges',
        'Sainte-Maure de Touraine',
        ['Crottin de Chavignol', 'Chavignol'],
        'Fourme d’Ambert'
      ]
    }
  )
};
