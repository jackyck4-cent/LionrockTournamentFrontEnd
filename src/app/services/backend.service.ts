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
    return this.backend.getMyUserId();
  }
  getMyUserName(): string {
    return this.backend.getMyUserName();
  }
  getTnList(filters: string[]): [Map<string, PlayerInfo>, Map<string, TnInfo>] {
    return this.backend.getTnList(filters);
  }
  getTn(id: string): [Map<string, PlayerInfo>, TnInfo] {
    return this.backend.getTn(id);
  }
  createTn(tn_info: TnInfo): string {
    return this.backend.createTn(tn_info);
  }
  updateTn(tn_info: TnInfo): void {
    return this.backend.updateTn(tn_info);
  }
  deleteTn(tn_id: string): void {
    return this.backend.deleteTn(tn_id);
  }
}
