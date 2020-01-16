import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {Message, MessageType} from '../../model/Message';
import {Board} from '../../model/Board';
import {PawnFactory} from '../../lib/factories/PawnFactory';
import {Pawn} from '../../model/Pawn';
import {Game} from '../../model/Game';
import Turn from '../../model/Turn';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import Card from '../../model/Card';
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

  private turn: Turn;

  private card: Card;

  public constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService,
    private readonly cardService: CardService,
    private readonly router: Router
  ) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderPawn();
    }, 750);
  }


  public ngOnInit(): void {
    this.gameService.getCurrentGame()
      .toPromise()
      .then(data => {
        if (data !== null) {
          this.renderBoard(data);
          this.cardService.getCurrentTreasureCard(data.id).subscribe((card: Card) => this.card = card);
          this.messageService.connect(data.id);
        } else {
          this.router.navigate(['/home']);
        }
      });

    this.messageService.joinGame.subscribe(() => this.onPlayerJoinedGame());
    this.messageService.leaveGame.subscribe(() => this.onPlayerLeftRoom());
    this.messageService.turnEnded.subscribe(() => this.onTurnChanged());
    this.messageService.gameFinished.subscribe(() => this.quitGame());
  }

  public ngOnDestroy(): void {
    this.messageService.disconnect(this.game ? this.game.id : undefined);
  }

  public onPlaceableTileChanged(tile: Tile): void {
    this.placeableTile = tile;
  }

  /**
   * This is a promise since we want to send the message after the response has been returned
   */
  public onTurnEnded(turn: Turn): void {
    this.gameService.endTurn(this.game.id)
      .then(() => {
        this.messageService.sendMessage(new Message(MessageType.CHAT_MESSAGE, `<b>${turn.tileInsertedMessage}</b>`), this.game.id);
        if (turn.withTreasure) {
          this.messageService.sendMessage(new Message(MessageType.CHAT_MESSAGE, '<b>Found a treasure!</b>'), this.game.id);
        }
        this.messageService.sendMessage(new Message(MessageType.TURN_ENDED), this.game.id);
        this.messageService.sendMessage(new Message(MessageType.CHAT_MESSAGE, '<b>Ended turn</b>'), this.game.id);
        this.cardService.getCurrentTreasureCard(this.game.id).subscribe((card: Card) => this.card = card);
      })
      .catch(error => {
          console.log(error);
        }
      )
      .finally(() => {
        this.isTurn = false;
        this.turnCanEnd = false;
      });
  }

  private onPlayerJoinedGame(): void {
    this.gameService.getCurrentGame()
      .toPromise()
      .then(game => {
        this.renderBoard(game);
        this.renderPawn();
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

  private onTurnCanEnd(turn: Turn): void {
    this.turnCanEnd = true;
    this.turn = turn;
  }

  // A turn has changed, refresh the game
  private onTurnChanged(): void {
    this.gameService.getCurrentGame()
      .toPromise()
      .then(data => {
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
        this.gameService.getPlacedTileSubject().next(false);
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
      .catch(error => console.log(error));
  }

  private onGameEnd() {
    this.messageService.sendMessage(new Message(MessageType.END_GAME), this.game.id);
  }

  private quitGame() {
    this.router.navigate(['/home']);
  }
}
