import {Component, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {Game} from '../../model/Game';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public gamePending = true;

  public placeAbleTile: Tile;

  private game: Game;

  constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
        if (this.game !== null) {
          this.onGameInitialized();
        }
      });
    this.messageService.joinGame.subscribe(
      // A player joined, do something here....
      /**
       * Step 1 get players (refresh players)
       * Step 2 Assign players somewhere in the dom
       * Step 3 Check if max players is reached
       * Step 4 if max players has reached, game can start
       */
    );
    this.messageService.turnEnded.subscribe(
      // A turn has ended, check if it is your turn
      /**
       * Step 1 message contains the user which turn has ended
       * Step 2 fetch the user turn. (API call or?)
       * Step 3 if it is somebody else turn, ignore response
       * Step 4 if current user turn, then enable controls and notify user
       */
    );
    // TODO In game guard to check whetether a game is in progress else redirect to home
    // For testing purposes we can create a room with just 1 person and play with 1 person
    // without turns to create the game mechanics
    // Load the game in steps:
    /**
     * Step 1 fetch the game of the user
     * Step 2 Connect to the correct room
     * Step 3 Wait until (enough) players join the game
     * Step 4 Fetch the board of this game when all players are joined
     * Step 5 start the game (Current rule: Initiator starts first)
     */
  }

  public onPlaceableTileChanged(tile: Tile): void {
    this.placeAbleTile = tile;
  }

  private onGameInitialized(): void {
    this.messageService.connect(this.game.id);
  }

  private onPlayerJoinedGame(): void {

  }

  private onTurnEnded(): void {

  }
}
