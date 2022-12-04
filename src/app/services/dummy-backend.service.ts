import { Injectable } from '@angular/core';
import { DUMMYDATA } from '../shared/dummy_all_data';
import { PlayerInfo } from '../shared/player_info';
import { TnInfo } from '../shared/tn_info';
import { BackendInterface } from './backend-interface';

@Injectable({
  providedIn: 'root',
})

export class DummyBackendService implements BackendInterface {
  backend_name: string;
  private all_players!: Map<string, PlayerInfo>;
  private all_tn_infos!: Map<string, TnInfo>;
  private next_tn_id: number = 0;

  // TODO: Temporary set my user id here, must change later
  private my_user_id: string = 'a0001';

  constructor() {
    this.backend_name = 'Dummy Backend';
    this.all_players = new Map<string, PlayerInfo>(
      Object.entries(DUMMYDATA.players)
    );
    this.all_tn_infos = new Map<string, TnInfo>();
    for (const [k, v] of Object.entries(DUMMYDATA.tournaments)) {
      let tn = Object.assign(new TnInfo(), v);
      this.all_tn_infos.set(k, tn);
    }
  }

  getMyUserId(): string {
    return this.my_user_id;
  }

  getMyUserName(): string {
    return this.all_players.get(this.my_user_id)?.name ?? '';
  }

  private getUniqueTnId(): string {
    if (this.next_tn_id == 0) {
      // a silly way
      let _id: number = this.all_tn_infos.size + 1;
      while (true) {
        let _id_str: string = `${_id}`;
        if (!this.all_tn_infos.has(_id_str)) {
          this.next_tn_id = _id + 1;
          return _id_str;
        }
        _id++;
      }
    }
    return `${this.next_tn_id++}`;
  }

  getTnList(filters: string[]): [Map<string, PlayerInfo>, Map<string, TnInfo>] {
    let tn_infos = new Map<string, TnInfo>();
    this.all_tn_infos.forEach((tn_info: TnInfo, tn_id: string) => {
      let hit = false;
      if (filters.includes('all')) {
        hit = true;
      } else {
        filters.forEach((ft) => {
          if (!hit) {
            switch (ft) {
              case 'registered':
                hit = (tn_info.players.includes(this.getMyUserId()));
                break;
              case 'owned':
                hit = (tn_info.owner == this.getMyUserId());
                break;
              case 'enrolling':
                hit = (tn_info.status == 'enrolling');
                break;
              case 'started':
                hit = (tn_info.status == 'started');
                break;
              case 'completed':
                hit = (tn_info.status == 'completed');
                break;
              case 'draft':
                hit = (tn_info.status == 'draft');
                break;
            }
          }
        });
      }
      if (hit) {
        tn_infos.set(tn_id, tn_info);
      }
    });
    return [this.all_players, tn_infos];
  }

  getTn(id: string): [Map<string, PlayerInfo>, TnInfo] {
    console.log(`Get tournament, id ${id}`);
    return [this.all_players, this.all_tn_infos.get(id) ?? new TnInfo()];
  }

  registerTn(tn_id: string, user_id: string): boolean {
    console.log(`Register user ${user_id} to tournament ${tn_id}`);
    if (this.all_tn_infos.has(tn_id)) {
      let tn_info = this.all_tn_infos.get(tn_id);
      if (tn_info && tn_info.status == 'enrolling') {
        if (tn_info.players.length < tn_info.size) {
          tn_info.players.push(user_id);
          return true;
        }
      }
    }
    return false;
  }

  createTn(tn_info: TnInfo): string {
    tn_info.tn_id = this.getUniqueTnId();
    this.all_tn_infos.set(tn_info.tn_id, tn_info);
    console.log(`Created tournament with id ${tn_info.tn_id}`);
    return tn_info.tn_id;
  }

  updateTn(tn_info: TnInfo): boolean {
    if (tn_info.tn_id && this.all_tn_infos.has(tn_info.tn_id)) {
      this.all_tn_infos.set(tn_info.tn_id, tn_info);
      console.log(`Updated tournament with id ${tn_info.tn_id}`);
      return true;
    }
    return false;
  }

  deleteTn(tn_id: string): boolean {
    if (this.all_tn_infos.has(tn_id)) {
      this.all_tn_infos.delete(tn_id);
      console.log(`Deleted tournament with id ${tn_id}`);
      return true;
    }
    return false;
  }
}
