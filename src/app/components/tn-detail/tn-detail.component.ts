import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DummyBackendService } from 'src/app/services/dummy-backend.service';
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

  constructor(private route: ActivatedRoute, private backend: DummyBackendService) {
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
}
