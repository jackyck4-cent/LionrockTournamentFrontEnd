import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';
import { ApibackendService } from 'src/app/services/apibackend.service';

@Component({
  selector: 'app-tn-manage-page',
  templateUrl: './tn-manage-page.component.html',
  styleUrls: ['./tn-manage-page.component.scss']
})
export class TnManagePageComponent implements OnInit {
  tn_detail__displayconfig: DisplayConfig = <DisplayConfig> {
    hidden: [],
    readonly: ['name', 'description', 'size'],
  };

  @Input()
  config!: DisplayConfig;

  tn_id!: string;
  tn_info!: TnInfo;
  players_info!: Map<string, PlayerInfo>;
  state_winner : boolean = false;
  private prev_bouts: string = '';

  /*
  Jacky 
  change to api
  status change
  result update
  */

  constructor(private route: ActivatedRoute, 
      private backend: ApibackendService, 
      private router: Router) {
  }

  ngOnInit(): void {
    this.tn_id = this.route.snapshot.paramMap.get('id') ?? '';
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
          this.updatePrevBoutsStr();
          console.log(`tn-manage-page: tn_info = ${JSON.stringify(this.tn_info)}`);
        }
      });
    }
  }

  private reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  private getCurrRoundBouts(): any {
    if (this.tn_info.status == 'started') {
      let curr_round = this.tn_info.current_round;
      switch (curr_round) {
        case '_2':
          return this.tn_info.bouts['_2'];
        case '_4':
          return this.tn_info.bouts['_4'];
        case '_8':
          return this.tn_info.bouts['_8'];
        case '_16':
          return this.tn_info.bouts['_16'];
      }
    }
    return null;
  }

  private hasMarkedAllWinners(): boolean {
    let bouts: string[][] = this.getCurrRoundBouts();
    if (bouts) {
      for (let i = 0; i < bouts.length; ++i) {
        if (!bouts[i][2]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  ifChangedBouts(): boolean {
    if (this.tn_info) {
      let s = JSON.stringify(this.tn_info.bouts);
      return (this.prev_bouts != s);
    } 
    return false;
  }

  private updatePrevBoutsStr() {
    this.prev_bouts = JSON.stringify(this.tn_info.bouts);
  }

  isHiddenButton(btn: string): boolean {
      if (this.tn_info) {
      switch (btn) {
        case 'start_enrolling':
          return !(this.tn_info.status == 'draft');
        case 'start_game':
          return !(this.tn_info.status == 'enrolling' && this.tn_info.size == this.tn_info.players.length);
        case 'set_winners':
          return !(this.tn_info.status == 'started');
        case 'next_round':
          return !(this.tn_info.status == 'started' && this.hasMarkedAllWinners());
        case 'modify':
          return !(this.tn_info.owner == this.backend.getMyUserId());
        case 'delete':
          return !(this.tn_info.owner == this.backend.getMyUserId());
      }
    }
    return false;
  }

  onButton(btn: string) {
    console.log(`Clicked "${btn}" button`);
    if (this.tn_info) {
      switch (btn) {
        case 'start_enrolling':
          this.backend.enrollnow(this.tn_id).subscribe((res) => {
            if (res.status == 1) {
              this.router.navigate([`tn-detail/${this.tn_id}`]);
            } else {
              alert(`Failed to register to the tournament: status=${res.status}`);
            }
          });
          break;
        case 'start_game':
          this.backend.startTn(this.tn_id).subscribe((res) => {
            if (res.status == 1) {
              this.reloadComponent();
            } else {
              alert(`Failed to register to the tournament: status=${res.status}`);
            }
          });
          break;
        case 'set_winners':
          //console.log(`tn-manage-page: tn_info = ${JSON.stringify(this.tn_info)}`);
          //alert("1");
          //alert(`Not yet implemented: "${btn}" button`);
          this.backend.setRoundWinners(this.tn_id , this.tn_info).subscribe((res) => {
            if (res.status == 1) {
              this.updatePrevBoutsStr();
              this.tn_info = (res.data)
              this.reloadComponent();
            } else {
              alert(`Failed to register to the tournament: status=${res.status}`);
            }
          });
          break;
        case 'next_round':
          //alert(`Not yet implemented: "${btn}" button`);
          this.backend.goNextRoundTn(this.tn_id).subscribe((res) => {
            if (res.status == 1) {
              this.tn_info = (res.data)
              this.reloadComponent();
            } else {
              alert(`Failed to register to the tournament: status=${res.status}`);
            }
          });
          break;
        case 'modify':
          this.router.navigate([`tn-create/${this.tn_id}`])
          break;
        case 'delete':
          if (confirm('Are you sure to delete this tournament?')) {
            this.backend.removenow(this.tn_id).subscribe((res) => {
              if (res.status == 1) {
                //this.reloadComponent();
                alert('Tournament is deleted');
                this.router.navigate(['tn-list']);
              } else {
                alert(`Failed to register to the tournament: status=${res.status}`);
              }
            });
          }
          break;
      }
    }
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
    
  }

  infoChangeEvent(info:string)
  {
  
    let inputdata:TnInfo = JSON.parse(info)
    this.tn_info.name = inputdata.name;
    this.tn_info.description = inputdata.description;
    this.tn_info.size = inputdata.size;
    console.log(`tn-manage-page: tn_info = ${JSON.stringify(this.tn_info)}`);
  }

}
 