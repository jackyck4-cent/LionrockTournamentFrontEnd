import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DUMMY_TN_INFOS } from 'src/app/shared/dummy_data';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';
import { BackendService } from 'src/app/services/backend.service';
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
      this.backend.getPlayerist([]).subscribe((res) => {
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
        case '2': case '_2':
          return this.tn_info.bouts['_2'];
        case '8': case '_8':
          return this.tn_info.bouts['_8'];
        case '16': case '_16':
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
              this.reloadComponent();
            } else {
              alert(`Failed to register to the tournament: status=${res.status}`);
            }
          });
          break;
        case 'start_game':
          alert(`Not yet implemented: "${btn}" button`);
          break;
        case 'set_winners':
          alert(`Not yet implemented: "${btn}" button`);
          break;
        case 'next_round':
          alert(`Not yet implemented: "${btn}" button`);
          break;
        case 'modify':
          // this.router.navigate([`tn-create/${this.tn_id}`])
          alert(`Not yet implemented: "${btn}" button`);
          break;
        case 'delete':
          alert(`Not yet implemented: "${btn}" button`);
          break;
      }
    }
  }

}

/*  
if tournament status is "draft", show button: : "Confirm", "Start Enrolling", "Cancel", "Delete"
if tournament status is "enrolling", show button: "Confirm", "Start Game", "Cancel", "Delete"
if tournament status is "started", show button: "Confirm", "Cancel", "Delete", "Update Result", "Proceed to Next Round"
if tournament status is "completed", no button is shown, only show Result Tree

*/