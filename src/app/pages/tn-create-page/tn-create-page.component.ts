import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayConfig } from 'src/app/shared/displayconfig';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';
import { ApibackendService } from 'src/app/services/apibackend.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-tn-create-page',
  templateUrl: './tn-create-page.component.html',
  styleUrls: ['./tn-create-page.component.scss']
})
export class TnCreatePageComponent implements OnInit {
  tn_detail__displayconfig: DisplayConfig = <DisplayConfig> {
    hidden: ['owner', 'status', 'players'],
    readonly: [],
  };

  @Input()
  config!: DisplayConfig;

  tn_id = '';
  tn_info = new TnInfo();
  page_title = '';

  constructor(private route: ActivatedRoute, 
    private backend: ApibackendService,
    public authService: AuthService,
    private router:Router) {
    
      this.tn_info.status = 'draft';
  }

  ngOnInit(): void {
    /*
    Jacky 
    Implement logic here 
    if id not provided => create new tournment
    If id provided => check existance and modify tournment
    */

    if (!this.authService.isLoggedIn) {
      // go to tn-list page if not yet login
      this.router.navigate(['tn-list']);
      return;
    }


    this.tn_id = this.route.snapshot.paramMap.get('id') ?? '';
    
    this.page_title = this.tn_id? 'Modify Tournament': 'Create New Tournament';

    if (this.tn_id) {
      this.backend.getTn(this.tn_id).subscribe((res) => {
        if (res.status == 1) {
          this.tn_info = res.data ?? {};
          if (this.tn_info.status != 'draft') {
            // if user is not the owner, go to tn-detail
            if (this.tn_info.owner != this.backend.getMyUserId()) {
              this.router.navigate([`tn-detail/${this.tn_id}`]);
              // alert('You are not the owner!!!');
            }
          }
        }
        // console.log(`tn-create-page: backend.getTn.subscribe(): tn_info = ${JSON.stringify(this.tn_info)}`);
      });
    }
  }

  isHiddenButton(btn: string): boolean {
    if (this.authService.isLoggedIn) {
        if (btn == 'create') {
        return !(this.tn_id == '');  // hide buttons except tn_id == 0
      }
      if (btn == 'update') {
        return !(this.tn_id != '');  // hide buttons except tn_id != 0
      }
    }
    return true;
  }

  isDisabledButton(btn: string) {
    if (this.tn_info.name && this.tn_info.description && this.tn_info.size) {
      return false;
    }
    return true;
  }

  onButton(btn: string) {
    if (this.authService.isLoggedIn) {
      console.log(`onButton("${btn}")`);
      if (btn == 'update' && this.tn_info) {
        console.log(`this.tn_info = ${JSON.stringify(this.tn_info)}`);
        this.backend.updateTn(this.tn_info, this.tn_id).subscribe((res) => {
          if (res.status == 1) {
            // done update, go to tn-manage-page
            this.router.navigate([`tn-manage/${this.tn_id}`]);
          }
        });

      } else if (btn == 'create' && !this.tn_id) {
        console.log(`tn-create-page: create-button: tn_info = ${JSON.stringify(this.tn_info)}`);
        this.backend.createTn(this.tn_info).subscribe((res) => {
          if (res.status == 1) {
            alert('Tournament created');
            this.router.navigate(['tn-list']);
          } else {
            alert(`Failed to create tournament: ${res.message}`);
          }
        });
      }
    }
  }

  infoChangeEvent(info:string)
  {
  
    let inputdata:TnInfo = JSON.parse(info)
    this.tn_info.name = inputdata.name;
    this.tn_info.description = inputdata.description;
    this.tn_info.size = inputdata.size;
    console.log(`tn-manage-page: tn_info = ${JSON.stringify(this.tn_info)}`);
  }
}
