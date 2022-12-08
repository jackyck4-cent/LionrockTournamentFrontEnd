import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';
import { AuthService } from 'src/app/shared/auth.service';
import { ApibackendService } from 'src/app/services/apibackend.service';

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

  currentUser: any = {};

  constructor(private route: ActivatedRoute, 
    // private backend: BackendService, 
    private backend: ApibackendService,
    public authService: AuthService,
    private router:Router) { 
      
      this.authService.getMe().subscribe((res) => {
        //console.log(res);
        if (res.status == 1 )
          this.currentUser = res.info;
      });
    }

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

    // [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)
    this.backend.getPlayerist([]).subscribe((res) => {
      if (res.status == 1) {
        this.players_info = res.info;
      }
    });
    this.backend.getTnFullList([]).subscribe((res) => {
      if (res.status == 1) {
        this.tn_info = res.info.get(this.tn_id) ?? {};
      }
    });

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
      if (this.currentUser.username == this.tn_info.owner) {
        return true;
      }
    } else if (btn == 'register') {
      if (this.tn_info.status == 'enrolling' && !this.tn_info.players.includes(this.currentUser.username)) {
        return true;
      }
    }

    return false;
  }

  onButton(btn: string) {
    console.log(`Clicked "${btn}" button`);
    if (btn == 'register') {
      this.backend.registerTn(this.tn_id);
      // TODO: refresh the page

    } else if (btn == 'manage') {
      console.log('Go to tn-manage-page');
      // TODO: add code here
    }
  }
}
