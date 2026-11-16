import type { AnswerRecord } from '../answerBank.js';

/**
 * Phase B answer contribution, daily batch.
 *
 * Research references (accessed 2026-11-15/16; catalogues are living sources):
 * - Bat Species of the World, Global Bat Taxonomy Working Group:
 *   https://www.batnames.org/
 * - Amphibian Species of the World, AMNH, Order Anura:
 *   https://amphibiansoftheworld.amnh.org/Amphibia/Anura
 * - The Reptile Database:
 *   https://www.reptile-database.org/
 * - University of Florida BioCosmos / Catalogue of Life, Papilionidae:
 *   https://biocosmos.rc.ufl.edu/family/papilionidae
 * - World Orchids, synonymic checklist:
 *   https://www.worldplants.de/world-orchids/orchid-list
 * - Coral Trait Database species catalogue:
 *   https://www.coraltraits.org/species
 * - UNESCO Intangible Cultural Heritage lists:
 *   https://ich.unesco.org/en/lists
 * - UNESCO Man and the Biosphere Programme current reserve list:
 *   https://www.unesco.org/en/mab/list
 * - UNESCO Creative Cities dataset:
 *   https://data.unesco.org/explore/dataset/cce001/
 * - NASA Exoplanet Archive, confirmed Planetary Systems:
 *   https://exoplanetarchive.ipac.caltech.edu/
 * - IAU/USGS Gazetteer of Planetary Nomenclature, lunar features:
 *   https://planetarynames.wr.usgs.gov/Page/Moon1to1MAtlas
 * - Vitis International Variety Catalogue:
 *   https://www.vivc.de/
 * - University of Adelaide global wine-grape varieties database:
 *   https://www.adelaide.edu.au/wine-econ/databases/wine-grape-varieties
 * - EU eAmbrosia geographical-indications register; cheese index cross-check:
 *   https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/
 *   https://towardia.org/en/protected-cheese-names/
 * - Roller Coaster DataBase census and ride records:
 *   https://rcdb.com/census.htm
 *
 * Canonical names appear first; spelling variants, scientific names, and
 * recognized short forms are grouped as aliases. The tier note is copied to
 * each answer in its group and records why that group is a valid match.
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

export const ANSWER_SUBMISSIONS_BATCH_3: Record<string, AnswerRecord[]> = {
  'bat-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar living bat species in the Bat Species of the World taxonomy.', names: [
      ['Common vampire bat', 'Desmodus rotundus'],
      ['Little brown bat', 'Myotis lucifugus']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized fruit bat or insect-eating bat species.', names: [
      ['Egyptian fruit bat', 'Rousettus aegyptiacus'],
      ['Mexican free-tailed bat', 'Tadarida brasiliensis'],
      ['Indian flying fox', 'Pteropus medius']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct accepted species with a recognizable regional or ecological identity.', names: [
      ['Greater horseshoe bat', 'Rhinolophus ferrumequinum'],
      ['Hoary bat', 'Lasiurus cinereus'],
      ['Pallid bat', 'Antrozous pallidus'],
      ['Lesser long-nosed bat', 'Leptonycteris yerbabuenae']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named species recorded in the global bat taxonomy.', names: [
      ['Hammer-headed bat', 'Hypsignathus monstrosus'],
      ['Spectral bat', 'Vampyrum spectrum'],
      ['Ghost bat', 'Macroderma gigas'],
      ['Greater bulldog bat', 'Noctilio leporinus'],
      ['Honduran white bat', 'Ectophylla alba'],
      ['Straw-coloured fruit bat', 'Eidolon helvum']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level accepted bat species; the scientific alias identifies the taxon precisely.', names: [
      ["Kitti's hog-nosed bat", 'Craseonycteris thonglongyai'],
      ['Rodrigues flying fox', 'Pteropus rodricensis'],
      ["Livingstone's fruit bat", 'Pteropus livingstonii'],
      ['Mariana fruit bat', 'Pteropus mariannus'],
      ["Wahlberg's epauletted fruit bat", 'Epomophorus wahlbergi'],
      ['Little golden-mantled flying fox', 'Pteropus pumilus'],
      ["Bechstein's bat", 'Myotis bechsteinii'],
      ["Natterer's bat", 'Myotis nattereri'],
      ["Daubenton's bat", 'Myotis daubentonii'],
      ["Geoffroy's bat", 'Myotis emarginatus'],
      ["Brandt's bat", 'Myotis brandtii'],
      ['Brown long-eared bat', 'Plecotus auritus'],
      ['Egyptian slit-faced bat', 'Nycteris thebaica'],
      ['Tube-nosed fruit bat', 'Nyctimene albiventer']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure, formally named tube-nosed bat species in the specialist taxonomy.', names: [
      'Nyctimene wrightae'
    ]}
  ),

  'frog-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar living anuran species, accepted by the AMNH amphibian reference.', names: [
      ['American bullfrog', 'Lithobates catesbeianus'],
      ['Common frog', 'Rana temporaria']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known frog or toad species from the order Anura.', names: [
      ['Red-eyed tree frog', 'Agalychnis callidryas'],
      ['Cane toad', 'Rhinella marina'],
      ['African clawed frog', 'Xenopus laevis']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct accepted frog species with a notable size, habitat, or appearance.', names: [
      ['Goliath frog', 'Conraua goliath'],
      ['Surinam toad', 'Pipa pipa'],
      ['Wood frog', 'Lithobates sylvaticus'],
      ['Golden poison frog', 'Phyllobates terribilis']
    ]},
    { score: 60, tier: 'RARE', note: 'A less familiar anuran species documented by the AMNH taxonomic reference.', names: [
      ['Purple frog', 'Nasikabatrachus sahyadrensis'],
      ['Vietnamese mossy frog', 'Theloderma corticale'],
      ["Darwin's frog", 'Rhinoderma darwinii'],
      ['Desert rain frog', 'Breviceps macrops'],
      ["Wallace's flying frog", 'Rhacophorus nigropalmatus'],
      ['Panamanian golden frog', 'Atelopus zeteki']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level accepted frog or toad species; common-name and binomial aliases identify the same taxon.', names: [
      ['Kihansi spray toad', 'Nectophrynoides asperginis'],
      ['Malagasy rainbow frog', 'Scaphiophryne gottlebei'],
      ['Bornean flat-headed frog', 'Barbourula kalimantanensis'],
      ["Budgett's frog", 'Lepidobatrachus laevis'],
      ['Strawberry poison-dart frog', 'Oophaga pumilio'],
      ['Glass frog', 'Hyalinobatrachium fleischmanni'],
      ['Lemur leaf frog', 'Agalychnis lemur'],
      ['African bullfrog', 'Pyxicephalus adspersus'],
      ['Common midwife toad', 'Alytes obstetricans'],
      ['Fire-bellied toad', 'Bombina bombina'],
      ['Golden mantella', 'Mantella aurantiaca'],
      ['Surinam horned frog', 'Ceratophrys cornuta'],
      ['Paradoxical frog', 'Pseudis paradoxa'],
      ['Common coquí', 'Eleutherodactylus coqui']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A highly threatened, narrowly distributed harlequin frog species.', names: [
      ['Jambato harlequin frog', 'Atelopus ignescens']
    ]}
  ),

  'snake-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A globally familiar living snake species.', names: [
      ['King cobra', 'Ophiophagus hannah'],
      ['Reticulated python', 'Malayopython reticulatus']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known snake species with a distinctive common name.', names: [
      ['Black mamba', 'Dendroaspis polylepis'],
      ['Boa constrictor', 'Boa constrictor'],
      ['Green anaconda', 'Eunectes murinus']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized living species in the Serpentes database.', names: [
      ['Inland taipan', 'Oxyuranus microlepidotus'],
      ['Corn snake', 'Pantherophis guttatus'],
      ['Common garter snake', 'Thamnophis sirtalis'],
      ['Puff adder', 'Bitis arietans']
    ]},
    { score: 60, tier: 'RARE', note: 'A less frequently named snake species, accepted in The Reptile Database.', names: [
      ['Gaboon viper', 'Bitis gabonica'],
      ['Common death adder', 'Acanthophis antarcticus'],
      ['Boomslang', 'Dispholidus typus'],
      ['Mangrove snake', 'Boiga dendrophila'],
      ['Tentacled snake', 'Erpeton tentaculatum'],
      ['Yellow-bellied sea snake', 'Hydrophis platurus']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level living snake species from a less familiar lineage or region.', names: [
      ['Aruba Island rattlesnake', 'Crotalus unicolor'],
      ['Saint Lucia racer', 'Erythrolamprus ornatus'],
      ['Indian egg-eater', 'Elachistodon westermanni'],
      ['Elephant trunk snake', 'Acrochordus javanicus'],
      ['Rhinoceros viper', 'Bitis nasicornis'],
      ['Eyelash viper', 'Bothriechis schlegelii'],
      ['Madagascar leaf-nosed snake', 'Langaha madagascariensis'],
      ['Paradise tree snake', 'Chrysopelea paradisi'],
      ['Aesculapian snake', 'Zamenis longissimus'],
      ['Montpellier snake', 'Malpolon monspessulanus'],
      ['European adder', 'Vipera berus'],
      ['Ring-necked snake', 'Diadophis punctatus'],
      ['Eastern indigo snake', 'Drymarchon couperi'],
      ['Smooth green snake', 'Opheodrys vernalis']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An exceptionally obscure, formally described snake genus and species.', names: [
      'Xenophidion schaeferi'
    ]}
  ),

  'swallowtail-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar swallowtail species in the family Papilionidae.', names: [
      ['Old World swallowtail', 'Papilio machaon'],
      ['Black swallowtail', 'Papilio polyxenes']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized swallowtail or birdwing species.', names: [
      ['Eastern tiger swallowtail', 'Papilio glaucus'],
      ['Giant swallowtail', 'Papilio cresphontes'],
      ['Pipevine swallowtail', 'Battus philenor']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An accepted Papilionidae species beyond the best-known examples.', names: [
      ['Zebra swallowtail', 'Eurytides marcellus'],
      ['Common Mormon', 'Papilio polytes'],
      ['Ulysses butterfly', 'Papilio ulysses'],
      ['Apollo butterfly', 'Parnassius apollo']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named swallowtail species recorded in the family catalogue.', names: [
      ["Queen Alexandra's birdwing", 'Ornithoptera alexandrae'],
      ["Rajah Brooke's birdwing", 'Trogonoptera brookiana'],
      ['Bhutan glory', 'Bhutanitis lidderdalii'],
      ['Kaiser-i-Hind', 'Teinopalpus imperialis'],
      ['Lime butterfly', 'Papilio demoleus'],
      ['Five-bar swordtail', 'Graphium antiphates']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level species in Papilionidae, including parnassians and tropical birdwings.', names: [
      ['Canadian tiger swallowtail', 'Papilio canadensis'],
      ['Western tiger swallowtail', 'Papilio rutulus'],
      ['Two-tailed swallowtail', 'Papilio multicaudata'],
      ['Spicebush swallowtail', 'Papilio troilus'],
      ['Palamedes swallowtail', 'Papilio palamedes'],
      ['Homerus swallowtail', 'Papilio homerus'],
      ['Green-banded peacock', 'Papilio blumei'],
      ['Great Mormon', 'Papilio memnon'],
      ['Common birdwing', 'Troides helena'],
      ['Golden birdwing', 'Troides aeacus'],
      ['Malay birdwing', 'Troides amphrysus'],
      ['Clouded Apollo', 'Parnassius mnemosyne'],
      ['Rocky Mountain parnassian', 'Parnassius smintheus'],
      ['Scarce swallowtail', 'Iphiclides podalirius']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A rare monotypic swallowtail lineage represented by one living species.', names: [
      ['Primitive swallowtail', 'Baronia brevicornis']
    ]}
  ),

  'orchid-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar accepted orchid species in Orchidaceae.', names: [
      ['Moon orchid', 'Phalaenopsis amabilis'],
      ['Vanilla orchid', 'Vanilla planifolia']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely cultivated or recognized orchid species.', names: [
      ['Cattleya labiata', 'Cattleya labiata'],
      ['Noble dendrobium', 'Dendrobium nobile'],
      ['Blue vanda', 'Vanda coerulea']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'An accepted orchid species with a distinctive flower or growth form.', names: [
      ['Lady orchid', 'Orchis purpurea'],
      ['Bee orchid', 'Ophrys apifera'],
      ['White egret orchid', 'Habenaria radiata'],
      ['Monkey orchid', 'Dracula simia']
    ]},
    { score: 60, tier: 'RARE', note: 'A less familiar accepted orchid species in the World Orchids checklist.', names: [
      ["Rothschild's slipper orchid", 'Paphiopedilum rothschildianum'],
      ['Star of Bethlehem orchid', 'Angraecum sesquipedale'],
      ['Giant orchid', 'Grammatophyllum speciosum'],
      ['Snow orchid', 'Coelogyne cristata'],
      ['Tiger orchid', 'Stanhopea tigrina'],
      ['Foxtail orchid', 'Rhynchostylis retusa']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level accepted orchid species; hybrid names and synonyms are excluded.', names: [
      ['Medusa bulbophyllum', 'Bulbophyllum medusae'],
      ['Echinolabium bulbophyllum', 'Bulbophyllum echinolabium'],
      ['Phalaenopsis bulbophyllum', 'Bulbophyllum phalaenopsis'],
      ['Bucket orchid', 'Coryanthes speciosa'],
      ['Catasetum macrocarpum', 'Catasetum macrocarpum'],
      ['Kovach slipper orchid', 'Phragmipedium kovachii'],
      ['Veitch masdevallia', 'Masdevallia veitchiana'],
      ['Spectabilis miltonia', 'Miltonia spectabilis'],
      ['Nodosa brassavola', 'Brassavola nodosa'],
      ['Retusa aerides', 'Aerides odorata'],
      ['Plicate spathoglottis', 'Spathoglottis plicata'],
      ['Anceps laelia', 'Laelia anceps'],
      ['Tigrina stanhopea', 'Stanhopea tigrina'],
      ['Kingianum dendrobium', 'Dendrobium kingianum']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A striking, narrowly distributed orchid species described from Colombia in the 2010s.', names: [
      ['Devil orchid', 'Telipogon diabolicus']
    ]}
  ),

  'coral-species': records(
    { score: 10, tier: 'BACKGROUND', note: 'A familiar reef-building coral species recorded in the Coral Trait Database.', names: [
      ['Elkhorn coral', 'Acropora palmata'],
      ['Staghorn coral', 'Acropora cervicornis']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A recognizable coral species with a well-established scientific name.', names: [
      ['Cauliflower coral', 'Pocillopora damicornis'],
      ['Lobe coral', 'Porites lobata'],
      ['Great star coral', 'Montastraea cavernosa']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct species-level coral taxon in the database.', names: [
      ['Mountainous star coral', 'Orbicella faveolata'],
      ['Massive starlet coral', 'Siderastrea siderea'],
      ['Galaxy coral', 'Galaxea fascicularis'],
      ['Orange cup coral', 'Tubastraea coccinea']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named coral species with a documented database record.', names: [
      ['Acanthastrea echinata', 'Acanthastrea echinata'],
      ['Acanthastrea hemprichii', 'Acanthastrea hemprichii'],
      ['Heliofungia actiniformis', 'Heliofungia actiniformis'],
      ["Jardine's bush coral", 'Catalaphyllia jardinei'],
      ['Cactus coral', 'Pavona cactus'],
      ['Leptastrea transversa', 'Leptastrea transversa']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level coral species in the Coral Trait Database, including deep-water and less familiar taxa.', names: [
      ['Acropora millepora', 'Acropora millepora'],
      ['Acropora hyacinthus', 'Acropora hyacinthus'],
      ['Acropora tenuis', 'Acropora tenuis'],
      ['Porites lutea', 'Porites lutea'],
      ['Porites astreoides', 'Porites astreoides'],
      ['Pocillopora verrucosa', 'Pocillopora verrucosa'],
      ['Goniopora stokesi', 'Goniopora stokesi'],
      ['Fimbriaphyllia paradivisa', 'Fimbriaphyllia paradivisa'],
      ['Desmophyllum dianthus', 'Desmophyllum dianthus'],
      ['Red coral', 'Corallium rubrum'],
      ['Bubblegum coral', 'Paragorgia arborea'],
      ['Primnoa resedaeformis', 'Primnoa resedaeformis'],
      ['Venus sea fan', 'Gorgonia ventalina'],
      ['Acanthastrea regularis', 'Acanthastrea regularis']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure species-level coral entry visible in the database catalogue.', names: [
      'Acanthacis austera'
    ]}
  ),

  'ich-heritage-element': records(
    { score: 10, tier: 'BACKGROUND', note: 'A highly recognizable element formally inscribed by UNESCO as intangible cultural heritage.', names: [
      ['Flamenco', 'Flamenco'],
      ['Tango', 'Argentine tango']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely known UNESCO-inscribed cultural practice or tradition.', names: [
      ['Kumbh Mela', 'Kumbh Mela'],
      ['Yoga', 'Yoga'],
      ['Washoku, traditional dietary cultures of the Japanese', 'Washoku']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A formally inscribed living tradition with an established UNESCO element title.', names: [
      ['Reggae music of Jamaica', 'Reggae'],
      ['Mariachi, string music, song and trumpet', 'Mariachi'],
      ['Capoeira circle', 'Capoeira'],
      ['Art of Neapolitan pizzaiuolo', 'Neapolitan pizza-making']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly recalled UNESCO intangible heritage element.', names: [
      ['Craftsmanship of French baguette bread', 'French baguette craftsmanship'],
      ['Turkish coffee culture and tradition', 'Turkish coffee'],
      ['Traditional Mexican cuisine - ancestral, ongoing community culture, the Michoacán paradigm', 'Traditional Mexican cuisine'],
      ['Falconry, a living human heritage', 'Falconry'],
      ['Belgian beer culture', 'Beer culture in Belgium'],
      ['Kimjang, making and sharing kimchi in the Republic of Korea', 'Kimjang']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level element from UNESCO’s Representative or safeguarding lists.', names: [
      ['Georgian polyphonic singing', 'Georgian polyphony'],
      ['Traditional art of Khöömei in Mongolia', 'Khöömei'],
      ['Angklung', 'Indonesian angklung'],
      ['Gamelan', 'Indonesian gamelan'],
      ['Turkish art of Ebru', 'Ebru'],
      ['Batik', 'Indonesian batik'],
      ['Peking opera', 'Beijing opera'],
      ['Noh theatre', 'Japanese Noh'],
      ['Kabuki theatre', 'Kabuki'],
      ['Gnawa', 'Gnawa music'],
      ['Samba de Roda of the Recôncavo of Bahia', 'Samba de Roda'],
      ['Fado, urban popular song of Portugal', 'Fado'],
      ['Irish harping', 'Harping'],
      ['Yama, Hoko, Yatai, float festivals in Japan', 'Japanese float festivals']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure Cypriot oral-poetic practice inscribed by UNESCO.', names: [
      ['Tsiattista poetic duelling', 'Tsiattista']
    ]}
  ),

  'biosphere-reserve': records(
    { score: 10, tier: 'BACKGROUND', note: 'A highly recognizable reserve in UNESCO’s World Network of Biosphere Reserves.', names: [
      ['Yellowstone - Grand Teton', 'Yellowstone-Grand Teton'],
      ['Galápagos', 'Galapagos Islands']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A prominent UNESCO-designated biosphere reserve.', names: [
      ['Doñana', 'Donana'],
      ['Sian Ka’an', 'Sian Kaan'],
      ['Central Amazon']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A current biosphere reserve listed by UNESCO’s Man and the Biosphere Programme.', names: [
      ['Maya', 'Maya Biosphere Reserve'],
      ['Bosawas', 'Bosawás'],
      ['Darién', 'Darien'],
      ['Mata Atlântica', 'Atlantic Forest']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named reserve in the official UNESCO MAB list.', names: [
      ['Nilgiri', 'Nilgiri Biosphere Reserve'],
      ['Nanda Devi', 'Nanda Devi Biosphere Reserve'],
      ['Wuyishan', 'Wuyi Mountain'],
      ['Xishuangbanna', 'Xishuangbanna Biosphere Reserve'],
      ['Wolong', 'Wolong Biosphere Reserve'],
      ['Yancheng', 'Yancheng Biosphere Reserve']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more obscure reserve with a current UNESCO MAB designation.', names: [
      ['Yakushima and Kuchinoerabu Jima', 'Yakushima and Kuchinoerabujima'],
      ['Ogasawara Islands', 'Ogasawara'],
      ['Shiga Highland', 'Shiga Kogen'],
      ['Mount Hakusan', 'Hakusan'],
      ['Central Balkan', 'Central Balkan Biosphere Reserve'],
      ['Rhön', 'Rhön Biosphere Reserve'],
      ['Black Forest', 'Schwarzwald'],
      ['Białowieża', 'Bialowieza'],
      ['Camargue', 'Camargue Biosphere Reserve'],
      ['Cévennes', 'Cevennes'],
      ['Menorca', 'Menorca Biosphere Reserve'],
      ['Lanzarote', 'Lanzarote Biosphere Reserve'],
      ['Urdaibai', 'Urdaibai Biosphere Reserve'],
      ['Clayoquot Sound', 'Clayoquot Sound Biosphere Reserve']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A recently designated, lesser-known biosphere reserve in the current UNESCO register.', names: [
      ['Anywaa Forest', 'Anywaa Forest Biosphere Reserve']
    ]}
  ),

  'unesco-creative-city': records(
    { score: 10, tier: 'BACKGROUND', note: 'A globally familiar member city in UNESCO’s Creative Cities Network.', names: [
      ['Paris', 'Paris, City of Literature'],
      ['Edinburgh', 'Edinburgh, City of Literature']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known UNESCO Creative City in its designated field.', names: [
      ['Melbourne', 'Melbourne, City of Literature'],
      ['Dublin', 'Dublin, City of Literature'],
      ['Glasgow', 'Glasgow, City of Music']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A current member city in the UNESCO Creative Cities Network.', names: [
      ['Bologna', 'Bologna, City of Music'],
      ['Kingston', 'Kingston, City of Music'],
      ['Bogotá', 'Bogota'],
      ['Chengdu', 'Chengdu, City of Gastronomy']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named UNESCO Creative City with a designated creative field.', names: [
      ['Bradford', 'Bradford, City of Film'],
      ['Graz', 'Graz, City of Design'],
      ['Paducah', 'Paducah, City of Crafts and Folk Art'],
      ['Jaipur', 'Jaipur, City of Crafts and Folk Art'],
      ['Hamamatsu', 'Hamamatsu, City of Music'],
      ['Bergen', 'Bergen, City of Gastronomy']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level member city on UNESCO’s official Creative Cities list.', names: [
      ['Fabriano', 'Fabriano, City of Crafts and Folk Art'],
      ['Santa Fe', 'Santa Fe, City of Crafts and Folk Art'],
      ['Jingdezhen', 'Jingdezhen, City of Crafts and Folk Art'],
      ['Aswan', 'Aswan, City of Crafts and Folk Art'],
      ['Isfahan', 'Isfahan, City of Crafts and Folk Art'],
      ['Kanazawa', 'Kanazawa, City of Crafts and Folk Art'],
      ['Baguio', 'Baguio, City of Crafts and Folk Art'],
      ['Paducah', 'Paducah, City of Crafts and Folk Art'],
      ['Dénia', 'Denia, City of Gastronomy'],
      ['Jeonju', 'Jeonju, City of Gastronomy'],
      ['Östersund', 'Ostersund, City of Gastronomy'],
      ['Saint-Étienne', 'Saint-Etienne, City of Design'],
      ['Mannheim', 'Mannheim, City of Music'],
      ['Norrköping', 'Norrkoping, City of Music']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A newly designated and less widely known member of the 2025 UNESCO Creative Cities cohort.', names: [
      ['Kahramanmaraş', 'Kahramanmaras']
    ]}
  ),

  'confirmed-exoplanet': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous confirmed exoplanet listed by NASA.', names: [
      ['Proxima Centauri b', 'Proxima b'],
      ['51 Pegasi b', '51 Peg b']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely discussed confirmed planet in the NASA Exoplanet Archive.', names: [
      ['TRAPPIST-1 e', 'TRAPPIST 1 e'],
      ['Kepler-22 b', 'Kepler 22b'],
      ['HD 209458 b', 'Osiris']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A confirmed exoplanet with a recognized discovery or host-star designation.', names: [
      ['Kepler-186 f', 'Kepler 186f'],
      ['Kepler-452 b', 'Kepler 452b'],
      ['55 Cancri e', 'Janssen'],
      ['K2-18 b', 'K2 18b']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly recalled confirmed exoplanet in NASA’s Planetary Systems data.', names: [
      ['LHS 1140 b', 'LHS1140 b'],
      ['GJ 1214 b', 'Gliese 1214 b'],
      ['WASP-12 b', 'WASP 12b'],
      ['WASP-39 b', 'WASP 39b'],
      ['HR 8799 b', 'HR8799 b'],
      ['TOI-700 d', 'TOI 700d']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level confirmed planet, often known mainly by its catalogue designation.', names: [
      ['Kepler-16 b', 'Kepler 16b'],
      ['Kepler-10 c', 'Kepler 10c'],
      ['Kepler-20 f', 'Kepler 20f'],
      ['WASP-17 b', 'WASP 17b'],
      ['WASP-18 b', 'WASP 18b'],
      ['WASP-121 b', 'WASP 121b'],
      ['WASP-107 b', 'WASP 107b'],
      ['WASP-43 b', 'WASP 43b'],
      ['WASP-76 b', 'WASP 76b'],
      ['HAT-P-7 b', 'HAT P 7b'],
      ['HAT-P-11 b', 'HAT P 11b'],
      ['GJ 436 b', 'Gliese 436 b'],
      ['TOI-1452 b', 'TOI 1452b'],
      ['51 Eridani b', '51 Eri b']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A confirmed microlensing planet with a specialist catalogue-style designation.', names: [
      ['OGLE-2005-BLG-390L b', 'OGLE 2005 BLG 390L b']
    ]}
  ),

  'lunar-crater': records(
    { score: 10, tier: 'BACKGROUND', note: 'A prominent crater with an official IAU-approved lunar name.', names: [
      ['Tycho', 'Tycho crater'],
      ['Copernicus', 'Copernicus crater']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known lunar impact crater recorded in the IAU/USGS gazetteer.', names: [
      ['Kepler', 'Kepler crater'],
      ['Plato', 'Plato crater'],
      ['Aristarchus', 'Aristarchus crater']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized lunar crater name rather than a mare or other surface feature.', names: [
      ['Clavius', 'Clavius crater'],
      ['Ptolemaeus', 'Ptolemaeus crater'],
      ['Archimedes', 'Archimedes crater'],
      ['Eratosthenes', 'Eratosthenes crater']
    ]},
    { score: 60, tier: 'RARE', note: 'A less frequently named crater in the official lunar nomenclature.', names: [
      ['Gassendi', 'Gassendi crater'],
      ['Langrenus', 'Langrenus crater'],
      ['Petavius', 'Petavius crater'],
      ['Posidonius', 'Posidonius crater'],
      ['Theophilus', 'Theophilus crater'],
      ['Cyrillus', 'Cyrillus crater']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level IAU-approved lunar crater name.', names: [
      ['Catharina', 'Catharina crater'],
      ['Alphonsus', 'Alphonsus crater'],
      ['Arzachel', 'Arzachel crater'],
      ['Hipparchus', 'Hipparchus crater'],
      ['Albategnius', 'Albategnius crater'],
      ['Maurolycus', 'Maurolycus crater'],
      ['Schickard', 'Schickard crater'],
      ['Grimaldi', 'Grimaldi crater'],
      ['Bailly', 'Bailly crater'],
      ['Moretus', 'Moretus crater'],
      ['Newton', 'Newton crater'],
      ['Cabeus', 'Cabeus crater'],
      ['Shackleton', 'Shackleton crater'],
      ['Amundsen', 'Amundsen crater']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An obscure officially named crater near the lunar south pole.', names: [
      ['Faustini', 'Faustini crater']
    ]}
  ),

  'wine-grape-variety': records(
    { score: 10, tier: 'BACKGROUND', note: 'A globally familiar wine-grape cultivar documented in viticultural references.', names: [
      ['Cabernet Sauvignon', 'Cabernet'],
      ['Chardonnay', 'Chardonnay grape']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely planted wine-grape variety with an established international name.', names: [
      ['Merlot', 'Merlot grape'],
      ['Pinot Noir', 'Pinot noir grape'],
      ['Sauvignon Blanc', 'Sauvignon']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct cultivar documented for wine production in global grape references.', names: [
      ['Tempranillo', 'Tinta Roriz', 'Aragonez'],
      ['Riesling', 'Riesling grape'],
      ['Sangiovese', 'Sangiovese grape'],
      ['Nebbiolo', 'Nebbiolo grape']
    ]},
    { score: 60, tier: 'RARE', note: 'A recognized wine grape that is less common outside its traditional growing region.', names: [
      ['Aglianico', 'Aglianico grape'],
      ['Assyrtiko', 'Assyrtiko grape'],
      ['Furmint', 'Furmint grape'],
      ['Xinomavro', 'Xinomavro grape'],
      ['Touriga Nacional', 'Touriga Nacional grape'],
      ['Rkatsiteli', 'Rkatsiteli grape']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less familiar wine-grape cultivar documented by VIVC or the University of Adelaide database.', names: [
      ['Bobal', 'Bobal grape'],
      ['Airén', 'Airen'],
      ['Trebbiano Toscano', 'Ugni Blanc'],
      ['Macabeo', 'Viura'],
      ['Mazuelo', 'Carignan', 'Cariñena'],
      ['Cinsault', 'Cinsaut'],
      ['Tannat', 'Tannat grape'],
      ['Saperavi', 'Saperavi grape'],
      ['Mourvèdre', 'Monastrell'],
      ['Carménère', 'Carmenere'],
      ['Petit Verdot', 'Petit verdot grape'],
      ['Grüner Veltliner', 'Gruner Veltliner'],
      ['Glera', 'Prosecco grape'],
      ['Corvina', 'Corvina Veronese']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A rare wine-grape cultivar with a documented VIVC identity and limited international recognition.', names: [
      ['Krasnostop Zolotovsky', 'Krasnostop']
    ]}
  ),

  'protected-eu-cheese': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous cheese whose name is protected by an EU PDO or PGI registration.', names: [
      ['Parmigiano Reggiano', 'Parmesan'],
      ['Roquefort', 'Roquefort cheese']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized European cheese with protected EU geographical status.', names: [
      ['Feta', 'Greek feta'],
      ['Gorgonzola', 'Gorgonzola cheese'],
      ['Queso Manchego', 'Manchego']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A registered PDO or PGI cheese name in the EU geographical-indications register.', names: [
      ['Comté', 'Comte'],
      ['Grana Padano', 'Grana Padano cheese'],
      ['Cabrales', 'Queso de Cabrales'],
      ['Idiazabal', 'Queso Idiazabal']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named protected regional cheese.', names: [
      ['Queijo Serra da Estrela', 'Serra da Estrela'],
      ['Queijo São Jorge', 'Sao Jorge cheese'],
      ['Torta del Casar', 'Torta del Casar cheese'],
      ['Queso de Murcia', 'Murcia cheese'],
      ['Ossau-Iraty', 'Ossau Iraty'],
      ['Beaufort', 'Beaufort cheese']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level cheese name registered as an EU PDO or PGI.', names: [
      ['Castelmagno', 'Castelmagno cheese'],
      ['Fiore Sardo', 'Fiore Sardo PDO'],
      ['Raschera', 'Raschera cheese'],
      ['Robiola di Roccaverano', 'Roccaverano'],
      ['Formaggio di Fossa di Sogliano', 'Fossa di Sogliano'],
      ['Caciocavallo Silano', 'Caciocavallo'],
      ['Canestrato Pugliese', 'Canestrato'],
      ['Queijo de Azeitão', 'Azeitao cheese'],
      ['Queijo de Serpa', 'Serpa cheese'],
      ['Queso Zamorano', 'Zamorano'],
      ['Queso de Valdeón', 'Valdeon'],
      ['Queso Tetilla', 'Tetilla'],
      ['Morbier', 'Morbier cheese'],
      ['Époisses', 'Epoisses'],
      ['Livarot', 'Livarot cheese']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A particularly obscure registered regional cheese whose protected name appears in the EU register.', names: [
      ['Formaggella del Luinese', 'Luinese cheese']
    ]}
  ),

  'roller-coaster': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous roller coaster with its own RCDB ride record.', names: [
      ['Steel Vengeance', 'Steel Vengeance coaster'],
      ['Space Mountain', 'Space Mountain roller coaster']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely known roller coaster listed in RCDB.', names: [
      ['Millennium Force', 'Millennium Force coaster'],
      ['The Beast', 'The Beast coaster'],
      ['Fury 325', 'Fury 325 coaster']
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A distinct named coaster ride recorded in the Roller Coaster DataBase.', names: [
      ['Iron Gwazi', 'Iron Gwazi coaster'],
      ['VelociCoaster', 'Jurassic World VelociCoaster'],
      ['El Toro', 'El Toro coaster'],
      ['The Smiler', 'The Smiler coaster']
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named coaster with a distinct RCDB entry.', names: [
      ['Taron', 'Taron coaster'],
      ['Black Mamba', 'Black Mamba coaster'],
      ['Expedition GeForce', 'Expedition GeForce coaster'],
      ['Shambhala', 'Shambhala coaster'],
      ['Zadra', 'Zadra coaster'],
      ['Hakugei', 'Hakugei coaster']
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist-level roller coaster record from an international amusement park.', names: [
      ['Untamed', 'Untamed coaster'],
      ['Lost Gravity', 'Lost Gravity coaster'],
      ['Kondaa', 'Kondaa coaster'],
      ['F.L.Y.', 'FLY coaster'],
      ['Wodan Timburcoaster', 'Wodan'],
      ['Balder', 'Balder coaster'],
      ['Wildfire', 'Wildfire Kolmarden'],
      ['Toutatis', 'Toutatis coaster'],
      ['Oziris', 'Oziris coaster'],
      ['Red Force', 'Red Force coaster'],
      ['Eejanaika', 'Eejanaika coaster'],
      ['Takabisha', 'Takabisha coaster'],
      ['Thunder Dolphin', 'Thunder Dolphin coaster'],
      ['The Flying Dinosaur', 'Flying Dinosaur'],
      ['Voyage', 'The Voyage']
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A less widely known named coaster with a dedicated RCDB record.', names: [
      ['Anubis The Ride', 'Anubis']
    ]}
  )
};
