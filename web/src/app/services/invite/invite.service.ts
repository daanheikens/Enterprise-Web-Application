import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Invite from '../../model/Invite';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private readonly http: HttpClient) {
  }

  public getInvites() {
    return this.http.get<Invite[]>(`${environment.apiUrl}/invites`)
      .pipe(map((events: Invite[]) => {
        return events;
      }));
  }
}
