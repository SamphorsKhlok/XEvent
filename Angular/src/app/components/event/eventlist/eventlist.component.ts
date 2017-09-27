import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import { EventEmitter} from "@angular/core";

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  data: any;
  selectedData;

  @Output() emitter = new EventEmitter();
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getEvents().subscribe(
      (data)=> {
          this.data = data;
          },
          (error)=> console.error(error),
          ()=> console.info("fetching event completed")
    );
  }

  selectedItem(index){
    this.selectedData = this.data[index];
    //console.log(this.selectedData);
    this.emitter.emit(this.selectedData);
  }

}
