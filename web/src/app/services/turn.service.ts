import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {debounceTime, map, tap} from 'rxjs/operators';
import TurnResult from '../model/TurnResult';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private readonly http: HttpClient) {
  }

  public movePawn(body: HttpParams): Observable<TurnResult> {
    return this.http.post<TurnResult>(`${environment.apiUrl}/turn`, body)
      .pipe(
        debounceTime(500),
        tap(validMove => {
          return validMove;
        }, error => console.log(error)));
  }
}
