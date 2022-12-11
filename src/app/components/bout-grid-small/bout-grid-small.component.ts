import { Component, OnInit, Input, Output , EventEmitter, ChangeDetectorRef} from '@angular/core';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnInfo } from 'src/app/shared/tn_info';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { ApibackendService } from 'src/app/services/apibackend.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  @Output() tabChangeEvent = new EventEmitter<string>();

  constructor(private backend: ApibackendService , private change: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    window.setTimeout(()=>{
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
      if (this.tn_info.current_round == round) {
        let bouts = this.tn_info.bouts[round];
        for (var i=0;i<bouts.length;i++)
        {
          let row = bouts[i];
          if (row[0] == user_id || row[1] == user_id)
          {
            this.tn_info.bouts[round][i][2] = user_id
          }
        }
        this.newItemEvent.emit(round+"+"+user_id);
      }
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    if (this.tn_info) {
      const translate = {
        'size=4': ['_4', '_2'],
        'size=8': ['_8', '_4', '_2'],
        'size=16': ['_16', '_8', '_4', '_2'],
      };
      const key = `size=${this.tn_info.size}` as keyof typeof translate;
      const val = translate[key][event.index] ?? '';
      if (val) {
        this.tabChangeEvent.emit(val);
      }
    }
  }
}
