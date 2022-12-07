import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';
import { BackendService } from 'src/app/services/backend.service';
import { PlayerInfo } from 'src/app/shared/player_info';

@Component({
  selector: 'app-tn-detail-page',
  templateUrl: './tn-detail-page.component.html',
  styleUrls: ['./tn-detail-page.component.scss'],
})
export class TnDetailPageComponent implements OnInit {
  tn_detail__displayconfig: DisplayConfig = <DisplayConfig> {
    hidden: [],
    readonly: ['name', 'size', 'description', 'start_date', 'end_date', 'status', 'players'],
  };

  @Input()
  config!: DisplayConfig;

  tn_id!: string;
  tn_info!: TnInfo;
  players_info!: Map<string, PlayerInfo>;

  constructor(private route: ActivatedRoute, private backend: BackendService , private router:Router ) { }

  ngOnInit(): void {
    this.tn_id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(`tn-detail-page: tn_id=${this.tn_id}`);

    /* 
    Jacky
    Api to get info , owner have more power
    register the game
    register list
    result
    tree
    */
    [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)

    console.log(this.tn_info);
    if (Object.keys(this.tn_info).length == 0) {
      // if no tournament is found, redirect the page to tn-list
      //   this code is dirty, user will see an empty detail page before redirection
      //window.location.href = '/tn-list';
      this.router.navigate(["tn-list"]);
    }
  }

  isHiddenButton(btn: string): boolean {
    if (btn == 'manage') {
      if (this.backend.getMyUserId() == this.tn_info.owner) {
        return true;
      }
    } else if (btn == 'register') {
      if (this.tn_info.status == 'enrolling' && !this.tn_info.players.includes(this.backend.getMyUserId())) {
        return true;
      }
    }

    return false;
  }

  onButton(btn: string) {
    console.log(`Clicked "${btn}" button`);
    if (btn == 'register') {
      this.backend.registerTn(this.tn_id, this.backend.getMyUserId());
      // TODO: refresh the page

    } else if (btn == 'manage') {
      console.log('Go to tn-manage-page');
      // TODO: add code here
    }
  }
}
