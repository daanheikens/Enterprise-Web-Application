import {Component, OnInit} from '@angular/core';
import Invite from '../../model/Invite';
import {InviteService} from '../../services/invite/invite.service';
import {HttpParams} from '@angular/common/http';
import {GameService} from '../../services/game/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  public invites: Invite[];

  constructor(
    private readonly inviteService: InviteService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.inviteService.getInvites().subscribe((invites: Invite[]) => this.invites = invites, (error => console.log(error)));
  }

  public joinGame(gameId: number, inviteId: number) {
    const body = new HttpParams()
      .set('gameId', String(gameId))
      .set('inviteId', String(inviteId));

    this.gameService.joinGame(body).subscribe(() => this.router.navigate(['/game']));
  }
}
