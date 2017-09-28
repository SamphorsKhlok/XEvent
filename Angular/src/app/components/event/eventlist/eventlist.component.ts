import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import { EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  data = [];
  selectedData;
  skip: number = 0;

  @Output() emitter = new EventEmitter();
  @ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpService,
              public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(){
    this.http.getEvents(this.skip).subscribe(
      (data)=> {
        this.data = this.data.concat(data);
        //console.log(this.data);
        this.skip++;
      },
      (error)=> console.error(error),
      ()=> {
        console.info("fetching event completed")
      }
    );
  }

  selectedItem(index){
    this.selectedData = this.data[index];
    //console.log(this.selectedData);
    this.emitter.emit(this.selectedData);
  }

  onScroll () {
    //console.log('scrolled!!');
    this.getEvent();
  }

  filterByKeyword(keyword){

    this.http.searchEvents(0 , keyword).subscribe(
      (data)=> {
        //clear form data
        this.reset();
        this.data = this.data.concat(data);
      },
      (error)=> console.error(error),
      ()=> {
        console.info("fetching event completed")
      }
    );
  }

  reset(){
    this.data = [];
    this.selectedData = {};
  }

  deleteEvent(id){
    this.http.deleteEvent(id).subscribe(
      (data)=> {
        this.snackBar.open("Delete Successful", "Close" ,{
          duration: 2000,
        });
        this.refreshEvent();
      },
      (error)=> console.error(error),
      ()=> console.info("deleted completed")
    );
  }

  refreshEvent(){
    this.http.getEvents(this.skip).subscribe(
      (data)=> {
        this.data = [];
        this.data = this.data.concat(data);
        this.skip = 1;
      },
      (error)=> console.error(error),
      ()=> {
        console.info("refreshing event completed")
      }
    );
  }

}
