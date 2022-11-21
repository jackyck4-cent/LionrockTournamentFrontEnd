import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bout-grid-small',
  templateUrl: './bout-grid-small.component.html',
  styleUrls: ['./bout-grid-small.component.scss']
})
export class BoutGridSmallComponent implements OnInit {

  @Input()
  is_readonly: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
