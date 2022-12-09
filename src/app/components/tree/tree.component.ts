import { Component, OnInit, Input } from '@angular/core';
import { TnInfo } from 'src/app/shared/tn_info';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() 
  tn_info!:TnInfo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tn_info )
  }

}
