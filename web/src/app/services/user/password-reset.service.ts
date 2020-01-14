import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  public constructor(private http: HttpClient) {
  }

  public requestNewPassword(body: HttpParams): Observable<Object> {
    return this.http.post(environment.resetUrl, body)
      .pipe(map(result => {
        return result;
      }));
  }

  public createNewPassword(token: string, body: HttpParams): Observable<Object> {
    return this.http.post(environment.resetUrl + `/${token}`, body)
      .pipe(map(result => {
        return result;
      }));
  }
}
