import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) {}

  requestNewPassword(body: HttpParams) {
    return this.http.post(environment.resetUrl, body)
      .pipe(map(result => {
        return result;
      }));
  }

  createNewPassword(token: string, body: HttpParams) {
    return this.http.post(environment.resetUrl + `/${token}`, body)
      .pipe(map(result => {
        return result;
      }));
  }
}
