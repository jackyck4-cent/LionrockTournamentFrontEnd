export var DUMMYDATA = {
  'players': {
    'a0001': {
      user_id: 'a0001',
      name: 'Hanamichi Sakuragi',
      email: 'hs@gmail.com',
    },
    'a0002': {
      user_id: 'a0002',
      name: 'Kaede Rukawa',
      email: 'kr@gmail.com',
    },
    'a0003': {
      user_id: 'a0003',
      name: 'Takenori Akagi',
      email: 'ta@gmail.com',
    },
    'a0004': {
      user_id: 'a0004',
      name: 'Ryota Miyagi',
      email: 'rm@gmail.com',
    },
    'a0005': {
      user_id: 'a0005',
      name: 'Hisashi Mitsui',
      email: 'hm@gmail.com',
    },
    'a0006': {
      user_id: 'a0006',
      name: 'Kiminobu Kogure',
      email: 'kk@gmail.com',
    },
    'a0007': {
      user_id: 'a0007',
      name: 'Yasuharu Yasuda',
      email: 'yy@gmail.com',
    },
    'a0008': {
      user_id: 'a0008',
      name: 'Mitsuyoshi Anzai',
      email: 'ma@gmail.com',
    },
    'a0009': {
      user_id: 'a0009',
      name: 'Shinichi Maki',
      email: 'sm@gmail.com',
    },
    'a0010': {
      user_id: 'a0010',
      name: 'Soichiro Jin',
      email: 'sj@gmail.com',
    },
    'a0011': {
      user_id: 'a0011',
      name: 'Akira Sendoh',
      email: 'as@gmail.com',
    },
    'a0012': {
      user_id: 'a0012',
      name: 'Jun Uozumi',
      email: 'ju@gmail.com',
    },
    'a0013': {
      user_id: 'a0013',
      name: 'Kenji Fujima',
      email: 'kf@gmail.com',
    },
    'a0014': {
      user_id: 'a0014',
      name: 'Toru Hanagata',
      email: 'th@gmail.com',
    },
    'a0015': {
      user_id: 'a0015',
      name: 'Kicchou Fukuda',
      email: 'kf@gmail.com',
    },
    'a0016': {
      user_id: 'a0016',
      name: 'Nobunaga Kiyota',
      email: 'nk@gmail.com',
    },
  },
  'tournaments': {
    '1': {
      tn_id: '1',
      name: 'Street Basketball',
      description: 'Let\'s play basketball', 
      owner: 'a0001',
      size: 16,
      start_date: '2022-11-20',
      end_date: '2022-11-27',
      status: 'enrolling',
      players: [],  // list of players
      current_round: '',    // 1=completed, 2=final, 4=semi-final, 8=quarter-final, 16=round-of-16
      champion: '',
      bouts: {
        '_2': [
          // 1st-player, 2nd-player, winner
          ['', '', ''],
        ],
        '_4': [
          // 1st-player, 2nd-player, winner
          ['', '', ''],
          // 3rd-player, 4th-player, winner
          ['', '', ''],
        ],
        '_8': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
    '2': {
      tn_id: '2',
      name: 'Funny Volley Ball',
      description: 'Let\'s play volley ball', 
      owner: 'a0002',
      size: 8,
      start_date: '2022-11-21',
      end_date: '2022-11-28',
      status: 'enrolling',
      players: ['a0013', 'a0002', 'a0003', 'a0004', 'a0005'],  // list of players
      current_round: '',    // 1=completed, 2=final, 4=semi-final, 8=quarter-final, 16=round-of-16
      champion: '',
      bouts: {
        '_2': [
          // 1st-player, 2nd-player, winner
          ['', '', ''],
        ],
        '_4': [
          // 1st-player, 2nd-player, winner
          ['', '', ''],
          // 3rd-player, 4th-player, winner
          ['', '', ''],
        ],
        '_8': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
    '3': {
      tn_id: '3',
      name: 'Wonderful Fencing',
      description: 'Let\'s play fencing', 
      owner: 'a0011',
      size: 4,
      start_date: '2022-11-22',
      end_date: '2022-11-29',
      status: 'started',
      players: ['a0001', 'a0002', 'a0003', 'a0004'],
      current_round: '_4',
      champion: '',
      bouts: {
        '_2': [
          ['', '', ''],
        ],
        '_4': [
          ['a0001', 'a0002', ''],
          ['a0003', 'a0004', ''],
        ],
        '_8': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
    '4': {
      tn_id: '4',
      name: 'Stupid Fight',
      description: 'Let\'s fight', 
      owner: 'a0012',
      size: 8,
      start_date: '2022-12-01',
      end_date: '2022-12-07',
      status: 'started',
      players: ['a0001', 'a0002', 'a0003', 'a0004', 'a0005', 'a0006', 'a0007', 'a0008'],
      current_round: '_4',
      champion: '',
      bouts: {
        '_2': [
          ['a0001', 'a0008', ''],
        ],
        '_4': [
          ['a0001', 'a0004', 'a0001'],
          ['a0005', 'a0008', 'a0008'],
        ],
        '_8': [
          ['a0001', 'a0002', 'a0001'],
          ['a0003', 'a0004', 'a0004'],
          ['a0005', 'a0006', 'a0005'],
          ['a0007', 'a0008', 'a0008'],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
    '5': {
      tn_id: '5',
      name: 'No Name Table Tennis',
      description: 'Let\'s play ping pong', 
      owner: 'a0015',
      size: 8,
      start_date: '2022-12-02',
      end_date: '2022-12-08',
      status: 'completed',
      players: ['a0001', 'a0002', 'a0003', 'a0004', 'a0005', 'a0006', 'a0007', 'a0008'],
      current_round: '_2',
      champion: 'a0007',
      bouts: {
        '_2': [
          ['a0001', 'a0007', 'a0007'],
        ],
        '_4': [
          ['a0001', 'a0004', 'a0001'],
          ['a0005', 'a0007', 'a0007'],
        ],
        '_8': [
          ['a0001', 'a0002', 'a0001'],
          ['a0003', 'a0004', 'a0004'],
          ['a0005', 'a0006', 'a0005'],
          ['a0007', 'a0008', 'a0007'],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
    '6': {
      tn_id: '6',
      name: 'Wonderful Dancing',
      description: 'Let\'s dance', 
      owner: 'a0010',
      size: 4,
      start_date: '2023-01-02',
      end_date: '2023-01-08',
      status: 'draft',
      players: [],
      current_round: '',
      champion: '',
      bouts: {
        '_2': [
          ['', '', ''],
        ],
        '_4': [
          ['', '', ''],
          ['', '', ''],
        ],
        '_8': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        '_16': [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    },
  },
};

