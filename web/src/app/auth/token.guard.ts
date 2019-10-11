import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.queryParams.token) {
      return true;
    }

    this.router.navigate(['/login'])
      .then(r => {
        return false;
      }).catch(r => {
      return false;
    });
  }
}
