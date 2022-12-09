import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnInfo } from 'src/app/shared/tn_info';
import { DisplayConfig } from 'src/app/shared/displayconfig';
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
  page_type = '';

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

  getUserNameCssClasses(user_id: string, round: string): string {
    let s = 'username ';
    if (user_id == this.backend.getMyUserId()) {
      s += 'username-self ';
    }
    if (!user_id) {
      s += 'username-empty ';
    } else if (round) {
      if (this.shouldButtonClickable(round)) {
        s += 'username-clickable ';
      }
    }
    return s;
  }

  shouldButtonClickable(round: string) {
    if (this.page_type == 'manage' 
        && this.backend.getMyUserId() == this.tn_info.owner
        && round
        && round == this.tn_info.current_round) {
      return true;
    }
    return false;
  }

  onClick(round: string, user_id: string, row_index: number): void {
    if (this.shouldButtonClickable(round)) {
      console.log(`clicked... Round ${round} / Bout #${row_index} / User ${user_id}`);
      if (this.tn_info.current_round == round) {
        let tn_info_copy = JSON.parse(JSON.stringify(this.tn_info));
        tn_info_copy.bouts[round][row_index][2] = user_id;
        console.log(`Call setRoundWinners()...`);
        this.backend.setRoundWinners(tn_info_copy.tn_id, tn_info_copy).subscribe((res) => {
          if (res.status == 1) {
            this.tn_info = <TnInfo> res.data;
            console.log(`setRoundWinners returns tn_info = ${JSON.stringify(this.tn_info)}`);
          } else {
            console.log(`Failed in calling setRoundWinners()`);
          }
        });
      }
    }
  }
}
