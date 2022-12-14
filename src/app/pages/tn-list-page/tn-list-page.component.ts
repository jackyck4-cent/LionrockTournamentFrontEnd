import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApibackendService } from 'src/app/services/apibackend.service';
import { TnListFilterServiceService } from 'src/app/services/tn-list-filter-service.service';
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'app-tn-list-page',
  templateUrl: './tn-list-page.component.html',
  styleUrls: ['./tn-list-page.component.scss']
}) 
export class TnListPageComponent implements OnInit {
  currentUser: any = {};
  
  opt_enrolling: boolean = true;
  opt_started: boolean = true;
  opt_completed: boolean = true;
  opt_draft: boolean = true;

  constructor(private filterService: TnListFilterServiceService,
    public backend: ApibackendService,
    public authService: AuthService,
    private router: Router) { 

     
    } 

  ngOnInit(): void {
  }

  private updateList(): void {
    let filter: string[] = [];
    if (this.opt_enrolling) filter.push('enrolling');
    if (this.opt_started) filter.push('started');
    if (this.opt_completed) filter.push('completed');
    if (this.opt_draft) filter.push('draft');
    this.filterService.change(filter);
  }

  toggleFilter(ft: string): void {
    switch(ft) {
      case "enrolling": this.opt_enrolling = !this.opt_enrolling; break;
      case "started": this.opt_started = !this.opt_started; break;
      case "completed": this.opt_completed = !this.opt_completed; break;
      case "draft": this.opt_draft = !this.opt_draft; break;
    }
    console.log(`toggleFilter('${ft}')`);
    console.log(`  draft=${this.opt_draft}, enrolling=${this.opt_enrolling}, started=${this.opt_started}, completed=${this.opt_completed}`);
    this.updateList();
  }

  onButton(btn: string) {
    if (btn == 'create-tn') {
      this.router.navigate(['tn-create']);
    }
  }
}
