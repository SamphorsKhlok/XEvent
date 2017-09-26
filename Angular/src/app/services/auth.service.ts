import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

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
    private profileService: ProfileService) {

    this.user = afAuth.authState;
    this.user.subscribe(
      (u) => {
        if (u) {
          console.log('constructor...' + u.uid);
          this.uid = u.uid;
          this.email = u.email;
          this.userinfo = u;
        }
      });
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
                  if (r2.userData.length > 2) {
                    console.log('Returning user: ' + r2.userData);
                    this.router.navigateByUrl('/event');
                  } else {
                    console.log('tryn to add user');
                    this.profileService.saveForFirstTime(this.uid, this.email)
                      .subscribe(r3 => { this.router.navigateByUrl('/event') });
                  }
                }
              );
            }
          });

      });
  }

  updateProfile() {
    this.userinfo.updateProfile({
      displayName: "Nati G",
      photoURL: "https://example.com/profile.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  getToken() {
    this.userinfo.getToken().then(t => {
      console.log("Token " + t);
      this.token = t;
    });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(r => this.router.navigateByUrl(''));
  }

  getUserInfo() {
    return this.userinfo;
  }

  getUserID() {
    return this.uid;
  }

  getUserToken(){
    if(!this.token){
      this.getToken();
    }

    return this.token;
  }

}
