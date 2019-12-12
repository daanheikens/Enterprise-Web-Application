import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../../model/Tile';
import {Router} from '@angular/router';

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

  @Input()
  public isTurn = false;

  @Output()
  public turnEndedMessage = new EventEmitter<Event>();

  constructor(private readonly router: Router) {
  }

  private onEndTurn(): void {
    if (this.turnEnded) {
      this.turnEndedMessage.emit();
      this.isTurn = false;
      this.turnEnded = false;
    }
  }

  private quitGame(): void {
    this.router.navigate(['/home']);
  }
}
