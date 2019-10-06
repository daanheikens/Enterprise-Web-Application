import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  @Input()
  public placeableTile: Tile;

  constructor() { }

  ngOnInit() {
  }
}