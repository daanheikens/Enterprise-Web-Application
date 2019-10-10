import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../model/Game';
import {MessageService} from '../../../services/message.service';
import {Message, MessageType} from '../../../model/Message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  private game: Game;
  private inGame = false;

  constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService) {
  }

  ngOnInit() {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.game instanceof Game) {
        this.inGame = true;
      }
    });
  }

  /**
   * This is the trigger to create a new game
   */
  public onGameClick() {
    if (this.inGame) {
      this.continueGame();
      return;
    }

    const body = new HttpParams()
      .set('maxPlayers', '4')
      .set('maxTurnTime', '4')
      .set('maxPendingTime', '3600');

    this.gameService.create(body).pipe(first())
      .subscribe(
        data => {
          this.game = data;
        });

    console.log("sending message");
    this.messageService.sendMessage(
      new Message(MessageType.JOIN_GAME, "joost", "daan"),
      this.game.id
    )
  }

  private continueGame() {

  }
}
