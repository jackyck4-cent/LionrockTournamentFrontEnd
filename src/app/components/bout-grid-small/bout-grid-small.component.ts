import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnInfo } from 'src/app/shared/tn_info';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { MatTableDataSource } from '@angular/material/table';
import { ApibackendService } from 'src/app/services/apibackend.service';

@Component({
  selector: 'app-bout-grid-small',
  templateUrl: './bout-grid-small.component.html',
  styleUrls: ['./bout-grid-small.component.scss']
})
export class BoutGridSmallComponent implements OnInit {

  @Input()
  config!: DisplayConfig;

  @Input() 
  show_player_list!: boolean;

  @Input() 
  tn_info!: TnInfo;

  @Input() 
  players_info!: Map<string, PlayerInfo>;

  constructor(private backend: ApibackendService) { }

  ngOnInit(): void {
    //console.log(this.tn_info);
  }

  getUserName(user_id: string): string {
    return this.players_info.get(user_id)?.name ?? '---';
  }

  getUserNameCssClasses(user_id: string): string {
    // TODO: temporary use 'a0001' for current user, need to change here
    return `username ${user_id == this.backend.getMyUserId() ? 'username-self': (user_id ? '': 'username-empty')}`;
  }

  onClick(round: string, user_id: string): void {
    console.log(`clicked... Round ${round} / User ${user_id}`);
  }
}
