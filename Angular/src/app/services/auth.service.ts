import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { LocalStorageService } from 'ng2-webstorage';

import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userinfo: any;
  private token;
  private uid;
  private email;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService) {

    if (this.localStorageService.retrieve('userinfo.uid')) {
      this.token = this.localStorageService.retrieve('ftoken');
      this.userinfo = this.localStorageService.retrieve('userinfo');
    }
    /*this.user = afAuth.authState;
    this.user.subscribe(
      (u) => {
        if (u) {
          console.log('constructor...' + u.uid);
          this.uid = u.uid;
          this.email = u.email;
          this.userinfo = u;
        }
      });*/
  }

  getState() {
    return this.afAuth.authState;
  }

  checkLoggedIn() {
    this.user.subscribe(
      (user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(r => {
        // if user login for first time, lets save his data on mongodb

        this.afAuth.authState.subscribe(
          (u) => {
            if (u) {
              this.profileService.getUser(u.uid).subscribe(
                (r2) => {
                  if (JSON.parse(r2.userData)[0]) {
                    console.log('Returning user: ' + r2.userData);
                    this.router.navigateByUrl('/event');
                    this.localStorageService.store('urole', JSON.parse(r2.userData)[0].role);
                  } else {
                    console.log('New user: Add to db');
                    this.profileService.saveForFirstTime(u.uid, u.email, this.getUserToken())
                      .subscribe(r3 => { this.router.navigateByUrl('/event') });
                  }
                }
              );
              // store in local storage
              this.localStorageService.store('userinfo', JSON.stringify(u));
              u.getIdToken().then(
                tok => this.localStorageService.store('ftoken', tok));
            }
          });

      });
  }

  /*
  updateProfile() {
    this.userinfo.updateProfile({
      displayName: "Nati G",
      photoURL: "https://example.com/profile.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  } */

  /*
  getToken() {
    //return this.token;

    this.userinfo.getToken().then(t => {
      console.log("Token " + t);
      this.token = t;
    });
  }*/

  logout() {
    this.afAuth.auth.signOut()
      .then(r => {
        this.localStorageService.clear('userInfo');
        this.localStorageService.clear('ftoken');
        this.localStorageService.clear('urole');
        this.router.navigateByUrl('');
      });
  }

  getUserInfo() {
    return JSON.parse(this.localStorageService.retrieve('userinfo'));
  }

  getUserID() {
    const obj = JSON.parse(this.localStorageService.retrieve('userinfo'));
    if (obj && obj.uid) {
      return obj.uid;
    }
    return null;
  }

  getUserToken() {
    return this.localStorageService.retrieve('ftoken');
  }

}
