import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  public constructor(private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser['access_token']) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser['access_token']}`
        }
      });
    }
    return next.handle(request);
  }
}
