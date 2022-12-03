import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
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

  private players_info!: Map<string, PlayerInfo>;
  tn_info!: TnInfo;

  constructor(private route: ActivatedRoute, private backend: BackendService) {
  }

  ngOnInit(): void {
    console.log(`tn-detail: tn_id=${this.tn_id}`);
    [this.players_info, this.tn_info] = this.backend.getTn(this.tn_id)
    console.log(this.tn_info);
  }

  onTestButton(): void {
    console.log(`Test Button:  ${JSON.stringify(this.tn_info)}`)
  }

  getUserName(user_id: string): string {
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
}
