import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  public constructor(private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.queryParams.token) {
      return true;
    }

    this.router.navigate(['/login'])
      .then(() => {
        return false;
      }).catch(() => {
      return false;
    });
  }
}
