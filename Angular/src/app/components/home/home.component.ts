import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = [];
  selectedData;
  skip: number = 0;

  @ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpService) { }

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

  viewEvent(id){
    //get this id detail;
  }

}
