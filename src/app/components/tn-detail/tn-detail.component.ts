import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';

@Component({
  selector: 'app-tn-detail',
  templateUrl: './tn-detail.component.html',
  styleUrls: ['./tn-detail.component.scss'],
})
export class TnDetailComponent implements OnInit {
  @Input()
  tn_info!: TnInfo;

  @Input()
  config!: DisplayConfig;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.tn_info);
  }

  onTestButton(): void {
    console.log(`Test Button:  ${JSON.stringify(this.tn_info)}`)
  }
}
