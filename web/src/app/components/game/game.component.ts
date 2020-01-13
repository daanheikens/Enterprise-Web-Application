import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {Message, MessageType} from '../../model/Message';
import {Board} from '../../model/Board';
import {PawnFactory} from '../../lib/factories/PawnFactory';
import {Pawn} from '../../model/Pawn';
import {Game} from '../../model/Game';
import {GameService} from '../../services/game/game.service';
import {MessageService} from '../../services/messaging/message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {

  public gamePending = true;

  public placeableTile: Tile;

  public turnCanEnd = false;

  private game: Game;

  private board: Board;

  private isTurn = false;

  private userPawn: Pawn;

  private placedTile = false;

  public constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderPawn();
    }, 750);
  }


  public ngOnInit(): void {
    this.gameService.getCurrentGame().toPromise()
      .then(data => {
        if (data !== null) {
          this.renderBoard(data);
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
    this.gameService.endTurn(this.game.id)
      .then(() => this.messageService.sendMessage(new Message(MessageType.TURN_ENDED), this.game.id))
      .catch(error => console.log(error)
      );
  }

  private onPlayerJoinedGame(): void {
    this.gameService.getCurrentGame()
      .subscribe(game => {
        if (game.currentPlayers.length >= game.maxPlayers) {
          this.gamePending = false;
          this.game = game;
          for (let player of game.currentPlayers) {
            if (game.userTurn.userId === player.userId) {
              player.isTurn = true;
              break;
            }
          }
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
          this.renderBoard(data);
          this.renderPawn();
        }
      });
  }

  private renderBoard(game: Game) {
    this.game = game;
    this.board = new Board(game.matrix, game.currentPlayers, game.user, game.placeAbleTile, game.id);
    if (game.user.userId === game.userTurn.userId) {
      this.isTurn = game.user.userId === game.userTurn.userId;
      if (this.isTurn === true) {
        this.placedTile = false;
        this.placeableTile = game.placeAbleTile;
      }
    }
    for (let player of game.currentPlayers) {
      if (game.userTurn.userId === player.userId) {
        player.isTurn = true;
        break;
      }
    }
  }

  private renderPawn() {
    this.userPawn = PawnFactory.createPawns(this.board);
  }

  private onPlayerLeftRoom(): void {

  }

  private onBoardChanged(board: Board) {
    this.gameService.updateBoard(board)
      .then(() => this.board = board)
      .catch(error => console.log(error)
      );
  }
}
