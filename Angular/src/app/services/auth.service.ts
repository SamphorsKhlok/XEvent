import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userinfo: any;
  token;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userinfo = user;
        }
      });
  }

  getState() {
    return this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(r => { this.router.navigateByUrl('/profile'); });
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
    this.userinfo.getToken().then(t => console.log("Token " + t));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(r => this.router.navigateByUrl(''));
  }

  getUserInfo() {
    return this.userinfo;
  }

}
