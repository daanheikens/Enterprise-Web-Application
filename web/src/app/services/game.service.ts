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
    return this.http.post<Game>(`${environment.apiUrl}/games`, body)
      .pipe(map(game => {
        return game;
      }));
  }

  /**
   * Gets the current game of the user, if available
   */
  public getCurrentGame(): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/games/current`)
      .pipe(map(game => {
        return game;
      }));
  }

  /**
   * Gets all the games available
   */
  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
      .pipe(map(game => {
        return game;
      }));
  }
}
