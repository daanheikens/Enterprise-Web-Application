import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  @Input()
  public placeAbleTile: Tile;

  constructor() { }

  ngOnInit() {
    console.log(this.placeAbleTile);
  }

  // TODO add button to end the turn.
  // TODO add output event emitter to output and endTurn message whenever the turn is ended.
}
