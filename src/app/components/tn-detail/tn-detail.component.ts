import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApibackendService } from 'src/app/services/apibackend.service';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnInfo } from 'src/app/shared/tn_info';

@Component({
  selector: 'app-tn-detail',
  templateUrl: './tn-detail.component.html',
  styleUrls: ['./tn-detail.component.scss'],
})
export class TnDetailComponent implements OnInit {
  @Input()
  tn_id!: string;

  @Input()
  config!: DisplayConfig;

  @Input()
  page_type = '';

  @Input()
  tn_info = new TnInfo();

  players_info = new Map<string, PlayerInfo>();

  @Output() boutChangeEvent = new EventEmitter<string>();
  @Output() infoChangeEvent = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, 
      private backend: ApibackendService) {
  }

  ngOnInit(): void {
    // console.log(`tn-detail: tn_id=${this.tn_id}`);
    if (this.tn_id) {
      this.backend.getPlayerList([]).subscribe((res) => {
        if (res.status == 1) {
          this.players_info = new Map<string, PlayerInfo> (
            Object.entries(res.data)
          );
          // console.log(`tn-detail: players_info = ${JSON.stringify(this.players_info)}`);
        }
      });
      this.backend.getTn(this.tn_id).subscribe((res) => {
        if (res.status == 1) {
          this.tn_info = <TnInfo> res.data ?? {};
          // console.log(`tn-detail: tn_info = ${JSON.stringify(this.tn_info)}`);
        }
      });
    }
  }

  onTestButton(): void {
    console.log(`Test Button:  ${JSON.stringify(this.tn_info)}`)
  }

  getUserName(user_id: string): string {
    // console.log(`this.players_info=${JSON.stringify(this.players_info)}`)
    return this.players_info.get(user_id)?.name ?? '<unknown-user>';
  }

  isShowPlayerList(): boolean {
    return this.tn_info.status == 'draft' || this.tn_info.status == 'enrolling';
  }

  getStatusDisplay(): string {
    switch (this.tn_info.status) {
      case 'enrolling':
        let vacancy = this.tn_info.size - this.tn_info.players.length;
        if (vacancy == 0) {
          return `Enrolling, full`;
        }
        if (vacancy == 1) {
          return `Enrolling, ${vacancy} vacancy`;
        }
        return `Enrolling, ${vacancy} vacancies`;
        
      case 'started':
        switch (this.tn_info.current_round) {
          case '_2': return 'Final';
          case '_4': return 'Semi-final';
          case '_8': return 'Quarter-final';
          case '_16': return 'Round of 16';
        }
        return '';
      case 'completed':
        return `Champion is ${this.getUserName(this.tn_info.champion)}`;
      case 'draft':
        return 'Draft';
    }
    return '';
  }

  boutschange(info:string)
  {
    //alert(info)
    let infodata = info.split("+");
    let bouts = this.tn_info.bouts[infodata[0]];
    for (var i=0;i<bouts.length;i++)
    {
      let row = bouts[i];
       if (row[0] == infodata[1] || row[1] == infodata[1])
       {
        this.tn_info.bouts[infodata[0]][i][2] = infodata[1]
       }
    }
    //alert(round+" "+user_id);
    //console.log(`clicked... Round ${round} / User ${user_id}`);
    this.boutChangeEvent.emit(info);
  }

  changeVal(evt:any)
  {
    console.log("CV"+JSON.stringify(this.tn_info))
    this.infoChangeEvent.emit(JSON.stringify(this.tn_info));
  }
}
