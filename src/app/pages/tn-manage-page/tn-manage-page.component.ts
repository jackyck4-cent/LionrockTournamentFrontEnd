import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DUMMY_TN_INFOS } from 'src/app/shared/dummy_data';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';

@Component({
  selector: 'app-tn-manage-page',
  templateUrl: './tn-manage-page.component.html',
  styleUrls: ['./tn-manage-page.component.scss']
})
export class TnManagePageComponent implements OnInit {
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
/*  
if tournament status is "draft", show button: : "Confirm", "Start Enrolling", "Cancel", "Delete"
if tournament status is "enrolling", show button: "Confirm", "Start Game", "Cancel", "Delete"
if tournament status is "started", show button: "Confirm", "Cancel", "Delete", "Update Result", "Proceed to Next Round"
if tournament status is "completed", no button is shown, only show Result Tree

*/