import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TnInfo } from 'src/app/shared/tn_info';
import { DummyBackendService } from 'src/app/services/dummy-backend.service';
import { PlayerInfo } from 'src/app/shared/player_info';

// let dummy_tn_infos = Array.from(DUMMY_TN_INFOS.values());

@Component({
  selector: 'app-tn-list',
  templateUrl: './tn-list.component.html',
  styleUrls: ['./tn-list.component.scss']
})
export class TnListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'owner', 'start_date', 'end_date', 'status'];
  dataSource!: MatTableDataSource<TnInfo>;
  private all_players_info: Map<string, PlayerInfo>;
  private all_tn_info: Map<string, TnInfo>;

  constructor(private backend: DummyBackendService, private _liveAnnouncer: LiveAnnouncer) { 
    [this.all_players_info, this.all_tn_info] = this.backend.getTnList();
    this.dataSource = new MatTableDataSource(Array.from(this.all_tn_info.values()));
  }

  ngOnInit(): void {
    this.backend.getTnList();
  }

  @ViewChild(MatSort) sort!: MatSort; 

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
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
          case '2': return 'Final';
          case '4': return 'Semi-final';
          case '8': return 'Quarter-final';
          case '16': return 'Round of 16';
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
