import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {MessageService} from '../../services/message.service';
import {User} from '../../model/User';
import {Message, MessageType} from '../../model/Message';
import {Board} from '../../model/Board';
import {error} from 'util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  public gamePending = true;

  public placeableTile: Tile;

  public turnCanEnd: boolean;

  private gameId: number;

  private board: Board;

  private isTurn = false;

  public constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) {
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        if (data !== null) {
          this.gameId = data.id;
          this.board = new Board(data.matrix, data.currentPlayers, data.user, data.placeAbleTile, data.id);
          this.isTurn = data.user.userId === data.userTurn.userId;
          this.messageService.connect(data.id);
        }
      });

    this.messageService.joinGame.subscribe(() => this.onPlayerJoinedGame());
    this.messageService.leaveGame.subscribe(() => this.onPlayerLeftRoom());
    this.messageService.turnEnded.subscribe(() => this.onTurnChanged());
  }

  public ngOnDestroy(): void {
    this.messageService.disconnect();
  }

  public onPlaceableTileChanged(tile: Tile): void {
    this.placeableTile = tile;
  }

  /**
   * This is a promise since we want to send the message after the response has been returned
   */
  public onTurnEnded(): void {
    this.gameService.updateBoard(this.board)
      .then(() => this.messageService.sendMessage(new Message(MessageType.TURN_ENDED), this.gameId))
      .catch(error => console.log(error)
      );
  }

  private onPlayerJoinedGame(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        if (data.currentPlayers.length >= data.maxPlayers) {
          this.gamePending = false;
          this.refreshPlayers(data.currentPlayers);
        }
      });
  }

  private onTurnCanEnd(): void {
    this.turnCanEnd = true;
  }

  // A turn has changed, refresh the game
  private onTurnChanged(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        if (data !== null) {
          this.gameId = data.id;
          this.board = new Board(data.matrix, data.currentPlayers, data.user, data.placeAbleTile, data.id);
          this.isTurn = data.user.userId === data.userTurn.userId;
        }
      });
  }

  private refreshPlayers(users: User[]): void {

  }

  private onPlayerLeftRoom(): void {

  }
}
