import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  item;
  list:any = [
    {
      Title: "BoilerMake",
      Remark: "Some remark here",
      Address: {
        state: "IN",
        city: "West Lafayeet"
      },
      Location : [123456,232323],
      Date: "29 Oct 2017",
      Detail: "ting tong ting tong",
      Url: "https://boilermake.org/",
      Tags:["Java", "Big Data", "Angular4"]
    },
    {
      Title: "BoilerMake",
      Remark: "Some remark here",
      Address: {
        state: "IN",
        city: "West Lafayeet"
      },
      Location : [123456,232323],
      Date: "29 Oct 2017",
      Detail: "ting tong ting tong",
      Url: "https://boilermake.org/",
      Tags:["Mongo DB", "Big Data", "PHP"]
    },
    {
      Title: "BoilerMake",
      Remark: "Some remark here",
      Address: {
        state: "IN",
        city: "West Lafayeet"
      },
      Location : [123456,232323],
      Date: "29 Oct 2017",
      Detail: "ting tong ting tong",
      Url: "https://boilermake.org/",
      Tags:["Java", "Big Data", "Angular4"]
    },
    {
      Title: "BoilerMake",
      Remark: "Some remark here",
      Address: {
        state: "IN",
        city: "West Lafayeet"
      },
      Location : [123456,232323],
      Date: "29 Oct 2017",
      Detail: "ting tong ting tong The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      Url: "https://boilermake.org/",
      Tags:["C#", "Google", "NodeJS"]
    }
  ];

  constructor() { }

  passingData(value){
    this.item = value;
    //console.log("selected item is "+ JSON.stringify(this.item));
  }

  ngOnInit() {

  }

}
