import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Game} from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly http: HttpClient) {
  }

  public create(body: HttpParams): Observable<Game> {
    console.log(body);
    return this.http.post<Game>(`${environment.apiUrl}/game`, body)
      .pipe(map(game => {
        return game;
      }));
  }
}
