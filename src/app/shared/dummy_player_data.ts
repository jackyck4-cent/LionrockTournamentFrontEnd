import { PlayerInfo } from "./player_info";

let ARRAY_PLAYER_INFOS = [
  {
    user_id: 'a0001',
    tn_id: '11111',
    name: 'Hanamichi Sakuragi',
    email: 'hs@gmail.com',
  },
  {
    user_id: 'a0002',
    tn_id: '11111',
    name: 'Kaede Rukawa',
    email: 'kr@gmail.com',
  },
  {
    user_id: 'a0003',
    tn_id: '11111',
    name: 'Takenori Akagi',
    email: 'ta@gmail.com',
  },
  {
    user_id: 'a0004',
    tn_id: '11111',
    name: 'Ryota Miyagi',
    email: 'rm@gmail.com',
  },
  {
    user_id: 'a005',
    tn_id: '11111',
    name: 'Hisashi Mitsui',
    email: 'hm@gmail.com',
  },
  {
    user_id: 'a0006',
    tn_id: '11111',
    name: 'Kiminobu Kogure',
    email: 'kk@gmail.com',
  },
  {
    user_id: 'a0007',
    tn_id: '11111',
    name: 'Yasuharu Yasuda',
    email: 'yy@gmail.com',
  },
  {
    user_id: 'a0008',
    tn_id: '11111',
    name: 'Mitsuyoshi Anzai',
    email: 'ma@gmail.com',
  },
  {
    user_id: 'a0009',
    tn_id: '11111',
    name: 'Shinichi Maki',
    email: 'sm@gmail.com',
  },
  {
    user_id: 'a0010',
    tn_id: '11111',
    name: 'Soichiro Jin',
    email: 'sj@gmail.com',
  },
  {
    user_id: 'a0011',
    tn_id: '11111',
    name: 'Akira Sendoh',
    email: 'as@gmail.com',
  },
  {
    user_id: 'a0012',
    tn_id: '11111',
    name: 'Jun Uozumi',
    email: 'ju@gmail.com',
  },
  {
    user_id: 'a0013',
    tn_id: '11111',
    name: 'Kenji Fujima',
    email: 'kf@gmail.com',
  },
  {
    user_id: 'a0014',
    tn_id: '11111',
    name: 'Toru Hanagata',
    email: 'th@gmail.com',
  },
  {
    user_id: 'a0015',
    tn_id: '11111',
    name: 'Kicchou Fukuda',
    email: 'kf@gmail.com',
  },
  {
    user_id: 'a0016',
    tn_id: '11111',
    name: 'Nobunaga Kiyota',
    email: 'nk@gmail.com',
  },
];



export var DUMMY_PLAYER_INFOS = new Map(ARRAY_PLAYER_INFOS.map(i => [i.user_id, <PlayerInfo> i]));