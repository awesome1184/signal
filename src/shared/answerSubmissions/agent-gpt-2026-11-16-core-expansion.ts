import type { AnswerRecord } from '../answerBank.js';

/**
 * Additional research expansion for the original 21 SIGNAL questions.
 *
 * Reference starting points for checking examples:
 * - Cornell Lab of Ornithology, Common Poorwill and nightjar references:
 *   https://www.allaboutbirds.org/guide/Common_Poorwill/overview
 * - Mindat mineral database, including blue kyanite and lazulite:
 *   https://www.mindat.org/min-2303.html
 *   https://www.mindat.org/min-2356.html
 * - NOAA Ocean Exploration, bioluminescence:
 *   https://oceanexplorer.noaa.gov/ocean-fact/bioluminescence/
 * - Smithsonian Ocean, bioluminescent organisms:
 *   https://ocean.si.edu/ocean-life/fish/bioluminescence
 * - NASA meteorite materials reference:
 *   https://ares.jsc.nasa.gov/engagement/activities/resources/exploring-meteorite-mysteries/teachers-guide.pdf
 * - NOAA National Weather Service glossary:
 *   https://forecast.weather.gov/glossary.php
 * - ARRL radio-propagation reference:
 *   https://www.arrl.org/propagation
 *
 * These are supplemental canonical answers only. Existing question IDs and
 * existing records remain unchanged. Aliases are grouped under one canonical
 * answer and are not intended to create extra archive entries.
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

export const ANSWER_SUBMISSIONS_CORE_EXPANSION: Record<string, AnswerRecord[]> = {
  'night-bird': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable nocturnal bird species beyond the broad answer “owl”.', names: [
      'Great horned owl', 'Eastern screech-owl', 'Tawny owl'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A nocturnal bird species with a distinctive habitat or behavior.', names: [
      'Northern saw-whet owl', 'Common nighthawk', 'Eurasian eagle-owl'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named nocturnal bird species.', names: [
      'Common poorwill', 'Australian owlet-nightjar', 'Night parrot'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level nocturnal bird with a restricted range or unusual biology.', names: [
      ['Kakapo', 'Strigops habroptilus'],
      ['Short-eared owl', 'Asio flammeus']
    ]}
  ),

  'blue-mineral': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognized mineral that commonly occurs in blue varieties.', names: [
      ['Kyanite', 'Cyanite'], 'Blue fluorite', 'Blue apatite'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A naturally blue mineral that is less likely to be an immediate guess.', names: [
      'Lazulite', 'Celestine', 'Iolite'
    ]},
    { score: 60, tier: 'RARE', note: 'A distinctive blue mineral known mainly to mineral collectors.', names: [
      'Dumortierite', 'Indicolite', 'Hauyne'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A comparatively uncommon blue mineral species.', names: [
      'Benitoite', 'Cavansite', 'Jeremejevite'
    ]}
  ),

  'echo-place': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common enclosed or hard-surfaced place where echoes can be heard.', names: [
      'Stairwell', 'Church', 'Parking garage'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A larger or more enclosed space that can return a distinct echo.', names: [
      'Empty swimming pool', 'Cathedral', 'Underpass'
    ]},
    { score: 60, tier: 'RARE', note: 'A less expected space where hard boundaries can reflect sound.', names: [
      'Water well', 'Large warehouse', 'Stone quarry'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A distinctive acoustic setting with a strong reflected sound.', names: [
      'Amphitheatre', 'Glacier crevasse'
    ]}
  ),

  'string-instrument': records(
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized string instrument.', names: [
      'Ukulele', 'Viola', 'Double bass', 'Mandolin'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized string instrument from a different musical tradition or playing style.', names: [
      'Piano', 'Sitar', 'Koto', 'Shamisen'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named traditional string instrument.', names: [
      'Guzheng', 'Pipa', 'Oud', 'Sarod'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized regional or historical string instrument.', names: [
      'Balalaika', 'Bouzouki', 'Hammered dulcimer', 'Vielle'
    ]}
  ),

  'winter-constellation': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable constellation prominent in the Northern Hemisphere winter sky.', names: [
      'Canis Major', 'Canis Minor'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A winter constellation beyond the most familiar patterns.', names: [
      'Perseus', 'Eridanus', 'Columba'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named constellation that can be observed during Northern Hemisphere winter.', names: [
      'Cetus', 'Aries'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A comparatively faint or less familiar winter constellation.', names: [
      'Fornax', 'Camelopardalis'
    ]}
  ),

  'radio-receiver': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar receiver or two-way radio device.', names: [
      'Transistor radio', 'Walkie-talkie', 'CB radio'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A radio receiver used for a particular band or purpose.', names: [
      'Shortwave receiver', 'AM tuner', 'FM tuner'
    ]},
    { score: 60, tier: 'RARE', note: 'A less common receiver circuit or radio-reception technology.', names: [
      'Regenerative receiver', 'Superheterodyne receiver', 'Crystal detector'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized receiver or detector used in radio engineering.', names: [
      'Galena detector', 'Radio direction-finding receiver'
    ]}
  ),

  'night-wait': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar public place where people may wait overnight.', names: [
      'Hotel lobby', 'Hospital waiting room', 'Taxi stand'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific travel or service location that may operate late at night.', names: [
      'Truck stop', 'Bus terminal', 'Train platform'
    ]},
    { score: 60, tier: 'RARE', note: 'A less obvious public place where someone may have to wait late at night.', names: [
      'Emergency room', '24-hour convenience store', 'Rest area'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized overnight waiting place.', names: [
      'Ferry waiting room', 'Border crossing station'
    ]}
  ),

  'natural-glow': records(
    { score: 15, tier: 'FAMILIAR', note: 'A natural light-producing phenomenon or organism familiar to many people.', names: [
      'Aurora', 'Lightning'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A documented bioluminescent animal or organism.', names: [
      'Anglerfish', 'Firefly squid', 'Comb jelly'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named organism that produces its own light.', names: [
      'Vampire squid', 'Sea firefly', 'Bioluminescent bacteria'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level example of natural bioluminescence.', names: [
      'Bobtail squid', 'Dinoflagellate'
    ]}
  ),

  'faint-sound': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar word for a quiet or soft sound.', names: [
      'Sigh', 'Hiss', 'Patter'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A sound word that can describe a light or delicate noise.', names: [
      'Swish', 'Flutter', 'Fizz'
    ]},
    { score: 60, tier: 'RARE', note: 'A less common word for a soft sound or quiet movement.', names: [
      'Trickle', 'Whimper'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized sound word that is less commonly used.', names: [
      'Snuffle', 'Sibilance'
    ]}
  ),

  'distant-view': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar optical instrument for viewing distant subjects.', names: [
      'Monocular', 'Spotting scope'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specialized viewing or range-finding instrument.', names: [
      'Periscope', 'Rangefinder'
    ]},
    { score: 60, tier: 'RARE', note: 'An optical instrument used for a particular kind of distant observation.', names: [
      'Opera glasses', 'Rifle scope'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized scientific instrument for observing distant objects.', names: [
      'Radio telescope', 'Transit telescope'
    ]}
  ),

  'many-sides': records(
    { score: 30, tier: 'UNCOMMON', note: 'A named polygon with more than twelve sides.', names: [
      'Tridecagon', 'Tetradecagon'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named polygon with many sides.', names: [
      'Pentadecagon', 'Hexadecagon', 'Heptadecagon'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A high-sided polygon with a technical name.', names: [
      'Octadecagon', 'Icosagon', 'Triacontagon'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An extremely high-sided polygon with a specialized name.', names: [
      'Hectogon', 'Chiliagon'
    ]}
  ),

  'lighthouse-place': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar kind of coastal location where a lighthouse may be built.', names: [
      'Cape', 'Headland', 'Reef'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific coastal feature or navigation hazard associated with lighthouse placement.', names: [
      'Promontory', 'Breakwater', 'Shoal'
    ]},
    { score: 60, tier: 'RARE', note: 'A named lighthouse or lighthouse location recognized beyond its immediate region.', names: [
      ['Peggy’s Point Lighthouse', 'Peggy’s Cove Lighthouse'],
      'Portland Head Light'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named historic lighthouse.', names: [
      'Hook Lighthouse', 'Fastnet Rock Lighthouse'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A specialist-level historic lighthouse or coastal light.', names: [
      'Bell Rock Lighthouse', 'Pigeon Point Lighthouse'
    ]}
  ),

  'rotating-blades': records(
    { score: 15, tier: 'FAMILIAR', note: 'A household or industrial machine built around a rotating mechanism.', names: [
      'Blender', 'Food processor', 'Windmill'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A common machine that relies on a rotor, impeller, or rotating assembly.', names: [
      'Washing machine', 'Electric drill', 'Lawn mower'
    ]},
    { score: 60, tier: 'RARE', note: 'A machine with a less obvious rotating mechanism.', names: [
      'Vacuum cleaner', 'Water wheel', 'Leaf blower'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized machine whose operation depends on rotating machinery.', names: [
      'Turbofan engine', 'Centrifugal pump'
    ]}
  ),

  'signal-distortion': records(
    { score: 15, tier: 'FAMILIAR', note: 'A common radio-signal problem or propagation effect.', names: [
      'Signal fading', 'Doppler shift', 'Attenuation'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific form of radio interference or propagation distortion.', names: [
      'Co-channel interference', 'Adjacent-channel interference', 'Radio jamming'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named radio-frequency distortion mechanism.', names: [
      'Intermodulation distortion', 'Ionospheric scintillation'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level phenomenon that changes radio propagation or reception.', names: [
      'Atmospheric absorption', 'Solar radio burst'
    ]}
  ),

  'meteorite-feature': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognized mineral commonly found in meteorites.', names: [
      'Pyroxene', 'Plagioclase'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A mineral or metal phase found in particular meteorite classes.', names: [
      'Kamacite', 'Taenite', 'Troilite'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named mineral or feature documented in meteorites.', names: [
      'Magnetite', 'Schreibersite', 'Fusion crust'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist mineral phase or inclusion in meteorite material.', names: [
      'Plesite', 'Calcium-aluminum-rich inclusion'
    ]}
  ),

  'shelled-animal': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar shelled mollusk or other shelled animal.', names: [
      'Oyster', 'Mussel', 'Scallop'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable shelled marine animal.', names: [
      'Abalone', 'Limpet', 'Cockle'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named animal with a shell that is part of its body.', names: [
      'Whelk', 'Conch'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized shelled mollusk.', names: [
      'Periwinkle', 'Freshwater mussel'
    ]}
  ),

  'old-machine': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar sound made by old or worn mechanical equipment.', names: [
      'Squeak', 'Grind', 'Clatter'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable mechanical sound word.', names: [
      'Hiss', 'Thunk', 'Squeal'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly selected sound associated with old machinery.', names: [
      'Creak', 'Sputter'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized mechanical sound word.', names: [
      'Rumble', 'Click'
    ]}
  ),

  'navigation-tool': records(
    { score: 15, tier: 'FAMILIAR', note: 'A widely used navigation instrument or electronic aid.', names: [
      'GPS receiver', 'Radar', 'Sonar'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized navigational instrument used in ships, aircraft, or vehicles.', names: [
      'Gyrocompass', 'Marine chronometer', 'Odometer'
    ]},
    { score: 60, tier: 'RARE', note: 'A more specialized navigation system or instrument.', names: [
      'Inertial navigation system', 'Depth sounder'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialized electronic or radio-based navigation aid.', names: [
      'Radio direction finder', 'Chartplotter'
    ]}
  ),

  'lens-object': records(
    { score: 15, tier: 'FAMILIAR', note: 'A familiar everyday object that uses a functional lens.', names: [
      ['Eyeglasses', 'Glasses', 'Spectacles', 'Reading glasses'],
      ['Magnifying glass', 'Hand lens'],
      'Contact lens'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An optical device with lenses that is not always thought of as a lens object.', names: [
      'Periscope', 'Endoscope', 'Opera glasses'
    ]},
    { score: 60, tier: 'RARE', note: 'A more specialized object whose viewing function relies on lenses.', names: [
      'Camera viewfinder', 'Door viewer'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A technical optical instrument or viewing component.', names: [
      'Stereoscope', 'Photo enlarger'
    ]}
  ),

  'ring-forming': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable natural ring structure or astronomical object.', names: [
      'Solar halo', 'Lunar halo'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named astronomical structure or a natural circular pattern.', names: [
      'Ring galaxy', 'Cartwheel Galaxy', 'Growth rings'
    ]},
    { score: 60, tier: 'RARE', note: 'A less familiar ring structure in the Solar System or deep space.', names: [
      'Rings of Uranus', 'Rings of Neptune', 'Jupiter ring system'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level ring-shaped astronomical object.', names: [
      'Hoag’s Object', 'F ring of Saturn'
    ]}
  ),

  'weather-event': records(
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable weather or atmospheric phenomenon.', names: [
      'Waterspout', 'Microburst', 'Derecho'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A specific cloud formation or atmospheric event.', names: [
      'Mammatus cloud', 'Lenticular cloud', 'Fog bow'
    ]},
    { score: 60, tier: 'RARE', note: 'A less common atmospheric optical or electrical phenomenon.', names: [
      'Glory', 'Ball lightning', 'Green flash'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist weather or atmospheric phenomenon.', names: [
      'Graupel', 'Diamond dust', 'Thundersnow'
    ]}
  )
};
