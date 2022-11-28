import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DUMMY_TN_INFOS } from 'src/app/shared/dummy_data';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';

@Component({
  selector: 'app-tn-create-page',
  templateUrl: './tn-create-page.component.html',
  styleUrls: ['./tn-create-page.component.scss']
})
export class TnCreatePageComponent implements OnInit {
  id: string = '';
  tn_info!: TnInfo;
  tn_detail__displayconfig: DisplayConfig = <DisplayConfig> {
    hidden: [],
    readonly: ['name'],
  };

  @Input()
  config!: DisplayConfig;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.tn_info = DUMMY_TN_INFOS.get(this.id) ?? new TnInfo();
    console.log(this.tn_info);
    if (Object.keys(this.tn_info).length == 0) {
      // if no tournament is found, redirect the page to tn-list
      //   this code is dirty, user will see an empty detail page before redirection
      window.location.href = '/tn-list';
    }
  }

  ngOnInit(): void {}

  onButton(btn: string) {
    console.log(`Clicked "${btn}" button`);
  }

  isHiddenButton(btn: string): boolean {
    return true;
  }
}
