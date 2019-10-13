import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        this.messageService.disconnect();
        this.authService.logout();
        this.router.navigate(['/login'])
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
