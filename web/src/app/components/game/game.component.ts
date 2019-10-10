import {Component, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {Game} from '../../model/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public placeAbleTile: Tile;

  private readonly game: Game;

  constructor(private gameService: GameService) {}

  ngOnInit() {
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

  public onPlaceableTileChanged(tile: Tile) {
    this.placeAbleTile = tile;
  }
}
