import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {Game} from '../../model/Game';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  public gamePending = true;

  public placeAbleTile: Tile;

  private game: Game;

  public constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) {
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
        if (this.game !== null) {
          this.onGameInitialized();
        }
      });
    this.messageService.joinGame.subscribe(() => this.onPlayerJoinedGame());
    this.messageService.turnEnded.subscribe(() => this.onTurnEnded());
  }

  public ngOnDestroy(): void {
    this.messageService.disconnect();
  }

  public onPlaceableTileChanged(tile: Tile): void {
    this.placeAbleTile = tile;
  }

  private onGameInitialized(): void {
    this.messageService.connect(this.game.id);
  }

  /**
   * Step 1 get players (refresh players)
   * Step 2 Assign players somewhere in the dom
   * Step 3 Check if max players is reached
   * Step 4 if max players has reached, game can start
   */
  private onPlayerJoinedGame(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
        this.refreshPlayers();
        if (this.game.currentPlayers >= this.game.maxPlayers) {
          this.renderBoard();
          this.gamePending = false;
        }
      });
  }

  // A turn has ended, check if it is your turn
  /**
   * Step 1 message contains the user which turn has ended
   * Step 2 fetch the user turn. (API call or?)
   * Step 3 if it is somebody else turn, ignore response
   * Step 4 if current user turn, then enable controls and notify user
   */
  private onTurnEnded(): void {

  }

  private refreshPlayers(): void {

  }

  private renderBoard() {

  }
}
