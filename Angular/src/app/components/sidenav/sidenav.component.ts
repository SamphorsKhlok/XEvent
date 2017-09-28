import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { GlobalsService } from '../../services/globals.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAdmin: Boolean = false;
  user: Observable<firebase.User>;

  links = this.globals.links;
  plinks = this.globals.plinks;

  constructor(private profileService: ProfileService, private authService: AuthService, private globals: GlobalsService) {
    this.user = this.authService.getState();
    this.user.subscribe(
      r => {
        if (r && r.uid) {
          if (this.profileService.isAdmin(this.authService.getUserID())) {
            this.links = this.globals.adminLinks;
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
