import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public placeAbleTile: Tile;

  constructor() { }

  ngOnInit() {
  }

  onPlaceableTileChanged(tile: Tile) {
    this.placeAbleTile = tile;
  }
}
