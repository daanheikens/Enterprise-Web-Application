import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Game} from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public constructor(private readonly http: HttpClient) {
  }

  public create(body: HttpParams): Observable<Object> {
    return this.http.post<Object>(`${environment.apiUrl}/games`, body)
      .pipe(tap(game => {
        return game;
      }, error => {
        console.log(error);
      }));
  }

  /**
   * Gets the current game of the user, if available
   */
  public getCurrentGame(): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/games/current`)
      .pipe(tap(game => {
        return game;
      }, error => {
        console.log(error);
      }));
  }

  /**
   * Gets all the games available
   */
  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
      .pipe(tap(games => {
        return games;
      }, error => {
        console.log(error);
      }));
  }

  /**
   * Joins a game
   */
  public joinGame(body: HttpParams): Observable<Game> {
    return this.http.post<Game>(`${environment.apiUrl}/games/join`, body)
      .pipe(tap(game => {
        return game;
      }, error => {
        console.log(error);
      }));
  }
}
