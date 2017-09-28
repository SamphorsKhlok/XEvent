import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAdmin: Boolean = false;
  user: Observable<firebase.User>;

  links = [
    {
      title: "Home",
      icon: "home",
      link: "/"
    },
    {
      title: "Profile",
      icon: "account_circle",
      link: "/profile"
    },
  ];
  plinks = [
    {
      title: "Home",
      icon: "home",
      link: "/"
    }
  ];

  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.user = this.authService.getState();
    this.user.subscribe(
      r => {
        if (r && r.uid) {
          if (this.authService.getUserID()) {
            this.isAdmin = this.profileService.isAdmin(this.authService.getUserID());
          }
          if (this.isAdmin) {
            this.links = [
              {
                title: "Home",
                icon: "home",
                link: "/"
              },
              {
                title: "Profile",
                icon: "account_circle",
                link: "/profile"
              },
              {
                title: "Event",
                icon: "event",
                link: "/event"
              },
              {
                title: "User",
                icon: "assignment_ind",
                link: "/user"
              }
            ];
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
