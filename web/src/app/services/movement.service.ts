import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Game} from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private readonly http: HttpClient) {
  }

  public movePawn(body: HttpParams): Observable<Boolean> {
    return this.http.post<Boolean>(`${environment.apiUrl}/movement`, body)
      .pipe(map(validMove => {
        return validMove;
      }));
  }
}
