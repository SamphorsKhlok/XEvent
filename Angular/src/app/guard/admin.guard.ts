import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.getState().map(auth => {
      // check if logged in first
      if (!auth) {
        this.router.navigate(['/error']);
        return false;
      } else {
        // check if logged in user is admin
        if (this.profileService.isAdmin(this.authService.getUserID())) {
          return true;
        } else {
          this.router.navigate(['/error']);
          return false;
        }
      }
    });
  }
}
