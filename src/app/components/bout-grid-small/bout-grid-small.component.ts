import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { DUMMY_BOUTS_INFOS } from 'src/app/shared/dummy_bouts_data';
import {DUMMY_TN_INFOS} from '../../shared/dummy_data'

let dummy_bouts_infos = Array.from(DUMMY_BOUTS_INFOS.values());

@Component({
  selector: 'app-bout-grid-small',
  templateUrl: './bout-grid-small.component.html',
  styleUrls: ['./bout-grid-small.component.scss']
})
export class BoutGridSmallComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['tn_id', 'round_id', 'match_id', 'player_1', 'player_2', 'score_1', 'score_2', 'winner', 'status'];
  //displayedColumns: string[] = ['name', 'owner', 'start_date', 'end_date', 'status'];
  dataSource = new MatTableDataSource(dummy_bouts_infos);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
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
}
