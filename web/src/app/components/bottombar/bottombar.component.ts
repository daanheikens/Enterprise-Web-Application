import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../../model/Tile';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import Card from '../../model/Card';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {

  @Input()
  private placeAbleTile: Tile;

  @Input()
  private turnEnded = false;

  @Input()
  private isTurn = false;

  @Input()
  private gameId: number;

  @Output()
  private turnEndedMessage = new EventEmitter<Event>();

  private card: Card;

  constructor(
    private readonly router: Router,
    private readonly cardService: CardService) {
  }

  public ngOnInit(): void {
    this.cardService.getCurrentTreasureCard(this.gameId).subscribe((card: Card) => this.card = card);
  }

  private onEndTurn(): void {
    if (this.turnEnded) {
      this.turnEndedMessage.emit();
    }
  }

  private quitGame(): void {
    this.router.navigate(['/home']);
  }
}
