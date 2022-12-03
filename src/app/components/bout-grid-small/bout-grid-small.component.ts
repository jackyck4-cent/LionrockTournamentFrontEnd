import { Component, OnInit, Input } from '@angular/core';
import { DummyBackendService } from 'src/app/services/dummy-backend.service';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnInfo } from 'src/app/shared/tn_info';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bout-grid-small',
  templateUrl: './bout-grid-small.component.html',
  styleUrls: ['./bout-grid-small.component.scss']
})
export class BoutGridSmallComponent implements OnInit {

  @Input()
  config!: DisplayConfig;

  @Input() 
  tn_id!: string;

  @Input() 
  show_player_list!: boolean;

  tn_info!: TnInfo;
  players_info!: Map<string, PlayerInfo>;

  constructor(private backend: DummyBackendService) { }

  ngOnInit(): void {
    console.log(`bout-grid-small: tn_id=${this.tn_id}`);
    [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)
    console.log(this.tn_info);
  }

  getUserName(user_id: string): string {
    return this.players_info.get(user_id)?.name ?? '---';
  }

  getUserNameCssClasses(user_id: string): string {
    // TODO: temporary use 'a0001' for current user, need to change here
    return `username ${user_id == 'a0001' ? 'username-self': ''}`;
  }

  onClick(round: string, user_id: string): void {
    console.log(`clicked... Round ${round} / User ${user_id}`);
  }
}
