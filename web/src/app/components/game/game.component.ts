import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  public gamePending = true;

  public placeableTile: Tile;

  public constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) {
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        if (data !== null) {
          this.messageService.connect(data.id);
        }
      });

    this.messageService.joinGame.subscribe(() => this.onPlayerJoinedGame());
    this.messageService.turnEnded.subscribe(() => this.onTurnEnded());
  }

  public ngOnDestroy(): void {
    this.messageService.disconnect();
  }

  public onPlaceableTileChanged(tile: Tile): void {
    this.placeableTile = tile;
  }

  public onTurnEnded(): void {
    // TODO send message to notify a turn end.
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
        if (data.currentPlayers.length >= data.maxPlayers) {
          this.gamePending = false;
          this.refreshPlayers();
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
  private onTurnChanged(): void {

  }

  private refreshPlayers(): void {

  }

  private renderBoard() {

  }
}
