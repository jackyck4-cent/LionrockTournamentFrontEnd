import { Injectable } from '@angular/core';
import { PlayerInfo } from '../shared/player_info';
import { TnInfo } from '../shared/tn_info';
import { BackendInterface } from './backend-interface';
import { DummyBackendService } from './dummy-backend.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backend: BackendInterface = new DummyBackendService();

  constructor() { }

  getMyUserId(): string {
    let userid = localStorage.getItem("userid");
    if (userid != null)
      return userid;
    else
      return "";
  }
  getMyUserName(): string {
    let display_name = localStorage.getItem("display_name");
    if (display_name != null)
      return display_name;
    else
      return "";
  }
  getTnList(filters: string[]): [Map<string, PlayerInfo>, Map<string, TnInfo>] {
    return this.backend.getTnList(filters);
  }
  getTn(id: string): [Map<string, PlayerInfo>, TnInfo] {
    return this.backend.getTn(id);
  }
  registerTn(tn_id: string, user_id: string): boolean {
    return this.backend.registerTn(tn_id, user_id);
  }
  createTn(tn_info: TnInfo): string {
    return this.backend.createTn(tn_info);
  }
  updateTn(tn_info: TnInfo): boolean {
    return this.backend.updateTn(tn_info);
  }
  deleteTn(tn_id: string): boolean {
    return this.backend.deleteTn(tn_id);
  }
}
