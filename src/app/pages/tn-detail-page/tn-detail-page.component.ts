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

  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit(): void {
    this.tn_id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(`tn-detail-page: tn_id=${this.tn_id}`);
    [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)

    console.log(this.tn_info);
    if (Object.keys(this.tn_info).length == 0) {
      // if no tournament is found, redirect the page to tn-list
      //   this code is dirty, user will see an empty detail page before redirection
      window.location.href = '/tn-list';
    }
  }

  onButton(btn: string) {
    console.log(`Clicked "${btn}" button`);
  }

  isHiddenButton(btn: string): boolean {
    return true;
  }
}
