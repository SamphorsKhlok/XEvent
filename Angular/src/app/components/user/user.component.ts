import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private userService: UserService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.userService.getUsers(0, 10).subscribe(
      r => {
        const d = JSON.parse(r);
        let num = 1;
        //console.log(d);
        d.forEach(r2 => {
          // if user is admin, dont show in list
          if (r2.role != 2) {
            data.push({
              pos: num++,
              name: r2.name,
              userID: r2.userID,
              email: r2.email,
              role: r2.role,
              enabled: r2.enabled
            });
          }
          this.dataSource = new UserDataSource(data);
        });

      },
      err => console.log(err)
    );
  }

  changeRole(uid) {
    console.log("clicked " + uid);
  }

  enable(uid){
    console.log("enabled fn clicked " + uid);
  }
}

// populate on table
export class UserDataSource extends DataSource<any> {
  constructor(private d) {
    super();
  }
  // Connect function called by the table to retrieve one stream containing the data to render.
  connect(): Observable<Element[]> {
    return Observable.of(this.d);
  }
  disconnect() { }
}
