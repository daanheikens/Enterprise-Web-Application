import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  @Input()
  public placeAbleTile: Tile;

  @Input()
  public turnEnded = false;

  @Input()
  public isTurn = false;

  @Output()
  public turnEndedMessage = new EventEmitter<Event>();

  public ngOnInit(): void {
    console.log(this.isTurn);
    console.log(this.turnEnded);
  }

  private onEndTurn(): void {
    if (this.turnEnded) {
      this.turnEndedMessage.emit();
      this.isTurn = false;
      this.turnEnded = false;
    }
  }
}
