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

  private game: Game;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  public onPlaceableTileChanged(tile: Tile) {
    this.placeAbleTile = tile;
  }
}
