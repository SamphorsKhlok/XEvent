import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
@Input() data;
  constructor() { }

  ngOnInit() {
  }

}
