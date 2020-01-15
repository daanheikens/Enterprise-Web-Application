import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Card from '../model/Card';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private readonly http: HttpClient) {
  }

  public getCurrentTreasureCard(gameId: number): Observable<Card> {
    return this.http.get<Card>(`${environment.apiUrl}/cards?gameId=${gameId}`)
      .pipe(tap(card => {
        return card;
      }, error => console.log(error)));
  }
}
