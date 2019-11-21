import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent {

  @Input()
  public placeAbleTile: Tile;

  @Input()
  public turnEnded = false;

  @Output()
  public turnEndedMessage = new EventEmitter<Event>();

  private onEndTurn(): void {
    if (this.turnEnded) {
      this.turnEndedMessage.emit();
    }
  }
}
