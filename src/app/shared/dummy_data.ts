import { TnInfo } from "./tn_info";

let ARRAY__TN_INFOS = [
  {
    tn_id: '11111',
    name: 'Street Basketball',
    description: 'Let\'s play basketball', 
    owner: 'John',
    size: 16,
    start_date: '2022-11-20',
    end_date: '2022-11-27',
    status: 'Enrolling, registered 6 out of 16',
  },
  {
    tn_id: '22222',
    name: 'Funny Volley Ball',
    description: 'Let\'s play volley ball', 
    owner: 'Mary',
    size: 8,
    start_date: '2022-11-21',
    end_date: '2022-11-28',
    status: 'Final',
  },
  {
    tn_id: '33333',
    name: 'Wonderful Fencing',
    description: 'Let\'s play fencing', 
    owner: 'Peter',
    size: 4,
    start_date: '2022-11-22',
    end_date: '2022-11-29',
    status: 'Semi-Final',
  },
  {
    tn_id: '44444',
    name: 'Stupid Fight',
    description: 'Let\'s fight', 
    owner: 'Jessica',
    size: 8,
    start_date: '2022-12-01',
    end_date: '2022-12-07',
    status: 'Draft',
  },
  {
    tn_id: '55555',
    name: 'No Name Table Tennis',
    description: 'Let\'s play ping pong', 
    owner: 'Aaron',
    size: 16,
    start_date: '2022-12-02',
    end_date: '2022-12-08',
    status: 'Final',
  },
  {
    tn_id: '66666',
    name: 'WTF Badminton',
    description: 'Let\'s play badminton', 
    owner: 'Zeus',
    size: 4,
    start_date: '2023-01-01',
    end_date: '2023-02-07',
    status: 'Champion is Venus',
  },
];



export var DUMMY_TN_INFOS = new Map(ARRAY__TN_INFOS.map(i => [i.tn_id, <TnInfo> i]));

