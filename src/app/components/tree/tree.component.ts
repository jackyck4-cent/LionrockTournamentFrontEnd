import { Component, OnInit, Input } from '@angular/core';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.tn_info )
  }

  getUserName(user_id:string): string {
    if (user_id != "")
      return this.players_info.get(user_id)?.name ?? '---';
    else
      return '---';
  }

}
