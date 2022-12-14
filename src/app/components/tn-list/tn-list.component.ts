import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TnInfo } from 'src/app/shared/tn_info';
import { PlayerInfo } from 'src/app/shared/player_info';
import { TnListFilterServiceService } from 'src/app/services/tn-list-filter-service.service';
import { ApibackendService } from '../../services/apibackend.service';
// let dummy_tn_infos = Array.from(DUMMY_TN_INFOS.values());
 
@Component({
  selector: 'app-tn-list',
  templateUrl: './tn-list.component.html',
  styleUrls: ['./tn-list.component.scss']
})
export class TnListComponent implements OnInit, AfterViewInit {

  @Input()
    latest:string = "";

  displayedColumns: string[] = ['name', 'owner', /*'start_date', 'end_date',*/ 'status'];
  dataSource!: MatTableDataSource<TnInfo>;
  private all_players_info!: Map<string, PlayerInfo>;
  private all_tn_info!: Map<string, TnInfo>;
 
  constructor(
    private filterService: TnListFilterServiceService,
    private _liveAnnouncer: LiveAnnouncer,
    private apibackend:ApibackendService
    ) { 
  }

  ngOnInit(): void {

    this.filterService.filterHasChanged().subscribe((filters: string[]) => {
      /*
      Jacky
      Change to ajax call also provide token
      if it is logged user , tab menu exist for filtering
      if it is non-logged , disaply only publish tournment
      */
      if (this.latest == "yes") {
        filters = ['latest'];
      }
      console.log(`filterHasChanged(): filters = ${filters}`);

      this.apibackend.getTnFullList(filters).subscribe((res) => {
        if (res.status == 1) {
          if (res.data.players && res.data.tournaments) {
            this.all_players_info = new Map(Object.entries(res.data.players))
            this.all_tn_info = new Map(Object.entries(res.data.tournaments));
            this.dataSource = new MatTableDataSource(Array.from(this.all_tn_info.values()));
            this.dataSource.sort = this.sort;
          }
        }
      });
    });
    this.filterService.change(['all']);
  }

  @ViewChild(MatSort) sort!: MatSort; 

  ngAfterViewInit() {
    
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getUserName(user_id: string): string {
    return this.all_players_info.get(user_id)?.name || '<unknown-user>';
  }

  getStatusDisplay(tn_info: TnInfo): string {
    switch (tn_info.status) {
      case 'enrolling':
        let vacancy = tn_info.size - tn_info.players.length;
        if (vacancy == 0) {
          return `Enrolling, full`;
        }
        if (vacancy == 1) {
          return `Enrolling, ${vacancy} vacancy`;
        }
        return `Enrolling, ${vacancy} vacancies`;
        
      case 'started':
        switch (tn_info.current_round) {
          case '_2': return 'Started (Final)';
          case '_4': return 'Started (Semi-final)';
          case '_8': return 'Started (Quarter-final)';
          case '_16': return 'Started (Round of 16)';
        }
        return '';
      case 'completed':
        return `Champion is ${this.getUserName(tn_info.champion)}`;
      case 'draft':
        return 'Draft';
    }
    return '';
  }
}
