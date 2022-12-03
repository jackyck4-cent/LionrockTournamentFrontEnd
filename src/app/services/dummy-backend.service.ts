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
  private all_tn_infos!: any; //Map<string, TnInfo>;
  private next_tn_id: number = 0;

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

  getTnList(): [Map<string, PlayerInfo>, Map<string, TnInfo>] {
    console.log(`Get tournaments, total ${this.all_tn_infos.size}`);
    return [this.all_players, this.all_tn_infos];
  }

  getTn(id: string): [Map<string, PlayerInfo>, TnInfo] {
    console.log(`Get tournament, id ${id}`);
    return [this.all_players, this.all_tn_infos.get(id) ?? new TnInfo()];
  }

  createTn(tn_info: TnInfo): string {
    tn_info.tn_id = this.getUniqueTnId();
    this.all_tn_infos.set(tn_info.tn_id, tn_info);
    console.log(`Created tournament with id ${tn_info.tn_id}`);
    return tn_info.tn_id;
  }

  updateTn(tn_info: TnInfo): void {
    if (tn_info.tn_id && this.all_tn_infos.has(tn_info.tn_id)) {
      this.all_tn_infos.set(tn_info.tn_id, tn_info);
      console.log(`Updated tournament with id ${tn_info.tn_id}`);
    }
  }

  deleteTn(tn_id: string): void {
    if (this.all_tn_infos.has(tn_id)) {
      this.all_tn_infos.delete(tn_id);
      console.log(`Deleted tournament with id ${tn_id}`);
    }
  }
}
