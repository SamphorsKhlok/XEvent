import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

export interface Element {
  pos: Number;
  name: string;
  userID: string;
  email: string;
  role: string;
  enabled: string;
}
const data: Element[] = [];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['pos', 'name', 'email', 'role', 'action'];
  dataSource;

  constructor(private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.getData();
  }

  getData() {
    data.length = 0;
    this.userService.getUsers(0, 10).subscribe(
      r => {
        const d = JSON.parse(r);
        let num = 1;
        //console.log(d);
        d.forEach(r2 => {
          data.push({
            pos: num++,
            name: r2.name,
            userID: r2.userID,
            email: r2.email,
            role: r2.role,
            enabled: r2.enabled
          });
          this.dataSource = new UserDataSource(data);
        });

      },
      err => console.log(err)
    );
  }

  changeRole(uid, roleId) {
    console.log("clicked " + uid + ' ' + roleId);
    this.userService.changeRole(uid, roleId).subscribe(
      r => {
        console.log(r);
        // if success, update data binded with table
        if (r.status === 1) {
          data.forEach(d => {
            if (d.userID === uid) {
              d.role = roleId;
            }
          });
        }
      },
      err => console.log(err)
    );
  }

  changeAccessLevel(uid, accessId) {
    console.log("enabled fn clicked " + uid + ' ' + accessId);
    this.userService.changeAccessLevel(uid, accessId).subscribe(
      r => {
        console.log(r);
        // if success, update data binded with table
        if (r.status === 1) {
          data.forEach(d => {
            if (d.userID === uid) {
              d.enabled = accessId;
            }
          });
        }
      },
      err => console.log(err)
    );
  }
}

// populate data on table
export class UserDataSource extends DataSource<any> {
  constructor(private userData) {
    super();
  }
  // Connect function called by the table to retrieve one stream containing the data to render.
  connect(): Observable<Element[]> {
    return Observable.of(this.userData);
  }
  disconnect() { }
}
