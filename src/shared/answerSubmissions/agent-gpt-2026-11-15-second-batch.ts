import type { AnswerRecord } from '../answerBank.js';

/**
 * Phase B answer contribution, batch 2.
 *
 * Research references (catalogues are living sources; criteria are frozen in
 * the matching Phase A question definitions):
 * - Smithsonian Global Volcanism Program Holocene list:
 *   https://volcano.si.edu/volcanolist_holocene.cfm
 * - NASA Solar System moons: https://science.nasa.gov/solar-system/moons/facts/
 * - UNESCO World Heritage List: https://whc.unesco.org/en/list/
 * - Parks Canada national parks: https://parks.canada.ca/pn-np
 * - Official National Pokédex: https://www.pokemon.com/pokedex/
 * - Florida Museum shark species profiles:
 *   https://www.floridamuseum.ufl.edu/discover-fish/sharks/species-profiles/
 * - American Kennel Club recognized breeds:
 *   https://www.akc.org/press-center/articles-resources/facts-and-stats/breeds-year-recognized/
 * - Nobel Prize Physics laureates:
 *   https://www.nobelprize.org/prizes/lists/all-nobel-prizes-in-physics/all/
 * - Non-avian dinosaur genus reference, based on the Paleobiology Database:
 *   https://dinopages.com/
 * - NASA Mars mission chronology:
 *   https://nssdc.gsfc.nasa.gov/planetary/chronology_mars.html
 * - NASA space observatories:
 *   https://app.across.sciencecloud.nasa.gov/observatories
 * - Global metro-system reference:
 *   https://en.wikipedia.org/wiki/List_of_metro_systems
 * - BoardGameGeek board-game catalogue:
 *   https://boardgamegeek.com/browse/boardgame
 *
 * Answers are canonicalized by their first alias. Alternative spellings and
 * familiar short names are grouped as aliases rather than separate entries.
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

export const ANSWER_SUBMISSIONS_BATCH_2: Record<string, AnswerRecord[]> = {
  'holocene-volcano': records(
    { score: 10, tier: 'BACKGROUND', note: 'A widely recognized volcano in the Smithsonian Holocene catalogue.', names: [
      'Mount Etna', 'Kilauea', ['Mount St. Helens', 'St. Helens'], ['Mount Vesuvius', 'Vesuvius'],
      ['Mount Fuji', 'Fuji'], 'Krakatau', 'Mauna Loa', 'Mount Rainier', 'Popocatepetl', 'Stromboli'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known Holocene volcanic system or mountain.', names: [
      'Cotopaxi', 'Arenal', 'Merapi', 'Sakurajima', 'Taal', 'Hekla', 'Eyjafjallajokull',
      'Pinatubo', 'Tambora', 'Erebus'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A documented Holocene volcano beyond the most familiar examples.', names: [
      'Acatenango', 'Acamarachi', 'Bezymianny', 'Bulusan', 'Chaiten', 'Cumbre Vieja',
      'Deception Island', 'Dukono', 'Erta Ale', 'Fuego', 'Galeras', 'Guagua Pichincha'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named volcano recorded by the Smithsonian Global Volcanism Program.', names: [
      'Ambrym', 'Augustine', 'Avachinsky', 'Barren Island', 'Batu Tara', 'Ceboruco',
      'Cerro Azul', 'Dempo', 'Ebeko', 'Grimsvotn', 'Hunga Tonga-Hunga Haapai',
      'Ijen', 'Kelud', 'Klyuchevskoy', 'Nevado del Ruiz', 'Ruapehu'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level entry from the Holocene volcano catalogue.', names: [
      'Abu', 'Adatarayama', 'Adwa', 'Afdera', 'Agrigan', 'Agua', 'Biliran',
      'Diky Greben', 'Doyo Seamount', 'Fonualei', 'Guguan', 'Hachijojima',
      'Havre Seamount', 'Heard', 'Jailolo', 'Jingpohu'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure volcanic feature recorded in the Smithsonian Holocene database.', names: [
      'Northern Lake Abaya Volcanic Field'
    ]}
  ),

  'solar-system-moon': records(
    { score: 10, tier: 'BACKGROUND', note: 'One of the best-known named moons in the Solar System.', names: [
      'Earths Moon', 'Phobos', 'Deimos', 'Io', 'Europa', 'Ganymede', 'Callisto',
      'Titan', 'Enceladus', 'Triton', 'Charon', 'Titania'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major or commonly discussed planetary moon.', names: [
      'Mimas', 'Tethys', 'Dione', 'Rhea', 'Iapetus', 'Hyperion', 'Phoebe',
      'Miranda', 'Ariel', 'Umbriel', 'Oberon', 'Nereid'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A named satellite that is less familiar than the major moons.', names: [
      'Amalthea', 'Himalia', 'Elara', 'Thebe', 'Adrastea', 'Metis', 'Janus',
      'Epimetheus', 'Prometheus', 'Pandora', 'Pan', 'Atlas', 'Puck', 'Proteus'
    ]},
    { score: 60, tier: 'RARE', note: 'A smaller or irregular moon with an official name.', names: [
      'Pasiphae', 'Sinope', 'Lysithea', 'Carme', 'Ananke', 'Leda', 'Callirrhoe',
      'Themisto', 'Megaclite', 'Taygete', 'Chaldene', 'Harpalyke', 'Kalyke',
      'Iocaste', 'Erinome', 'Isonoe', 'Praxidike', 'Autonoe', 'Thyone',
      'Hermippe', 'Telesto', 'Calypso', 'Helene', 'Polydeuces'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level irregular or inner moon.', names: [
      'Aitne', 'Eurydome', 'Euanthe', 'Euporie', 'Orthosie', 'Sponde', 'Kale',
      'Pasithee', 'Hegemone', 'Mneme', 'Aoede', 'Thelxinoe', 'Arche',
      'Kallichore', 'Helike', 'Carpo', 'Eukelade', 'Cyllene', 'Kiviuq',
      'Ijiraq', 'Paaliaq', 'Albiorix', 'Siarnaq', 'Tarvos', 'Erriapus',
      'Bebhionn', 'Skathi', 'Mundilfari', 'Narvi', 'Hati', 'Farbauti',
      'Fenrir', 'Bestla', 'Bergelmir', 'Ymir', 'Kari', 'Loge', 'Fornjot',
      'Daphnis', 'Aegaeon', 'Methone', 'Pallene', 'Anthe', 'Cordelia',
      'Ophelia', 'Bianca', 'Cressida', 'Desdemona', 'Juliet', 'Portia',
      'Rosalind', 'Belinda', 'Caliban', 'Sycorax', 'Prospero', 'Setebos',
      'Stephano', 'Trinculo', 'Francisco', 'Margaret', 'Naiad', 'Thalassa',
      'Despina', 'Galatea', 'Larissa', 'Hippocamp', 'Nix', 'Hydra',
      'Kerberos', 'Styx'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure named moon in the outer Solar System.', names: [
      'Suttungr'
    ]}
  ),

  'unesco-world-heritage': records(
    { score: 10, tier: 'BACKGROUND', note: 'A highly recognizable property on the UNESCO World Heritage List.', names: [
      'Great Wall of China', 'Taj Mahal', 'Machu Picchu', 'Pyramids of Giza',
      'Grand Canyon National Park', 'Yellowstone National Park',
      'Acropolis of Athens', 'Stonehenge', 'Petra', 'Angkor'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely known UNESCO-inscribed cultural or natural property.', names: [
      'Venice and its Lagoon', 'Historic Centre of Rome', 'Historic Centre of Florence',
      'Eiffel Tower', 'Galapagos Islands', 'Serengeti National Park',
      'Great Barrier Reef', 'Mount Fuji', 'Kilimanjaro National Park',
      'Old City of Jerusalem'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An established World Heritage property that is less frequently named.', names: [
      'Tassili nAjjer', 'Timgad', 'Djémila', 'Butrint', 'Madriu-Perafita-Claror Valley',
      'Koutammakou', 'Iguazu National Park', 'Los Glaciares National Park',
      'Península Valdés', 'Ischigualasto Talampaya Natural Parks',
      'Quebrada de Humahuaca', 'Monastery of Geghard'
    ]},
    { score: 60, tier: 'RARE', note: 'A specific World Heritage property with a distinctive official name.', names: [
      'Qhapaq Nan Andean Road System', 'Cueva de las Manos', 'ESMA Museum and Site of Memory',
      'Historic Centre of Berat and Gjirokastra', 'Kasbah of Algiers',
      'Minaret and Archaeological Remains of Jam', 'Cultural Landscape of Bamiyan Valley',
      'Historic Centre of Brugge', 'Walled City of Baku', 'Registan Square',
      'Borobudur Temple Compounds', 'Prambanan Temple Compounds'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more obscure property confirmed on UNESCO’s current World Heritage List.', names: [
      'Aapravasi Ghat', 'Chief Roi Mata Domain', 'Nan Madol', 'Mbanza Kongo',
      'Tsingy de Bemaraha Strict Nature Reserve', 'Twyfelfontein',
      'Kakadu National Park', 'Purnululu National Park', 'Wadi Rum Protected Area',
      'Socotra Archipelago', 'Ksar of Ait-Ben-Haddou', 'MZab Valley',
      'Rock-Hewn Churches of Lalibela', 'Cidade Velha', 'Kondoa Rock-Art Sites',
      'Morne Trois Pitons National Park'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An especially obscure inscribed property with a distinctive official name.', names: [
      'W-Arly-Pendjari Complex'
    ]}
  ),

  'canadian-national-park': records(
    { score: 10, tier: 'BACKGROUND', note: 'A prominent Canadian national park or reserve.', names: [
      'Banff National Park', 'Jasper National Park', 'Yoho National Park',
      'Waterton Lakes National Park', 'Gros Morne National Park',
      'Wood Buffalo National Park', 'Pacific Rim National Park Reserve',
      'Fundy National Park'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A recognized Parks Canada national park or reserve.', names: [
      'Kootenay National Park', 'Glacier National Park', 'Cape Breton Highlands National Park',
      'Riding Mountain National Park', 'Prince Edward Island National Park',
      'Bruce Peninsula National Park', 'Point Pelee National Park',
      'Elk Island National Park', 'Mount Revelstoke National Park',
      'La Mauricie National Park'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A formally designated Canadian national park or reserve.', names: [
      'Forillon National Park', 'Grasslands National Park',
      'Prince Albert National Park', 'Terra Nova National Park', 'Pukaskwa National Park',
      'Kouchibouguac National Park', 'Georgian Bay Islands National Park',
      'Auyuittuq National Park', 'Aulavik National Park'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named national park or national park reserve listed by Parks Canada.', names: [
      'Ivvavik National Park', 'Vuntut National Park', 'Wapusk National Park',
      'Sirmilik National Park', 'Quttinirpaaq National Park',
      'Qausuittuq National Park', 'Ukkusiksalik National Park',
      'Torngat Mountains National Park', 'Nahanni National Park Reserve',
      'Mingan Archipelago National Park Reserve'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A remote or less familiar Parks Canada national park reserve.', names: [
      'Gulf Islands National Park Reserve', 'Gwaii Haanas National Park Reserve',
      'Kluane National Park and Reserve', 'Sable Island National Park Reserve',
      'Thousand Islands National Park', 'Nááts’įhch’oh National Park Reserve',
      'Tuktut Nogait National Park', 'Akami-Uapishkᵁ-KakKasuak-Mealy Mountains National Park Reserve'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure Canadian national park reserve listed by Parks Canada.', names: [
      'Thaidene Nëné National Park Reserve'
    ]}
  ),

  'pokemon-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar species from the official National Pokédex.', names: [
      'Pikachu', 'Charizard', 'Bulbasaur', 'Charmander', 'Squirtle',
      'Eevee', 'Mewtwo', 'Mew', 'Jigglypuff', 'Snorlax',
      'Psyduck', 'Gengar', 'Lapras', 'Meowth', 'Lucario'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized Pokémon species from the National Pokédex.', names: [
      'Blastoise', 'Venusaur', 'Vulpix', 'Ninetales', 'Arcanine',
      'Gyarados', 'Dragonite', 'Ditto', 'Vaporeon', 'Jolteon',
      'Flareon', 'Espeon', 'Umbreon', 'Togepi', 'Zorua'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An official Pokémon species that is less commonly the first answer people think of.', names: [
      'Porygon', 'Omanyte', 'Kabuto', 'Aerodactyl', 'Chikorita',
      'Cyndaquil', 'Totodile', 'Mareep', 'Heracross', 'Sneasel',
      'Treecko', 'Torchic', 'Mudkip', 'Ralts', 'Absol',
      'Bagon', 'Beldum', 'Turtwig', 'Piplup', 'Shinx'
    ]},
    { score: 60, tier: 'RARE', note: 'A valid National Pokédex species with a less prominent profile.', names: [
      'Dunsparce', 'Qwilfish', 'Girafarig', 'Misdreavus', 'Corsola',
      'Delibird', 'Tynamo', 'Shuppet', 'Relicanth', 'Chimecho',
      'Clamperl', 'Luvdisc', 'Tropius', 'Kecleon', 'Pachirisu',
      'Chatot', 'Carnivine', 'Lumineon', 'Maractus', 'Sigilyph'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A deeper-cut species from the official National Pokédex.', names: [
      'Nosepass', 'Lileep', 'Anorith', 'Castform', 'Spinda',
      'Wynaut', 'Snorunt', 'Shedinja', 'Kricketot', 'Burmy',
      'Combee', 'Cherubi', 'Chingling', 'Happiny', 'Mantyke',
      'Karrablast', 'Shelmet', 'Cryogonal', 'Heatmor', 'Durant',
      'Binacle', 'Skrelp', 'Clauncher', 'Klefki', 'Comfey',
      'Morelull', 'Shiinotic', 'Bruxish', 'Yungoos', 'Silicobra'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A genuine but relatively obscure National Pokédex species.', names: [
      'Dhelmise'
    ]}
  ),

  'shark-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A well-known living shark species.', names: [
      'Great white shark', 'Tiger shark', 'Whale shark', 'Hammerhead shark',
      'Bull shark', 'Nurse shark', 'Basking shark', 'Blue shark',
      'Mako shark', 'Thresher shark'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A recognized shark species with a familiar common name.', names: [
      'Shortfin mako', 'Longfin mako', 'Oceanic whitetip shark', 'Blacktip shark',
      'Blacktip reef shark', 'Lemon shark', 'Goblin shark', 'Greenland shark',
      'Sand tiger shark', 'Porbeagle'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct living shark species documented by museum or taxonomic references.', names: [
      'Spinner shark', 'Silky shark', 'Dusky shark', 'Sandbar shark',
      'Grey reef shark', 'Caribbean reef shark', 'Whitetip reef shark',
      'Galapagos shark', 'Night shark', 'Bigeye thresher',
      'Pelagic thresher', 'Megamouth shark'
    ]},
    { score: 60, tier: 'RARE', note: 'A less familiar shark species, accepted under its recognized common name.', names: [
      'Epaulette shark', 'Zebra shark', 'Horn shark', 'Port Jackson shark',
      'Cookiecutter shark', 'Kitefin shark', 'Bramble shark', 'Spiny dogfish',
      'Black dogfish', 'Small-spotted catshark', 'Chain catshark',
      'Scalloped hammerhead', 'Great hammerhead', 'Bonnethead',
      'Smooth hammerhead'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level shark species from a less familiar family or habitat.', names: [
      'Tasselled wobbegong', 'Spotted wobbegong', 'Ornate wobbegong',
      'Whitespotted bamboo shark', 'Brownbanded bamboo shark',
      'Tawny nurse shark', 'Sicklefin lemon shark', 'Milk shark',
      'Atlantic sharpnose shark', 'Caribbean sharpnose shark',
      'Smalltail shark', 'Bignose shark', 'Finetooth shark',
      'Silvertip shark', 'Bronze whaler', 'Salmon shark'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure, formally recognized living shark species.', names: [
      'Ninja lanternshark'
    ]}
  ),

  'akc-dog-breed': records(
    { score: 10, tier: 'BACKGROUND', note: 'A highly familiar breed recognized by the American Kennel Club.', names: [
      'Labrador Retriever', 'Golden Retriever', 'German Shepherd Dog',
      'French Bulldog', 'Bulldog', 'Poodle', 'Beagle', 'Rottweiler',
      'Dachshund', 'Boxer', 'Chihuahua', 'Siberian Husky',
      'Great Dane', 'Doberman Pinscher', 'Yorkshire Terrier'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized AKC breed.', names: [
      'Pembroke Welsh Corgi', 'Australian Shepherd', 'Cavalier King Charles Spaniel',
      'Shih Tzu', 'Pug', 'Border Collie', 'Boston Terrier', 'Basset Hound',
      'Maltese', 'Shiba Inu', 'Weimaraner', 'Saint Bernard',
      'Newfoundland', 'Samoyed', 'Great Pyrenees'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A current American Kennel Club recognized breed.', names: [
      'Airedale Terrier', 'Akita', 'Alaskan Malamute', 'Basenji', 'Bichon Frise',
      'Bloodhound', 'Borzoi', 'Briard', 'Bullmastiff', 'Cairn Terrier',
      'Cane Corso', 'Chow Chow', 'Collie', 'Dalmatian', 'Greyhound'
    ]},
    { score: 60, tier: 'RARE', note: 'A less frequently named AKC-recognized breed.', names: [
      'Affenpinscher', 'American Eskimo Dog', 'American Foxhound',
      'American Hairless Terrier', 'American Water Spaniel',
      'Anatolian Shepherd Dog', 'Bedlington Terrier', 'Belgian Tervuren',
      'Bluetick Coonhound', 'Boykin Spaniel', 'Brussels Griffon',
      'Clumber Spaniel', 'Dandie Dinmont Terrier', 'Finnish Spitz',
      'Gordon Setter', 'Keeshond', 'Komondor', 'Kuvasz',
      'Lagotto Romagnolo', 'Lowchen'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist or less common breed in the AKC registry.', names: [
      'Azawakh', 'Biewer Terrier', 'Cesky Terrier', 'Chinook',
      'Danish-Swedish Farmdog', 'English Toy Spaniel', 'Entlebucher Mountain Dog',
      'Finnish Lapphund', 'Icelandic Sheepdog', 'Japanese Chin',
      'Kerry Blue Terrier', 'Lancashire Heeler', 'Manchester Terrier',
      'Mudi', 'Norwegian Lundehund', 'Otterhound', 'Pharaoh Hound',
      'Plott', 'Pumi', 'Russian Toy', 'Sealyham Terrier',
      'Skye Terrier', 'Sloughi', 'Swedish Vallhund', 'Tibetan Spaniel',
      'Treeing Walker Coonhound', 'Xoloitzcuintli', 'American Leopard Hound'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly uncommon breed on the AKC’s recognized-breed register.', names: [
      'Grand Basset Griffon Vendéen'
    ]}
  ),

  'nobel-physics-laureate': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous individual Nobel Prize in Physics laureate.', names: [
      'Albert Einstein', 'Marie Curie', 'Niels Bohr', 'Richard Feynman',
      'Max Planck', 'Enrico Fermi', 'Werner Heisenberg', 'Erwin Schrödinger',
      'Wilhelm Röntgen', 'J. J. Thomson'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely known Physics Nobel laureate.', names: [
      'Lawrence Bragg', 'Kip Thorne', 'Peter Higgs', 'Donna Strickland',
      'Andrea Ghez', 'Roger Penrose', 'Subrahmanyan Chandrasekhar',
      'Murray Gell-Mann', 'John Bardeen', 'William Shockley',
      'Leon Cooper', 'John Schrieffer'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized Physics Nobel laureate with a major contribution to the field.', names: [
      'Henri Becquerel', 'Pierre Curie', 'Lord Rayleigh', 'Guglielmo Marconi',
      'Max von Laue', 'Arthur Compton', 'Louis de Broglie', 'C. V. Raman',
      'James Franck', 'Gustav Hertz', 'Paul Dirac', 'Wolfgang Pauli'
    ]},
    { score: 60, tier: 'RARE', note: 'A Physics Nobel laureate whose name is less commonly recalled outside science.', names: [
      'Manne Siegbahn', 'Owen Richardson', 'Jean Baptiste Perrin',
      'Robert Millikan', ['C. T. R. Wilson', 'Charles Thomson Rees Wilson'], 'Frits Zernike',
      'Patrick Blackett', 'Cecil Powell', 'Willis Lamb', 'Polykarp Kusch',
      'Emilio Segrè', 'Owen Chamberlain', 'Eugene Wigner',
      'Maria Goeppert Mayer', 'Lev Landau'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named individual from the official Physics laureate list.', names: [
      'Charles Edouard Guillaume', 'Johannes Stark', 'Charles Glover Barkla',
      'Gustaf Dalén', 'Heike Kamerlingh Onnes', 'Ivar Giaever',
      'Walther Bothe', 'Max Born', 'Hideki Yukawa', 'Donald Glaser',
      'Rudolf Mössbauer', 'Pyotr Kapitsa',
      'Kai Siegbahn', 'Cecil Frank Powell', 'Luis Alvarez',
      'Arthur Ashkin', 'Steven Chu', 'Nicolaas Bloembergen',
      'Jerome Isaac Friedman', 'Henry Way Kendall'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A real but particularly obscure name on the official Physics laureate roll.', names: [
      'Frederick Reines'
    ]}
  ),

  'dinosaur-genus': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous genus of non-avian dinosaur.', names: [
      'Tyrannosaurus', 'Triceratops', 'Stegosaurus', 'Brachiosaurus',
      'Diplodocus', 'Velociraptor', 'Spinosaurus', 'Ankylosaurus',
      'Allosaurus', 'Apatosaurus', 'Brontosaurus', 'Iguanodon'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known non-avian dinosaur genus.', names: [
      'Parasaurolophus', 'Pachycephalosaurus', 'Carnotaurus', 'Giganotosaurus',
      'Deinonychus', 'Compsognathus', 'Gallimimus', 'Oviraptor',
      'Therizinosaurus', 'Dilophosaurus', 'Coelophysis', 'Plateosaurus'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A valid dinosaur genus beyond the most familiar examples.', names: [
      'Albertosaurus', 'Gorgosaurus', 'Tarbosaurus', 'Daspletosaurus',
      'Carcharodontosaurus', 'Majungasaurus', 'Massospondylus',
      'Herrerasaurus', 'Eoraptor', 'Utahraptor', 'Microraptor', 'Sinosauropteryx'
    ]},
    { score: 60, tier: 'RARE', note: 'A documented non-avian dinosaur genus with a less familiar name.', names: [
      'Centrosaurus', 'Styracosaurus', 'Protoceratops', 'Chasmosaurus',
      'Pentaceratops', 'Pachyrhinosaurus', 'Maiasaura', 'Edmontosaurus',
      'Corythosaurus', 'Lambeosaurus', 'Baryonyx', 'Suchomimus',
      'Irritator', 'Acrocanthosaurus', 'Torvosaurus'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level non-avian dinosaur genus recorded in paleontological databases.', names: [
      'Nigersaurus', 'Amargasaurus', 'Saltasaurus', 'Shunosaurus',
      'Mamenchisaurus', 'Camarasaurus', 'Cryolophosaurus', 'Monolophosaurus',
      'Yangchuanosaurus', 'Sinraptor', 'Deinocheirus', 'Concavenator',
      'Einiosaurus', 'Leptoceratops', 'Nedoceratops', 'Anzu',
      'Nqwebasaurus', 'Kileskus', 'Saurornitholestes', 'Richardoestesia',
      'Dreadnoughtus', 'Patagotitan', 'Argentinosaurus'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure valid genus from the Paleobiology Database-backed dinosaur reference.', names: [
      'Asiamericana'
    ]}
  ),

  'mars-exploration-mission': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous successful mission to explore Mars.', names: [
      'Viking 1', 'Viking 2', 'Mars Pathfinder', 'Mars Odyssey',
      'Mars Express', 'Spirit', 'Opportunity', 'Curiosity',
      'Perseverance', 'Mars Reconnaissance Orbiter'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major Mars mission from a widely known exploration program.', names: [
      'Mariner 4', 'Mariner 6', 'Mariner 7', 'Mariner 9',
      'Mars Global Surveyor', 'Mars Polar Lander', 'Mars Climate Orbiter',
      'Phoenix', 'MAVEN', 'InSight'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A genuine international mission sent toward Mars.', names: [
      'Mars 1', 'Mars 2', 'Mars 3', 'Mars 4', 'Mars 5',
      'Mars 6', 'Mars 7', 'Phobos 1', 'Phobos 2', 'Nozomi',
      'Beagle 2', 'Mars Orbiter Mission'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named Mars-bound spacecraft or mission.', names: [
      'Zond 2', 'Mars Observer', 'Deep Space 2', 'Mars 96',
      'Mars 2020', 'ExoMars Trace Gas Orbiter', 'Schiaparelli EDM',
      'Hope Mars Mission', 'Tianwen-1', 'Zhurong'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A lesser-known Mars exploration attempt or component mission.', names: [
      ['Mars 1960A', 'Korabl 4', 'Marsnik 1'], ['Mars 1960B', 'Korabl 5', 'Marsnik 2'], ['Mars 1962B', 'Sputnik 24', 'Korabl 13'],
      'Mariner 3', 'Mariner 8', 'Mars 1969A', 'Mars 1969B',
      ['Mars 1971C', 'Cosmos 419'], 'Mars 1973A', 'Mars 1973B'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure historic Mars mission attempt documented in the NASA chronology.', names: [
      ['Mars 1962A', 'Sputnik 22', 'Korabl 11']
    ]}
  ),

  'space-observatory': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous space-based astronomical observatory.', names: [
      'Hubble Space Telescope', 'James Webb Space Telescope', 'Chandra X-ray Observatory',
      'Spitzer Space Telescope', 'Kepler Space Telescope', 'TESS',
      'Fermi Gamma-ray Space Telescope', 'Gaia', 'Herschel Space Observatory',
      'Compton Gamma Ray Observatory'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major space telescope or observatory with a widely known mission.', names: [
      'XMM-Newton', 'WISE', 'NEOWISE', 'Planck', 'WMAP',
      'IRAS', 'NuSTAR', 'Swift Observatory', 'Euclid',
      'Nancy Grace Roman Space Telescope'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized astronomical observatory that operated or operates in space.', names: [
      'COBE', 'ROSAT', 'Einstein Observatory', 'Uhuru',
      ['International Ultraviolet Explorer', 'IUE'], 'Extreme Ultraviolet Explorer',
      'GALEX', 'FUSE', 'INTEGRAL', 'EXOSAT'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named space observatory or astronomy satellite.', names: [
      'Suzaku', 'Hitomi', 'ASCA', 'AKARI', 'AstroSat',
      'CoRoT', 'CHEOPS', 'MOST', 'Spektr-R', 'Spektr-RG'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level orbital observatory or astronomy mission.', names: [
      'NICER', 'IXPE', 'SPHEREx', 'Pandora Observatory',
      'SPARCS', 'XRISM', 'Hipparcos',
      'High Energy Astronomy Observatory 1', 'HETE-2',
      'BeppoSAX'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure space-based observatory with a documented astronomical mission.', names: [
      'EUVE'
    ]}
  ),

  'metro-city': records(
    { score: 10, tier: 'BACKGROUND', note: 'A city with a famous operational metro or subway system.', names: [
      'New York City', 'London', 'Paris', 'Tokyo', 'Moscow',
      'Beijing', 'Shanghai', 'Seoul', 'Hong Kong', 'Singapore',
      'Mexico City', 'Delhi'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major city served by an established metro network.', names: [
      'Berlin', 'Madrid', 'Barcelona', 'Rome', 'Milan',
      'Vienna', 'Prague', 'Budapest', 'Warsaw', 'Istanbul',
      'Cairo', 'Toronto'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A city with an operating rapid-transit metro system.', names: [
      'Chicago', 'Washington, D.C.', 'Boston', 'Philadelphia',
      'Los Angeles', 'San Francisco', 'Atlanta', 'Montreal',
      'Vancouver', 'São Paulo', 'Rio de Janeiro', 'Buenos Aires',
      'Santiago', 'Lima', 'Caracas'
    ]},
    { score: 60, tier: 'RARE', note: 'A less frequently named city with an operational metro or underground system.', names: [
      'Glasgow', 'Newcastle', 'Rotterdam', 'Amsterdam', 'Brussels',
      'Lyon', 'Marseille', 'Toulouse', 'Lille', 'Rennes',
      'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Bucharest',
      'Sofia', 'Athens', 'Thessaloniki', 'Ankara', 'Izmir'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A city outside the most familiar metro networks, with an operating system.', names: [
      'Tashkent', 'Almaty', 'Baku', 'Tbilisi', 'Yerevan',
      'Tianjin', 'Chengdu', 'Wuhan', 'Nanjing', 'Chongqing',
      'Hangzhou', 'Suzhou', 'Xi’an', 'Dalian', 'Shenzhen',
      'Fukuoka', 'Sapporo', 'Sendai', 'Kobe', 'Hiroshima',
      'Daegu', 'Daejeon', 'Gwangju', 'Busan',
      'Jaipur', 'Kochi', 'Lucknow', 'Nagpur', 'Ahmedabad',
      'Lahore', 'Dhaka', 'Hanoi', 'Jakarta', 'Dubai',
      'Algiers', 'Medellín', 'Quito', 'Panama City'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A less commonly cited city whose operational metro system is easy to overlook.', names: [
      'Nizhny Novgorod'
    ]}
  ),

  'woodwind-instrument': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar member of the woodwind family.', names: [
      'Flute', 'Clarinet', 'Oboe', 'Bassoon', 'Saxophone',
      'Piccolo', 'Recorder', 'English horn', 'Bass clarinet', 'Baroque oboe'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A recognized orchestral or commonly taught woodwind instrument.', names: [
      'Contrabassoon', 'Alto flute', 'Bass flute', 'Soprano saxophone',
      'Alto saxophone', 'Tenor saxophone', 'Baritone saxophone',
      'E-flat clarinet', 'Basset horn', 'Oboe d’amore'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized woodwind instrument found in classical or folk traditions.', names: [
      'Shakuhachi', 'Bansuri', 'Dizi', 'Xiao', 'Ney',
      'Kaval', 'Tin whistle', 'Fife', 'Ocarina', 'Pan flute',
      'Quena', 'Siku'
    ]},
    { score: 60, tier: 'RARE', note: 'A more specialized reed, flute, or regional woodwind instrument.', names: [
      'Duduk', 'Zurna', 'Suona', 'Shehnai', 'Nadaswaram',
      'Bombarde', 'Crumhorn', 'Shawm', 'Hichiriki', 'Piri',
      'Tárogató', 'Dulzaina'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist or historically less common woodwind instrument.', names: [
      'Heckelphone', 'Bass oboe', 'Sopranino recorder', 'Great bass recorder',
      'Contrabass clarinet', 'Sopranino saxophone', 'Bass saxophone',
      'Rauschpfeife', 'Musette de cour', 'Albogue',
      'Uilleann pipes', 'Great Highland bagpipes'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure regional double-reed woodwind.', names: [
      'Sipsi'
    ]}
  ),

  'board-game': records(
    { score: 10, tier: 'BACKGROUND', note: 'A classic and widely recognized board game.', names: [
      'Chess', 'Checkers', 'Go', 'Backgammon', 'Monopoly',
      'Scrabble', 'Clue', 'Risk', 'Battleship', 'The Game of Life',
      'Sorry!', 'Connect Four'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A familiar tabletop board game with a large audience.', names: [
      'Catan', 'Ticket to Ride', 'Carcassonne', 'Pandemic',
      'Trivial Pursuit', 'Stratego', 'Othello', 'Parcheesi',
      'Chinese Checkers', 'Snakes and Ladders', 'Candy Land', 'Chutes and Ladders'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A well-established board game beyond the most familiar family titles.', names: [
      'Azul', 'Wingspan', 'Terraforming Mars', 'Gloomhaven',
      'Small World', 'Power Grid', 'Puerto Rico', 'Agricola',
      'Caverna', 'Blokus', 'Quoridor', 'Santorini'
    ]},
    { score: 60, tier: 'RARE', note: 'A modern or traditional board game less commonly named by casual players.', names: [
      'Tigris & Euphrates', 'El Grande', 'Twilight Struggle',
      'Twilight Imperium', 'Dune', 'Cosmic Encounter', 'Patchwork',
      'Qwirkle', 'Pente', 'Abalone', 'Tak', 'Fox and Geese'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist board game or historical tabletop game.', names: [
      'Hnefatafl', 'Nine Men’s Morris', 'Royal Game of Ur',
      'Senet', 'Agon', 'Halma', 'Pachisi', 'Ludo',
      'Oware', 'Tafl', 'Shogi', 'Xiangqi',
      'Go-Moku', 'Yut', 'Fanorona', 'Surakarta',
      'Yote', 'Bao', 'Congkak', 'Myrmes',
      'Brass: Birmingham', 'Brass: Lancashire', 'Root',
      '7 Wonders', 'The Castles of Burgundy', 'Through the Ages'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure published board game with a dedicated hobby following.', names: [
      'The Great Zimbabwe'
    ]}
  )
};
