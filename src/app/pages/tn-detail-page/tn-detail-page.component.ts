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

  @Input()
  page_type!: string;

  tn_id!: string;
  tn_info!: TnInfo;
  players_info!: Map<string, PlayerInfo>;

  currentUser: any = {};

  constructor(private route: ActivatedRoute, 
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
    console.log(this.page_type);

    /* 
    Jacky
    Api to get info , owner have more power
    register the game
    register list
    result
    tree
    */

    // [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)
    this.backend.getPlayerList([]).subscribe((res) => {
      if (res.status == 1) {
        this.players_info = res.data;
      }
      // console.log(`tn-detail-page: backend.getTn.subscribe(): players_info = ${JSON.stringify(this.players_info)}`);
    });
    this.backend.getTn(this.tn_id).subscribe((res) => {
      if (res.status == 1) {
        this.tn_info = res.data ?? {};
      }
      // console.log(`tn-detail-page: backend.getTn.subscribe(): tn_info = ${JSON.stringify(this.tn_info)}`);
    });
  }

  isHiddenButton(btn: string): boolean {
    if (this.authService.isLoggedIn) {
      console.log(`this.backend.getMyUserId() = ${this.backend.getMyUserId()}`)
      if (btn == 'manage') {
        if (this.tn_info && this.backend.getMyUserId() == this.tn_info.owner) {
          return false;
        }
      } else if (btn == 'register') {
        if (this.backend.getMyUserId()
            && this.tn_info
            && this.tn_info.status == 'enrolling'
            && this.tn_info.players.length < this.tn_info.size
            && !this.tn_info.players.includes(this.backend.getMyUserId())) {
          return false;
        }
      }
    }
    return true;
  }

  isNotlogin(): boolean {
    if (!this.authService.isLoggedIn) {
      
      if (  this.tn_info
            && this.tn_info.status == 'enrolling'
            && this.tn_info.players.length < this.tn_info.size
      ) 
        {
          return false;
        }
      
    }
    return true;
  }

  tologin() {
    this.router.navigate(['log-in']);
  }

  private reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  onButton(btn: string) {
    if (this.authService.isLoggedIn) {
      console.log(`Clicked "${btn}" button`);
      if (btn == 'register') {
        this.backend.registerTn(this.tn_id).subscribe((res) => {
          if (res.status == 1) {
            this.reloadComponent();
          } else {
            alert(`Failed to register to the tournament: status=${res.status}`);
          }
        });

      } else if (btn == 'manage') {
        console.log('Go to tn-manage-page');
        this.router.navigate([`tn-manage/${this.tn_id}`]);
      }
    }
  }
}
