import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Game} from '../../model/Game';
import {Board} from '../../model/Board';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public placedTile: Observable<boolean>;
  private placedTileSubject = new Subject<boolean>();

  public constructor(private readonly http: HttpClient) {
    this.placedTile = this.placedTileSubject.asObservable();
    this.placedTileSubject.next(false);
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
        if (game === null) {
          return game;
        }
        game.currentPlayers.sort((userA, userB) => (userA.screenName > userB.screenName) ? 1 : ((userB.screenName > userA.screenName) ? -1 : 0));
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

  /**
   * Updates the board after movement.
   *
   * @param board Board
   * @param turnEnded
   */
  public updateBoard(board: Board): Promise<Game> {
    return this.http.patch<Game>(`${environment.apiUrl}/games/${board.gameId}`, {
      tiles: board.tiles,
      placeableTile: board.placeAbleTile,
      gameId: board.gameId
    }).toPromise();
  }

  M;

  public endTurn(gameId: number) {
    this.placedTileSubject.next(false);
    return this.http.post<Object>(`${environment.apiUrl}/games/${gameId}/turnEnded`, {}).toPromise();
  }

  public getPlacedTileSubject(): Subject<boolean> {
    return this.placedTileSubject;
  }
}
