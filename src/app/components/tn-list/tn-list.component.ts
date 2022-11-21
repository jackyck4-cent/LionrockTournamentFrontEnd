import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DUMMY_TN_INFOS} from '../../shared/dummy_data'
import { TnInfo } from 'src/app/shared/tn_info';

let dummy_tn_infos = Array.from(DUMMY_TN_INFOS.values());

@Component({
  selector: 'app-tn-list',
  templateUrl: './tn-list.component.html',
  styleUrls: ['./tn-list.component.scss']
})
export class TnListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'owner', 'start_date', 'end_date', 'status'];
  dataSource = new MatTableDataSource(dummy_tn_infos);

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
