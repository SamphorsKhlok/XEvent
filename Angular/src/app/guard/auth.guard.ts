import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.getState().map(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }

}
