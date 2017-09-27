import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {
  baseUrl:string = "http://localhost:3000/";
  eventPage: string = "events";
  url: string = "";
  body = {};
  headers : HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer:')
    //this.headers = new HttpHeaders().set('Authorization', 'Bearer:'+ this.auth.getUserToken())
  }

  //service for event
  addEvent(){
    this.url = this.baseUrl+this.eventPage+ '/add';
    //with token TODO: add token later
    //return this.http.post(this.url,this.body,{headers: this.headers});
    return this.http.post(this.url,this.body);
  }

  getEvents(skip){
    this.url = this.baseUrl + this.eventPage + '?skip=' + skip;
    return this.http.get(this.url);
  }

  searchEvents(uid, skip, keyword){
    this.url = this.baseUrl + this.eventPage + '/search?keyword=' + keyword;
    return this.http.get(this.url);
  }

  deleteEvent(id){
    this.url = this.baseUrl + this.eventPage + '/delete/'+ id;
    return this.http.get(this.url);
  }

  updateEvent(obj){
    this.body = { data: obj};
    this.url = this.baseUrl + this.eventPage + '/update';
    return this.http.post(this.url, this.body,{headers: this.headers} );
  }

}
