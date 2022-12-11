import { Component, OnInit, Input, Output , EventEmitter, ChangeDetectorRef} from '@angular/core';
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

  @Output() newItemEvent = new EventEmitter<string>();

  selectedIndex: number = 0;

  constructor(private backend: ApibackendService , private change: ChangeDetectorRef) { 

    

  }

  ngOnInit(): void {
    //console.log(this.tn_info);
    var that = this;
    window.setTimeout(()=>{

      console.log(this.tn_info.size);
      console.log(this.tn_info.current_round);
      switch (this.tn_info.size)
      {
        case 4:
          
          if (this.tn_info.current_round == "_2" )
            this.selectedIndex = 1;
          else
            this.selectedIndex = 0;
          break;

        case 8:
          if (this.tn_info.current_round == "_2" )
            this.selectedIndex = 2;
          else if (this.tn_info.current_round == "_4" )
            this.selectedIndex = 1;
          else 
            this.selectedIndex = 0;
          break;

        case 16:
          if (this.tn_info.current_round == "_2" )
            this.selectedIndex = 3;
          else if (this.tn_info.current_round == "_4" )
            this.selectedIndex = 2;
            else if (this.tn_info.current_round == "_8" )
            this.selectedIndex = 1;
          else 
            this.selectedIndex = 0;
          break;
      }
      this.change.markForCheck();
      
      
   }, 200 ) ;
  }

  getUserName(user_id: string): string {
    if (user_id != "")
      return this.players_info.get(user_id)?.name ?? '---';
    else
      return '---';
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
    console.log(this.page_type+"<<");
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
        /*
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
        */

        let bouts = this.tn_info.bouts[round];
        for (var i=0;i<bouts.length;i++)
        {
          let row = bouts[i];
          if (row[0] == user_id || row[1] == user_id)
          {
            this.tn_info.bouts[round][i][2] = user_id
          }
        }
        //alert(round+" "+user_id);
        //console.log(`clicked... Round ${round} / User ${user_id}`);
        this.newItemEvent.emit(round+"+"+user_id);
      }
    }
  }
}
