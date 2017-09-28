import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { GlobalsService } from './globals.service';

@Injectable()
export class HttpService {

  //baseUrl:string = "http://localhost:3000/";
  //baseUrl:string = "http://radiant-hamlet-17220.herokuapp.com/";
  baseUrl = this.globals.serverUrl;
  eventPage: string = "events";
  url: string = "";
  body = {};
  headers : HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthService,private globals: GlobalsService) {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer:')
    //this.headers = new HttpHeaders().set('Authorization', 'Bearer:'+ this.auth.getUserToken())
  }

  //service for event
  saveEvent(obj,id){
    this.url = this.baseUrl+this.eventPage+ '/save';
    this.body = {
      data: obj,
      id : id
    };
    //with token TODO: add token later
    //return this.http.post(this.url,this.body,{headers: this.headers});
    return this.http.post(this.url,this.body);
  }

  getEvents(skip){
    this.url = this.baseUrl + this.eventPage + '?skip=' + skip;
    return this.http.get(this.url);
  }

  searchEvents(skip, keyword){
    this.url = this.baseUrl + this.eventPage + '/search';
    this.body = {
      skip: skip,
      keyword: keyword,
    };
    return this.http.post(this.url, this.body);
  }

  deleteEvent(id){
    this.url = this.baseUrl + this.eventPage + '/remove/'+ id;
    return this.http.get(this.url);
  }

  updateEvent(obj){
    this.body = { data: obj};
    this.url = this.baseUrl + this.eventPage + '/update';
    return this.http.post(this.url, this.body,{headers: this.headers});
  }

  registerUser(obj){
    this.body = { userID: obj.userID, eventID: obj.eventID};
    this.url = this.baseUrl + this.eventPage + '/register';
    return this.http.post(this.url, this.body);
  }

}
