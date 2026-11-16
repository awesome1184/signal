import type { AnswerRecord } from '../answerBank.js';

/**
 * Third answer expansion for SIGNAL.
 *
 * Reference catalogs and verification starting points:
 * - Smithsonian Global Volcanism Program, Holocene Volcano List:
 *   https://volcano.si.edu/volcanolist_holocene.cfm
 * - NASA/JPL, Planetary Satellite Discovery Circumstances (IAU-recognized names):
 *   https://ssd.jpl.nasa.gov/sats/discovery.html
 * - UNESCO World Heritage List:
 *   https://whc.unesco.org/en/list/
 * - Official National Pokédex:
 *   https://www.pokemon.com/pokedex/
 * - American Kennel Club, breeds by year recognized (205 breeds; updated 2026):
 *   https://www.akc.org/press-center/articles-resources/facts-and-stats/breeds-year-recognized/
 * - Nobel Prize in Physics, all laureates:
 *   https://www.nobelprize.org/prizes/lists/all-nobel-prizes-in-physics/all/
 * - Paleobiology Database:
 *   https://paleobiodb.org/
 * - BoardGameGeek board-game catalogue:
 *   https://boardgamegeek.com/browse/boardgame
 * - NASA and JPL astronomy / planetary mission resources:
 *   https://science.nasa.gov/solar-system/
 *   https://ssd.jpl.nasa.gov/
 * - UNESCO Intangible Cultural Heritage lists:
 *   https://ich.unesco.org/en/lists
 * - Vitis International Variety Catalogue:
 *   https://www.vivc.de/
 * - EU eAmbrosia geographical indications register:
 *   https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/
 * - Roller Coaster DataBase:
 *   https://rcdb.com/census.htm
 * - The Reptile Database:
 *   https://www.reptile-database.org/
 *
 * Canonical answer names appear first. Alternate names belong in the same
 * alias array. Scores are estimated familiarity, not measured survey rates.
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

export const ANSWER_SUBMISSIONS_THIRD_EXPANSION: Record<string, AnswerRecord[]> = {
  'night-bird': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable owl or night-active bird species.', names: [
      'Snowy owl', 'Barred owl', 'Little owl'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named nocturnal bird that casual players may not immediately recall.', names: [
      'Black-crowned night heron', 'Yellow-crowned night heron', 'Chuck-wills-widow'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named night bird with a distinctive range or behavior.', names: [
      'Common pauraque', 'Papuan frogmouth', 'Whip-poor-will'
    ]}
  ),

  'blue-mineral': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable mineral variety that occurs naturally in blue or blue-green colors.', names: [
      'Amazonite', 'Blue spinel'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A blue mineral that is better known to collectors than to casual players.', names: [
      'Smithsonite', 'Hemimorphite', 'Shattuckite'
    ]},
    { score: 60, tier: 'RARE', note: 'A less common naturally blue mineral species.', names: [
      'Pentagonite', 'Plancheite', 'Ajoite'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist mineral name associated with blue crystals or specimens.', names: [
      'Kinoite', 'Papagoite'
    ]}
  ),

  'echo-place': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar enclosed place with hard surfaces that reflect sound.', names: [
      'Empty gymnasium', 'Subway station', 'Church nave'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A larger or more enclosed place that can produce a noticeable echo.', names: [
      'Stone vault', 'Water tower', 'Dome'
    ]},
    { score: 60, tier: 'RARE', note: 'A less expected location with reflective surfaces and a distinctive acoustic response.', names: [
      'Ice cave', 'Underground chamber'
    ]}
  ),

  'string-instrument': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable string instrument found in many musical traditions.', names: [
      'Lute', 'Zither', 'Lyre'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A traditional or less commonly named plucked or bowed string instrument.', names: [
      'Autoharp', 'Charango', 'Kantele', 'Kora'
    ]},
    { score: 60, tier: 'RARE', note: 'A regional or historical string instrument that is less familiar to casual players.', names: [
      'Cittern', 'Theorbo', 'Rebec', 'Gusli'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized string instrument with a distinctive construction or tradition.', names: [
      'Guqin', 'Bandura'
    ]}
  ),

  'radio-receiver': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common radio device or receiver used in daily life.', names: [
      'Portable radio', 'Satellite radio receiver', 'Marine VHF radio'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct receiver type designed for a particular frequency range or use.', names: [
      'Ham radio transceiver', 'Weather radio', 'Aircraft radio receiver'
    ]},
    { score: 60, tier: 'RARE', note: 'A specialized receiver architecture or radio reception device.', names: [
      'Direct-conversion receiver', 'Superregenerative receiver', 'RTL-SDR receiver'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist receiver or early radio detector.', names: [
      'Coherer detector'
    ]}
  ),

  'night-wait': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable place where people may wait late at night.', names: [
      'Gas station', 'Laundromat', 'Pharmacy'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A late-opening service location or transport facility.', names: [
      'Subway platform', 'Toll plaza', 'Emergency shelter'
    ]},
    { score: 60, tier: 'RARE', note: 'A specific place associated with overnight travel or essential services.', names: [
      'Airport baggage claim', 'Hospital lobby'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named late-night waiting location.', names: [
      'Border inspection queue'
    ]}
  ),

  'natural-glow': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable organism or natural phenomenon that produces visible light.', names: [
      'Jack-o-lantern mushroom', 'St. Elmo’s fire'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A documented light-producing organism or natural event.', names: [
      'Honey fungus', 'Railroad worm', 'Ostracod'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named example of bioluminescence or natural light emission.', names: [
      'Crystal jellyfish', 'Lanternfish'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized bioluminescent organism or natural phenomenon.', names: [
      'Cookiecutter shark', 'Tomopteris'
    ]}
  ),

  'faint-sound': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common word for a light or quiet sound.', names: [
      'Tinkle', 'Mutter', 'Pitter-patter'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A descriptive sound word that is less likely to be the first answer.', names: [
      'Coo', 'Lilt', 'Gurgle'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly used word for a soft, delicate, or rustling noise.', names: [
      'Crepitation', 'Purl'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'An uncommon literary or technical sound word.', names: [
      'Murmuration', 'Croon'
    ]}
  ),

  'distant-view': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar optical instrument or viewing device for distant subjects.', names: [
      'Astronomical telescope'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specialized optical instrument for viewing distant objects.', names: [
      'Refracting telescope', 'Reflecting telescope', 'Terrestrial telescope'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named viewing instrument or optical scope.', names: [
      'Transit instrument'
    ]}
  ),

  'many-sides': records(
    { score: 30, tier: 'UNCOMMON', note: 'A named polygon with more sides than the common decagon or dodecagon.', names: [
      'Triskaidecagon', 'Tetracontagon'
    ]},
    { score: 60, tier: 'RARE', note: 'A high-sided polygon with a specific mathematical name.', names: [
      'Pentacontagon', 'Hexacontagon', 'Heptacontagon'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist polygon name for a shape with many sides.', names: [
      'Octacontagon', 'Enneacontagon', 'Myriagon'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An extremely high-sided or infinite-sided polygon name.', names: [
      'Apeirogon'
    ]}
  ),

  'lighthouse-place': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar coastal feature where a lighthouse can be located.', names: [
      'Bay', 'Peninsula', 'Strait'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A coastal feature associated with navigation hazards or a lighthouse site.', names: [
      'Estuary', 'Inlet', 'Sandbar'
    ]},
    { score: 60, tier: 'RARE', note: 'A named lighthouse or landmark with a documented light station.', names: [
      'Point Reyes Lighthouse', 'Heceta Head Lighthouse', 'Split Rock Lighthouse'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A historic or regionally distinctive lighthouse.', names: [
      'Montauk Point Lighthouse', 'Cape Leeuwin Lighthouse'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A historically significant lighthouse less likely to be recalled by casual players.', names: [
      'Lighthouse of Alexandria'
    ]}
  ),

  'rotating-blades': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common household or workshop machine with a rotating cutting or mixing mechanism.', names: [
      'Electric mixer', 'Circular saw', 'Hair dryer'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A machine whose main function uses a rotating assembly.', names: [
      'Table saw', 'Rotary engine', 'Disk sander'
    ]},
    { score: 60, tier: 'RARE', note: 'A specialized machine with a rotor, impeller, or rotating cutting assembly.', names: [
      'Centrifugal blower', 'Rotary lawn edger'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A technical machine whose operation depends on a rotating assembly.', names: [
      'Impeller pump'
    ]}
  ),

  'signal-distortion': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable signal-quality problem or radio-wave behavior.', names: [
      'Radio noise', 'Signal reflection', 'Signal refraction'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific radio propagation or interference mechanism.', names: [
      'Tropospheric scatter', 'Ionospheric absorption', 'Diffraction'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named effect that can alter radio reception.', names: [
      'Solar flare radio blackout', 'Phase noise'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist radio-frequency propagation phenomenon.', names: [
      'Faraday rotation'
    ]}
  ),

  'meteorite-feature': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognized mineral, metal, or material that can occur in meteorites.', names: [
      'Graphite', 'Chromite'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A meteorite mineral or phase beyond the most familiar iron and nickel.', names: [
      'Merrillite', 'Oldhamite', 'Diamond'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named mineral or structure recorded in meteorite samples.', names: [
      'Taenite grain', 'Pallasite structure'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist mineral or inclusion associated with meteorite classification.', names: [
      'Chondrule rim', 'Calcium phosphate'
    ]}
  ),

  'shelled-animal': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar animal with a shell or hard external covering that is part of its body.', names: [
      'Tortoise', 'Horseshoe crab', 'Barnacle'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable shelled or armored animal from a less familiar group.', names: [
      'Brachiopod', 'Scaphopod', 'Keyhole limpet'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named shelled mollusk or shell-bearing animal.', names: [
      'Piddock', 'Wentletrap'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level shelled invertebrate.', names: [
      'Chambered tusk shell'
    ]}
  ),

  'old-machine': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable sound word often associated with aging machinery.', names: [
      'Groan', 'Chug', 'Clunk'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A mechanical sound that is more specific than a general hum or rattle.', names: [
      'Whine', 'Screech', 'Thrum'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly selected sound made by worn or moving mechanisms.', names: [
      'Grating', 'Banging'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized mechanical sound word.', names: [
      'Chink'
    ]}
  ),

  'navigation-tool': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar navigation instrument or tool used to determine position or direction.', names: [
      'Altimeter', 'Magnetic compass', 'Map compass'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A traditional navigation aid or instrument used in surveying or travel.', names: [
      'Cross-staff', 'Backstaff', 'Lead line'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named instrument or plotting tool used in navigation.', names: [
      'Parallel ruler', 'Nautical chartplotter'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A historical or specialized navigation instrument.', names: [
      'Kamals'
    ]}
  ),

  'lens-object': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common everyday optical device or component that uses lenses.', names: [
      'Webcam', 'Smartphone camera', 'Camera lens'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An optical viewing or projection device that uses a lens.', names: [
      'Slide projector', 'Document camera', 'Eyepiece'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named optical device or lens-containing component.', names: [
      'View camera', 'Sighting scope'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist optical instrument with functional lens elements.', names: [
      'Schmidt camera'
    ]}
  ),

  'ring-forming': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar natural or astronomical structure with a ring shape.', names: [
      'Annular solar eclipse', 'Rainbow circle'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized ring-shaped object or phenomenon in nature or astronomy.', names: [
      'Accretion disk', 'Protoplanetary disk', 'Debris disk'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named ring structure in astronomy or natural science.', names: [
      'Ring current', 'Circumstellar disk'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist ring-shaped astronomical structure.', names: [
      'Accretion ring'
    ]}
  ),

  'weather-event': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common weather event or recognizable atmospheric phenomenon.', names: [
      'Blizzard', 'Dust devil', 'Freezing rain'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific weather event or unusual atmospheric condition.', names: [
      'Haboob', 'Lake-effect snow', 'Heat burst'
    ]},
    { score: 60, tier: 'RARE', note: 'A less common atmospheric or weather phenomenon.', names: [
      'Frost quake', 'Frost flower', 'Snow roller'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist meteorological phenomenon.', names: [
      'Föhn wind'
    ]}
  ),

  'solar-system-moon': records(
    { score: 30, tier: 'UNCOMMON', note: 'An officially named moon that is less familiar than the major planetary satellites.', names: [
      'Dia', 'Eirene', 'Philophrosyne', 'Eupheme', 'Valetudo'
    ]},
    { score: 60, tier: 'RARE', note: 'A named irregular moon confirmed in the IAU/JPL planetary satellite catalog.', names: [
      'Ersa', 'Kore', 'Herse', 'Aegir', 'Tarqeq'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly recalled officially named Saturnian moon.', names: [
      'Hyrrokkin', 'Skoll', 'Surtur', 'Jarnsaxa', 'Greip',
      'Gridr', 'Angrboda', 'Skrymir',
      'Gerd', 'Eggther', 'Beli', 'Gunnlod', 'Thiazzi',
      'Alvaldi', 'Geirrod'
    ]}
  ),

  'holocene-volcano': records(
    { score: 15, tier: 'FAMILIAR', note: 'A documented Holocene volcano with a well-known name.', names: [
      'Mount Adams', 'Mount Baker', 'Colima', 'Great Sitkin'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named volcanic feature in the Smithsonian Holocene catalog.', names: [
      'Babuyan Claro', 'Copahue', 'Coropuna', 'Azufral', 'Cumbal',
      'Gorely', 'Glacier Peak', 'Kaba'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named volcano or volcanic field listed by the Smithsonian.', names: [
      'Axial Seamount', 'Bishoftu Volcanic Field', 'Bilate River Field',
      'Balhaf-Bir Ali Volcanic Field', 'Kamaehuakanaloa', 'Milos',
      'Michoacan-Guanajuato Volcanic Field', 'Nemrut Dagi'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level named volcanic feature in the official Holocene list.', names: [
      'Adams Seamount', 'Bachelor', 'Balbi', 'Beru',
      'Billy Mitchell', 'Corbetti', 'Curacoa', 'Davis Lake'
    ]}
  ),

  'unesco-world-heritage': records(
    { score: 15, tier: 'FAMILIAR', note: 'A well-known property currently inscribed on UNESCO’s World Heritage List.', names: [
      'Sydney Opera House', 'Uluru-Kata Tjuta National Park',
      'Everglades National Park', 'Tower of London'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized World Heritage property that is less likely to be an immediate guess.', names: [
      'Mesa Verde National Park', 'Mammoth Cave National Park',
      'Redwood National and State Parks', 'Old Town of Galle and its Fortifications',
      'Giant’s Causeway and Causeway Coast', 'Jodrell Bank Observatory',
      'Durham Castle and Cathedral', 'The English Lake District'
    ]},
    { score: 60, tier: 'RARE', note: 'A named cultural or natural property on the current UNESCO list.', names: [
      'The Flow Country', 'K’gari', 'Budj Bim Cultural Landscape',
      'Murujuga Cultural Landscape', 'Shark Bay, Western Australia',
      'Los Alerces National Park', 'Tipasa', 'Al Qal’a of Beni Hammad'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named inscribed World Heritage property.', names: [
      'Willandra Lakes Region',
      'Ancient and Primeval Beech Forests of the Carpathians and Other Regions of Europe'
    ]}
  ),

  'pokemon-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar original-generation Pokémon species.', names: [
      'Butterfree', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata',
      'Raticate', 'Raichu', 'Sandshrew', 'Sandslash', 'Clefairy',
      'Clefable', 'Zubat', 'Golbat', 'Oddish', 'Gloom',
      'Vileplume', 'Diglett', 'Dugtrio', 'Growlithe', 'Poliwag',
      'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke',
      'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable Pokémon from the early National Pokédex.', names: [
      'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Beedrill',
      'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Persian',
      'Golduck', 'Mankey', 'Primeape', 'Ponyta', 'Rapidash',
      'Slowpoke', 'Slowbro', 'Magneton', 'Doduo', 'Dodrio'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named National Pokédex species that is familiar to longtime fans.', names: [
      'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder',
      'Cloyster', 'Drowzee', 'Hypno', 'Krabby', 'Kingler',
      'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone',
      'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing',
      'Weezing', 'Rhyhorn', 'Rhydon', 'Tangela', 'Kangaskhan'
    ]},
    { score: 60, tier: 'RARE', note: 'A legitimate Pokémon species that is less often named by casual players.', names: [
      'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu',
      'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz',
      'Magmar', 'Pinsir', 'Tauros', 'Porygon2', 'Octillery',
      'Miltank', 'Sableye', 'Mawile', 'Bidoof'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more obscure but official National Pokédex species.', names: [
      'Torkoal', 'Claydol', 'Shuckle', 'Tinkaton',
      'Porygon-Z', 'Dusknoir'
    ]}
  )

  'akc-dog-breed': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar AKC-recognized breed that was missing from the current pool.', names: [
      'Irish Setter', 'Pomeranian', 'Whippet', 'Papillon',
      'Italian Greyhound', 'Old English Sheepdog', 'Scottish Deerhound'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized breed with a clear entry in the American Kennel Club register.', names: [
      'Pointer', 'Cocker Spaniel', 'English Setter', 'Irish Water Spaniel',
      'Sussex Spaniel', 'Smooth Fox Terrier', 'Wire Fox Terrier', 'Scottish Terrier',
      'Bull Terrier', 'Mastiff', 'Harrier', 'Irish Terrier',
      'English Springer Spaniel', 'German Shorthaired Pointer',
      'Flat-Coated Retriever', 'Chesapeake Bay Retriever'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named AKC-recognized breed.', names: [
      'Irish Wolfhound', 'Saluki', 'Afghan Hound', 'Brittany',
      'Lakeland Terrier', 'Welsh Corgi (Cardigan)', 'Lhasa Apso',
      'Norwegian Elkhound', 'Rhodesian Ridgeback',
      'Black and Tan Coonhound', 'Belgian Malinois',
      'Belgian Sheepdog', 'Australian Cattle Dog'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist or less frequently encountered AKC-recognized breed.', names: [
      'Schipperke', 'Pekingese', 'West Highland White Terrier',
      'Welsh Terrier', 'Field Spaniel', 'Curly-Coated Retriever',
      'Miniature Pinscher', 'Giant Schnauzer', 'Border Terrier',
      'Bouvier des Flandres', 'Wirehaired Pointing Griffon'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A newly recognized or comparatively uncommon AKC breed.', names: [
      'Basset Fauve de Bretagne', 'Russian Tsvetnaya Bolonka',
      'Teddy Roosevelt Terrier'
    ]}
  )

  'nobel-physics-laureate': records(
    { score: 15, tier: 'FAMILIAR', note: 'A Nobel Prize in Physics laureate with a well-known contribution to modern science.', names: [
      'Geoffrey Hinton', 'John J. Hopfield', 'Arthur B. McDonald',
      'Takaaki Kajita', 'Rainer Weiss'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A documented Nobel Physics laureate whose name is familiar to many science students.', names: [
      'John Clarke', 'Michel H. Devoret', 'John M. Martinis',
      'Klaus von Klitzing', 'Gerardus ’t Hooft', 'Martin Perl',
      'Riccardo Giacconi', 'Theodor Hänsch'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named individual who received the Nobel Prize in Physics.', names: [
      'Claude Cohen-Tannoudji', 'William D. Phillips',
      'Serge Haroche', 'David Wineland',
      'François Englert', 'Peter Grünberg'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level Nobel Physics laureate from an earlier award year.', names: [
      'Nikolay Basov', 'Alexander Prokhorov',
      'Pavel Cherenkov', 'Ilja Frank', 'Igor Tamm'
    ]}
  )

  'dinosaur-genus': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable non-avian dinosaur genus that is distinct from those already in the pool.', names: [
      'Rinchenia'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized dinosaur genus that is less likely to be an immediate answer.', names: [
      'Fukuiraptor', 'Balaur'
    ]},
    { score: 60, tier: 'RARE', note: 'A documented but less commonly named non-avian dinosaur genus.', names: [
      'Mononykus', 'Othnielia', 'Hypsilophodon',
      'Rugops', 'Erlikosaurus'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level dinosaur genus from the fossil record.', names: [
      'Kulindadromeus', 'Miragaia', 'Sauropelta',
      'Edmontonia', 'Prenocephale', 'Thescelosaurus'
    ]}
  )

  'board-game': records(
    { score: 15, tier: 'FAMILIAR', note: 'A popular modern board game that many casual tabletop players recognize.', names: [
      'Splendor', 'Hive', 'Everdell',
      'Codenames', 'Kingdomino'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable hobby board game beyond the best-known family titles.', names: [
      'Scythe', 'Cascadia', 'Viticulture', 'Istanbul',
      'Photosynthesis', 'Calico', 'The Quest for El Dorado',
      'Century: Spice Road', 'Mysterium'
    ]},
    { score: 60, tier: 'RARE', note: 'A well-established strategy or thematic board game less familiar to casual players.', names: [
      'Tzolk’in: The Mayan Calendar', 'Lost Ruins of Arnak',
      'Dune: Imperium', 'Clank!', 'Cyclades',
      'Kemet', 'Blood Rage', 'Ark Nova', 'Deception: Murder in Hong Kong'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist board game with a dedicated tabletop audience.', names: [
      'The Search for Planet X', 'Kanban EV', 'On Mars',
      'Lisboa', 'The Gallerist', 'Pax Pamir',
      'John Company', 'Food Chain Magnate'
    ]}
  ),

  'woodwind-instrument': records(
    { score: 30, tier: 'UNCOMMON', note: 'A recognized regional or orchestral woodwind instrument.', names: [
      'Fujara', 'Kèn bầu', 'Contrabass flute'
    ]},
    { score: 60, tier: 'RARE', note: 'A less familiar reed or flute-family woodwind instrument.', names: [
      'Sopranino flute', 'Bass recorder', 'Bawu'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist woodwind instrument from a distinct musical tradition.', names: [
      'Arghul', 'Launeddas', 'Alboka'
    ]}
  ),

  'international-river': records(
    { score: 15, tier: 'FAMILIAR', note: 'A major river that is known to cross national boundaries.', names: [
      'Jordan River', 'Dnieper', 'Volta'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized transboundary river with a multi-country course or border role.', names: [
      'Kagera River', 'Drava', 'Tisza', 'Siret',
      'Ruvuma River', 'Komati River'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named international river.', names: [
      'Mara River', 'Save River', 'Juba River',
      'Okavango River', 'Chari River'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less familiar river basin shared by multiple countries.', names: [
      'Gambia River', 'Cunene River', 'Neretva'
    ]}
  ),

  'ich-heritage-element': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognized performance or cultural practice inscribed by UNESCO.', names: [
      'Gagaku', 'Tibetan opera'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named cultural practice on a UNESCO intangible heritage list.', names: [
      'Kankurang', 'Jultagi', 'Saman dance', 'Tbourida'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level element documented on UNESCO’s lists.', names: [
      'Traditional art of Azerbaijani tar and its craftsmanship'
    ]}
  ),
  'protected-eu-cheese': records(
    { score: 15, tier: 'FAMILIAR', note: 'A well-known cheese with a registered EU geographical indication.', names: [
      'Stilton', 'Gouda Holland', 'Danbo'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized regional cheese protected under an EU PDO or PGI registration.', names: [
      'Edam Holland', 'Queso de Mahón-Menorca'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named EU-protected cheese.', names: [
      'Queso de Murcia al Vino'
    ]}
  ),
  'roller-coaster': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable roller coaster with its own RCDB record.', names: [
      'Leviathan', 'Behemoth', 'Yukon Striker',
      'Diamondback', 'Maverick'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A major amusement-park coaster with a distinct ride record.', names: [
      'Orion', 'Pantherian', 'Top Thrill Dragster',
      'Expedition Everest', 'Nemesis Inferno',
      'Goliath (Six Flags Great America)'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named steel or wooden coaster in RCDB.', names: [
      'Tatsu', 'Raptor (Cedar Point)', 'Manta (SeaWorld Orlando)',
      'Mystery Mine', 'Flying Aces', 'Gold Striker'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less familiar coaster with a distinct RCDB ride listing.', names: [
      'Kärnan', 'Joris en de Draak',
      'T Express', 'Riddler’s Revenge'
    ]}
  )

  'video-game-company': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable video-game developer or publisher with released games.', names: [
      'Saber Interactive', 'Behaviour Interactive', '10 Chambers',
      'Telltale Games'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An established developer or publisher with a distinct game catalogue.', names: [
      'Focus Entertainment', 'THQ Nordic', 'Team17',
      'Klei Entertainment', 'Frictional Games'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named studio that develops or publishes commercial games.', names: [
      'Motion Twin', 'Studio MDHR', 'Coffee Stain Studios',
      'Double Fine Productions'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A smaller or more specialized studio with a released game.', names: [
      'Wube Software', 'Introversion Software',
      'Red Hook Studios', 'Mobius Digital'
    ]}
  ),

  'programming-language': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognized programming language with use in education or software development.', names: [
      'BASIC', 'Scratch', 'Clojure'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A legitimate programming language used in a particular ecosystem or domain.', names: [
      'CoffeeScript', 'Crystal', 'Nim', 'Zig',
      'Forth', 'APL', 'J'
    ]},
    { score: 60, tier: 'RARE', note: 'A recognized programming language with a more specialized or historical user base.', names: [
      'Tcl', 'Awk', 'Racket', 'Common Lisp',
      'Pure Data', 'Elm'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less familiar but documented programming language.', names: [
      'Idris', 'ATS', 'Befunge', 'Unlambda'
    ]}
  ),

  'time-travel-film': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable feature film in which time travel is central to the story.', names: [
      'Time After Time', 'The Time Traveler’s Wife', 'Déjà Vu'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A released film built around time travel or a time-loop mechanism.', names: [
      'The Philadelphia Experiment', 'A Sound of Thunder',
      'When We First Met', 'See You Yesterday'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named time-travel film with a central time-travel plot.', names: [
      'Frequently Asked Questions About Time Travel',
      'Time Trap', 'The House at the End of Time'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist or international time-travel feature film.', names: [
      'The Call (2020)', 'The Door (2009)'
    ]}
  )
};
