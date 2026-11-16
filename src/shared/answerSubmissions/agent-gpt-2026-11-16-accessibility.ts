import type { AnswerRecord } from '../answerBank.js';

/**
 * Accessibility answer contribution for the original ten Phase A questions.
 *
 * Research references (checked 2026-11-15/16; living pages can change):
 * - French legal official-language country list (26 sovereign countries):
 *   https://playgeography.app/languages/french-speaking-countries/
 * - PUMA's cat mark and company history:
 *   https://www.about.puma.com/en/puma/puma-timeline
 * - Careers Wales, examples of uniformed occupations:
 *   https://careerswales.gov.wales/my-future/looking-for-work/jobs-in-different-workplaces/working-in-uniform
 * - Time-travel film reference list:
 *   https://cinesort.com/subgenres/time-travel/essential-films
 * - Naruto character bios:
 *   https://disney.go.com/xd/naruto/cds/characters/
 * - Official One Piece live-action character profiles:
 *   https://live-action.onepiece-base.com/character/
 * - Programming-language references:
 *   https://www.python.org/
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * - University of Delaware Cooperative Extension, culinary herbs and spices:
 *   https://www.udel.edu/academics/colleges/canr/cooperative-extension/fact-sheets/using-herbs-and-spices/
 * - McCormick Science Institute, culinary spices:
 *   https://www.mccormickscienceinstitute.com/resources/culinary-spices
 * - Transboundary river reference:
 *   https://unece.org/environment-policy/water/areas-work-convention/transboundary-water-cooperation
 *
 * The 10-point groups intentionally contain answers that should be familiar
 * to ordinary players. Higher tiers add progressively less obvious but valid
 * answers. Alternative names are aliases, not separate canonical answers.
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

export const ANSWER_SUBMISSIONS_ACCESSIBILITY: Record<string, AnswerRecord[]> = {
  'french-official-country': records(
    { score: 10, tier: 'BACKGROUND', note: 'A country where French has clear national-level official status and is familiar to many players.', names: [
      'France', 'Canada', 'Belgium'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known country where French is legally an official or co-official language.', names: [
      'Switzerland', 'Haiti', 'Luxembourg', 'Monaco'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A country where French has national legal status but may be less obvious to casual players.', names: [
      'Senegal', 'Cameroon', 'Democratic Republic of the Congo', 'Republic of the Congo',
      'Côte d’Ivoire', 'Madagascar'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named country with French as a national official language.', names: [
      'Benin', 'Burundi', 'Central African Republic', 'Chad', 'Comoros',
      'Djibouti', 'Rwanda'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A comparatively less expected country where French still has national official status.', names: [
      'Equatorial Guinea', 'Gabon', 'Guinea', 'Seychelles', 'Togo'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'An especially unexpected but valid country from the current legal-status list.', names: [
      'Vanuatu'
    ]}
  ),

  'animal-logo-brand': records(
    { score: 10, tier: 'BACKGROUND', note: 'A globally familiar brand whose primary logo visibly features an animal.', names: [
      'Puma', 'Lacoste', 'Ferrari', 'Red Bull', 'WWF'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A widely recognized brand with an animal as a central logo element.', names: [
      'Jaguar', 'Peugeot', 'Playboy', 'Ralph Lauren', 'Porsche'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable brand with an animal mark that is somewhat less immediately recalled.', names: [
      'Lamborghini', 'NBC', 'Linux', 'John Deere', 'Aflac', 'Firefox',
      'Qantas', 'Bacardi'
    ]},
    { score: 60, tier: 'RARE', note: 'A legitimate animal-logo brand that fewer casual players may think of.', names: [
      'Alfa Romeo', 'Abarth', 'Razer', 'Evernote', 'Duolingo',
      'MGM', 'Penguin Random House'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly recalled company or product brand with an animal in its official mark.', names: [
      'Hollister', 'Le Coq Sportif', 'Fjällräven', 'Maison Kitsuné',
      'The Laughing Cow', 'Greyhound'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure animal-logo brand with a distinct official mark.', names: [
      'BAPE'
    ]}
  ),

  'uniformed-occupation': records(
    { score: 10, tier: 'BACKGROUND', note: 'An occupation where a recognizable uniform is standard and familiar to most people.', names: [
      'Police officer', 'Firefighter', 'Nurse', 'Soldier', 'Chef', 'Pilot'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A common occupation in which standardized work clothing is customary.', names: [
      'Paramedic', 'Flight attendant', 'Lifeguard', 'Postal worker',
      'Security guard', 'Bus driver', 'Waiter'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A familiar job whose uniform may be more specific to the workplace.', names: [
      'Train conductor', 'Mechanic', 'Housekeeper', 'Barista',
      'Delivery driver', 'Supermarket worker', 'Restaurant host', 'School crossing guard'
    ]},
    { score: 60, tier: 'RARE', note: 'A specialized role with customary identifying workwear or a formal uniform.', names: [
      'Prison officer', 'Park ranger', 'Jockey', 'Sports referee',
      'Military nurse', 'Air traffic control officer', 'Customs officer'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named role with a standardized occupational uniform.', names: [
      'Beekeeper', 'Ship captain', 'Railway signal operator',
      'Theatre usher', 'Bellhop', 'Coast guard'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A less obvious role whose official work dress is distinctive.', names: [
      'Court bailiff'
    ]}
  ),

  'time-travel-film': records(
    { score: 10, tier: 'BACKGROUND', note: 'A hugely familiar film in which time travel or a time loop drives the story.', names: [
      'Back to the Future', 'Groundhog Day', 'The Terminator'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A well-known time-travel film recognized by a broad movie audience.', names: [
      'Avengers: Endgame', 'Bill & Ted’s Excellent Adventure',
      'Edge of Tomorrow', 'The Time Machine', '12 Monkeys', 'About Time'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A popular but less immediately obvious film built around time travel or a time loop.', names: [
      'Looper', 'The Butterfly Effect', 'Source Code', 'Palm Springs',
      'Hot Tub Time Machine', 'The Adam Project', 'X-Men: Days of Future Past',
      'Tenet', 'Predestination', 'Time Bandits'
    ]},
    { score: 60, tier: 'RARE', note: 'A recognized time-travel film less likely to be the first answer from a casual player.', names: [
      'The Final Countdown', 'Frequency', 'Somewhere in Time',
      'The Girl Who Leapt Through Time', 'Your Name', 'Happy Death Day',
      'Triangle', 'Boss Level', 'The Map of Tiny Perfect Things'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist or cult time-travel film with a clear time-travel or looping plot device.', names: [
      'Primer', 'Timecrimes', 'The Endless', 'The Jacket',
      'Beyond the Infinite Two Minutes', 'The Navigator: A Medieval Odyssey'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure feature film whose central story depends on time travel.', names: [
      'The Infinite Man'
    ]}
  ),

  'naruto-character': records(
    { score: 10, tier: 'BACKGROUND', note: 'A central character whose name is familiar even to many casual viewers.', names: [
      'Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake',
      'Gaara', 'Hinata Hyuga'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A prominent character from the main cast or a widely known supporting role.', names: [
      'Itachi Uchiha', 'Shikamaru Nara', 'Rock Lee', 'Jiraiya',
      'Tsunade', 'Orochimaru', 'Neji Hyuga', 'Might Guy'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable supporting character from the official manga or anime.', names: [
      'Kiba Inuzuka', 'Shino Aburame', 'Temari', 'Kankuro',
      'Konohamaru Sarutobi', 'Sai', 'Kisame Hoshigaki',
      'Deidara', 'Hidan', 'Kakuzu', 'Pain', 'Konan'
    ]},
    { score: 60, tier: 'RARE', note: 'A named character with a meaningful role but less general-audience recognition.', names: [
      'Yamato', 'Anko Mitarashi', 'Iruka Umino', 'Hiruzen Sarutobi',
      'Minato Namikaze', 'Kushina Uzumaki', 'Tenten',
      'Chiyo', 'Sasori', 'Zabuza Momochi', 'Haku'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized named character from the official Naruto or Boruto franchise.', names: [
      'Shisui Uchiha', 'Kurenai Yuhi', 'Asuma Sarutobi',
      'Darui', 'Mei Terumi', 'Onoki',
      'Killer B', 'Suigetsu Hozuki', 'Jugo', 'Karin'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but named official franchise character.', names: [
      'Aoba Yamashiro'
    ]}
  ),

  'one-piece-character': records(
    { score: 10, tier: 'BACKGROUND', note: 'A central Straw Hat or iconic character familiar to a broad audience.', names: [
      'Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Sanji', 'Usopp', 'Tony Tony Chopper'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A prominent Straw Hat or widely recognized character.', names: [
      'Nico Robin', 'Franky', 'Brook', 'Jinbe', 'Shanks',
      'Buggy', 'Portgas D. Ace', 'Sabo'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognizable character with a major role in one or more story arcs.', names: [
      ['Trafalgar D. Water Law', 'Trafalgar Law'], 'Boa Hancock', 'Crocodile',
      'Dracule Mihawk', 'Smoker', 'Tashigi', 'Donquixote Doflamingo',
      'Rob Lucci', 'Bartolomeo', 'Bon Clay', 'Eustass Kid'
    ]},
    { score: 60, tier: 'RARE', note: 'A named character who is less likely to be recalled by a casual viewer.', names: [
      'Perona', 'Gecko Moria', 'Enel', 'Jewelry Bonney',
      'Koby', 'Helmeppo', 'Arlong', 'Vivi Nefertari',
      'Bepo', 'Killer', 'Rebecca'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A more specialized character from the official One Piece story.', names: [
      'Dorry', 'Brogy', 'Wapol', 'Crocus', 'Igaram',
      'Hina', 'Foxy', 'Kaku', 'Kalifa', 'Bartholomew Kuma',
      'Charlotte Katakuri'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but named character in the official One Piece story.', names: [
      'Hamburg'
    ]}
  ),

  'video-game-company': records(
    { score: 10, tier: 'BACKGROUND', note: 'A household-name company or studio that develops or publishes video games.', names: [
      'Nintendo', 'Sony Interactive Entertainment', 'Microsoft',
      'Electronic Arts', 'Ubisoft', 'Sega'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major publisher or developer recognized by many players.', names: [
      'Capcom', 'Square Enix', 'Rockstar Games', 'Valve',
      'Epic Games', 'Activision', 'Bandai Namco'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A well-established developer or publisher that may be less obvious to casual players.', names: [
      'Konami', 'Take-Two Interactive', 'Blizzard Entertainment',
      'CD Projekt', 'FromSoftware', 'Mojang Studios',
      'Riot Games', 'Bethesda Softworks', 'Supercell', 'Zynga'
    ]},
    { score: 60, tier: 'RARE', note: 'A respected company or independent studio with a recognizable game catalog.', names: [
      'Naughty Dog', 'Insomniac Games', 'Remedy Entertainment',
      'Paradox Interactive', 'Gearbox Software', 'Larian Studios',
      'Koei Tecmo', 'Atlus', 'Bandai Namco Studios'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less widely known regional or specialist game developer or publisher.', names: [
      'PlatinumGames', 'Housemarque', 'Digital Extremes',
      'Arc System Works', 'Game Freak', 'Playdead',
      'Devolver Digital', 'Annapurna Interactive'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but established video-game studio.', names: [
      'Mouldy Toof Studios'
    ]}
  ),

  'programming-language': records(
    { score: 10, tier: 'BACKGROUND', note: 'A very widely known programming language used in education, software, or web development.', names: [
      'Python', 'Java', 'JavaScript', 'C++', 'C'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A common language that many people who have encountered programming recognize.', names: [
      'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Groovy'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A widely used but somewhat more specialized programming or query language.', names: [
      'Rust', 'TypeScript', 'R', 'SQL', 'MATLAB', 'Perl',
      'Visual Basic', 'Dart', 'Scala', 'Lua'
    ]},
    { score: 60, tier: 'RARE', note: 'A recognized language more often encountered in specialist or historical contexts.', names: [
      'Fortran', 'COBOL', 'Haskell', 'Lisp', 'Prolog',
      'Objective-C', 'Erlang', 'Elixir', 'F#', 'Julia'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A legitimate domain-specific, systems, or esoteric programming language.', names: [
      'Assembly language', 'Ada', 'Smalltalk', 'Scheme',
      'OCaml', 'Pascal', 'Delphi', 'Verilog', 'VHDL', 'Bash'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but documented programming language.', names: [
      'Malbolge'
    ]}
  ),

  'culinary-spice-plant': records(
    { score: 10, tier: 'BACKGROUND', note: 'A very familiar plant used to make a common culinary spice.', names: [
      ['Black pepper plant', 'Black pepper'], 'Ginger', 'Turmeric', ['Cinnamon tree', 'Cinnamon'], ['Chili pepper plant', 'Chili pepper']
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A commonly recognized spice-producing plant.', names: [
      'Cumin', 'Coriander', 'Clove tree', 'Nutmeg tree', 'Cardamom plant'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A recognized culinary spice plant that may be less immediately recalled.', names: [
      'Mustard plant', 'Saffron crocus', 'Allspice tree', 'Vanilla orchid',
      'Star anise tree', 'Fenugreek', 'Fennel'
    ]},
    { score: 60, tier: 'RARE', note: 'A less commonly named plant used as a culinary seasoning.', names: [
      'Sumac', 'Ajwain', 'Asafoetida plant', 'Nigella sativa',
      'Grains of paradise plant', 'Sichuan pepper tree', 'Curry leaf tree'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A specialist spice-producing plant with an established culinary use.', names: [
      'Long pepper vine', 'Mastic tree', 'Cubeb pepper vine',
      'Tasmanian pepperberry', 'Voatsiperifery pepper vine',
      'Melegueta pepper'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but documented culinary spice plant.', names: [
      'Dorrigo pepper tree'
    ]}
  ),

  'international-river': records(
    { score: 10, tier: 'BACKGROUND', note: 'A famous river that crosses or forms borders between multiple countries.', names: [
      'Nile', 'Amazon', 'Danube', 'Rhine', 'Mekong'
    ]},
    { score: 15, tier: 'FAMILIAR', note: 'A major international river known across multiple countries.', names: [
      'Zambezi', 'Ganges', 'Tigris', 'Euphrates', 'Congo', 'Rio Grande'
    ]},
    { score: 30, tier: 'UNCOMMON', note: 'A well-documented transboundary river that is less likely to be an immediate guess.', names: [
      'Indus', 'Amur', 'Oder', 'Elbe', 'Senegal River',
      'Niger River', 'St. Lawrence River'
    ]},
    { score: 60, tier: 'RARE', note: 'A regional international river with a multi-country course or boundary role.', names: [
      'Drina', 'Sava', 'Dniester', 'Limpopo', 'Paraná',
      'Brahmaputra', 'Orange River'
    ]},
    { score: 85, tier: 'DEEP CUT', note: 'A less commonly named river documented as crossing or bordering national boundaries.', names: [
      'Kura', 'Aras', 'Prut', 'Mura', 'Kootenai River',
      'Sutlej', 'Sepik River'
    ]},
    { score: 100, tier: 'SIGNAL FOUND', note: 'A comparatively obscure but valid international river.', names: [
      'Tumen River'
    ]}
  )
};
