import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  public currentUser: Observable<Object>;
  private currentUserSubject: BehaviorSubject<Object>;

  public constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Object {
    return this.currentUserSubject.value;
  }

  public login(body: HttpParams): Observable<Object> {
    localStorage.removeItem('currentUser');

    const headers = {
      'Authorization': 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret),
      'Content-type': 'application/x-www-form-urlencoded'
    };

    return this.http.post<Object>(environment.authUrl, body, {headers})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
