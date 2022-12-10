import { Component, OnInit, Input } from '@angular/core';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';
import { AuthService } from 'src/app/shared/auth.service';
import { ApibackendService } from 'src/app/services/apibackend.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() 
  tn_info!:TnInfo;

  @Input() 
  players_info!: Map<string, PlayerInfo>;

  constructor(private authService: AuthService,
      private backend: ApibackendService) { }

  ngOnInit(): void {
    console.log(this.tn_info )
  }

  getUserName(user_id:string): string {
    if (user_id != "")
      return this.players_info.get(user_id)?.name ?? '---';
    else
      return '---';
  }

  getUserNameCssClasses(user_id: string, round: string, row_index: number): string {
    let s = 'tree-username-font ';
    if (user_id == 'champion') {
      s += 'tree-username-font-winner ';
    } else if (round) {
      if (user_id == this.tn_info.bouts[round][row_index][2]) {
        s += 'tree-username-font-winner ';
      }
    }
    return s;
  }

}
