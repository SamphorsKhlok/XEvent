import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import { Observable } from "rxjs/Rx";
import {Injectable} from "@angular/core";

@Injectable()
export class Guard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //console.log(route);
    //console.log(state);
    //console.log(route.params.id);

    // if (false){
    //   this.router.navigate(['/error']);
    //   return false;
    // }

    return true;

  }
}
