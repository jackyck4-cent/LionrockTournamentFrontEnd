import { BoutsInfo } from "./bouts_info";

let ARRAY_16_BOUTS_INFOS = [    // 8 MATCHES
  {
    player_1: 'Hanamichi Sakuragi',
    player_2: 'Kicchou Fukuda',
    status: 'scheduled',
  },
  {
    player_1: 'Takenori Akagi',
    player_2: 'Jun Uozumi',
    status: 'scheduled',
  },
  {
    player_1: 'Kaede Rukawa',
    player_2: 'Akira Sendoh',
    status: 'in progress',
  },
  {
    player_1: 'Ryota Miyagi',
    player_2: 'Kenji Fujima',
    status: 'in progress',
  },
  {
    player_1: 'Hisashi Mitsui',
    player_2: 'Soichiro Jin',
    status: 'completed',
  },
  {
    player_1: 'Shinichi Maki',
    player_2: 'Toru Hanagata',
    status: 'scheduled',
  },
  {
    player_1: 'Kiminobu Kogure',
    player_2: 'Kazushi Hasegawa',
    status: 'scheduled',
  },
  {
    player_1: 'Kicchou Fukuda',
    player_2: 'Nobunaga Kiyota',
    status: 'scheduled',
  },
];


let ARRAY_QURATER_FINALS_BOUTS_INFOS = [  // 4 MATCHES
  {
    player_1: 'Germany',
    player_2: 'Japan',
    status: 'scheduled',
  },
  {
    player_1: 'Korea',
    player_2: 'Spain',
    status: 'in progress',
  },
  {
    player_1: 'Brazil',
    player_2: 'Canada',
    status: 'completed',
  },
  {
    player_1: 'France',
    player_2: 'England',
    status: 'scheduled',
  },
];

let ARRAY_SEMI_FINALS_BOUTS_INFOS = [  // 2 MATCHES
  {
    player_1: 'Golden State Warriors',
    player_2: 'Lakers',
    status: 'scheduled',
  },
  {
    player_1: 'Raptors',
    player_2: '76ers',
    status: 'scheduled',
  },
];

let ARRAY_FINAL_BOUTS_INFOS = [  // 1 MATCH
  {
    player_1: 'Harry Porter',
    player_2: 'Voldemort',
    status: 'scheduled',
  },
];

export var DUMMY_16BOUTS_INFOS_ARRAY = <BoutsInfo[]> ARRAY_16_BOUTS_INFOS;
export var DUMMY_QUARTER_FINALS_INFOS_ARRAY = <BoutsInfo[]> ARRAY_QURATER_FINALS_BOUTS_INFOS;
export var DUMMY_SEMI_FINALS_ARRAY = <BoutsInfo[]> ARRAY_SEMI_FINALS_BOUTS_INFOS;
export var DUMMY_FINAL_ARRAY = <BoutsInfo[]> ARRAY_FINAL_BOUTS_INFOS;