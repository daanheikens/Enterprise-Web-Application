import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../model/Game';
import {first} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private game: Game;
  private inGame = false;

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router) {

  }

  ngOnInit() {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
        if (this.game !== null) {
          this.inGame = true;
        }
      });
  }

  /**
   * This is the trigger to create a new game
   */
  public onGameClick() {
    if (this.inGame) {
      return this.continueGame();
    }

    const body = new HttpParams()
      .set('maxPlayers', '4')
      .set('maxTurnTime', '4')
      .set('maxPendingTime', '3600');

    this.gameService.create(body).pipe(first())
      .subscribe(
        data => {
          this.game = data;
          return this.router.navigate(['/game']);
        });

  }

  private continueGame() {
    return this.router.navigate(['/game']);
  }
}
