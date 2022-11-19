import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface TnInfo {
  name: string;
  tn_id: string;
  owner: string;
  start_date: string;
  end_date: string;
  status: string;
}

const TN_INFOS: TnInfo[] = [
  {name: 'Street Basketball', tn_id: '11111', owner: 'John', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Enrolling, registered 6 out of 16'},
  {name: 'Funny Volley Ball', tn_id: '22222', owner: 'Mary', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Final'},
  {name: 'Wonderful Fencing', tn_id: '33333', owner: 'Peter', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Semi-Final'},
  {name: 'Stupid Fight', tn_id: '44444', owner: 'Jessica', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Draft'},
  {name: 'No Name Table Tennis', tn_id: '55555', owner: 'Aaron', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Final'},
  {name: 'WTF Badminton', tn_id: '66666', owner: 'Zeus', start_date: '2022-11-20', end_date: '2022-11-27', status: 'Champion is Venus'},
];

@Component({
  selector: 'app-tn-list',
  templateUrl: './tn-list.component.html',
  styleUrls: ['./tn-list.component.scss']
})
export class TnListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'owner', 'start_date', 'end_date', 'status'];
  dataSource = new MatTableDataSource(TN_INFOS);

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
