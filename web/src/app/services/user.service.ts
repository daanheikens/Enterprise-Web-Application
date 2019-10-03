import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}

  public register(body: FormData): Observable<User> {
    return this.http.post<User>(environment.registerUrl, body)
      .pipe(map(user => {
        return user;
      }));
  }
}
