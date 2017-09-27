import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title;
  user: Observable<firebase.User>;
  userinfo: any;
  constructor(private authService: AuthService) {
    this.user = this.authService.getUserInfo();
    //this.user = this.authService.getState();
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }

}
