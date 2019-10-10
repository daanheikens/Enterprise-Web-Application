import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {GameService} from '../../../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  noNewGame = false;


  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    // TODO: here query the user to find if the user already created a game, if so button should be continue;
  }

  /**
   * This is the trigger to create a new game
   */
  public onNewGame() {
    // Fallback to continue if this event gets triggered when it should not
    if (this.noNewGame) {
      this.onContinueGame();
      return;
    }

    const body = new HttpParams()
      .set('maxPlayers', '4')
      .set('maxTurnTime', '4')
      .set('maxPendingTime', '3600');
    this.gameService.create(body).pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public onContinueGame() {

  }
}
