import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private readonly http: HttpClient) {
  }

  public move(body: HttpParams): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/move`, body)
      .pipe(map(validMove => {
        return validMove;
      }));
  }
}
