import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../../services/game/game.service';
import {Game} from '../../../model/Game';
import {Router} from '@angular/router';
import {GameFormComponent} from '../../game-form/game-form.component';
import Invite from '../../../model/Invite';
import {InviteService} from '../../../services/invite/invite.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @ViewChild(GameFormComponent, {static: false})
  private gameForm: GameFormComponent;
  private game: Game;
  private invitesCount: number;

  public constructor(
    private readonly gameService: GameService,
    private readonly inviteService: InviteService,
    private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe((game: Game) => this.game = game);
    this.inviteService.getInvites().subscribe((invites: Invite[]) => this.invitesCount = invites ? invites.length : 0);
  }

  public continueGame(): void {
    this.router.navigate(['/game']);
  }

  public showModal(): void {
    this.gameForm.showModal();
  }
}
