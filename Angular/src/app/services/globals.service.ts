import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

  // dev
  //public userUrl = 'http://radiant-hamlet-17220.herokuapp.com/users/';
  //public baseUrl:string = "http://localhost:3000/";
  public serverUrl = 'http://radiant-hamlet-17220.herokuapp.com/';

  urlPrefix = '';
  //urlPrefix = '/xevent';

  public links = [
    {
      title: "Home",
      icon: "home",
      link: this.urlPrefix+"/"
    },
    {
      title: "Profile",
      icon: "account_circle",
      link: this.urlPrefix+"/profile"
    },
  ];
  public plinks = [
    {
      title: "Home",
      icon: "home",
      link: this.urlPrefix+"/"
    }
  ];
  public adminLinks = [
    {
      title: "Home",
      icon: "home",
      link: this.urlPrefix+"/"
    },
    {
      title: "Profile",
      icon: "account_circle",
      link: this.urlPrefix+"/profile"
    },
    {
      title: "Event",
      icon: "event",
      link: this.urlPrefix+"/event"
    },
    {
      title: "User",
      icon: "assignment_ind",
      link: this.urlPrefix+"/user"
    }
  ];


  // prod
  /*


  */

  constructor() { }

}
