import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {TileAnimations} from '../animations/TileAnimations';
import {Board} from '../../model/Board';
import {BoardFactory} from '../../services/boardFactory';
import {Tile} from '../../model/Tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [TileAnimations]
})
export class BoardComponent implements OnInit {

  @Output()
  public placeableTileChangedMessage: EventEmitter<Tile> = new EventEmitter<Tile>();

  public currentState = {
    colTop2: 'initial',
    colTop4: 'initial',
    colTop6: 'initial',
    colBottom2: 'initial',
    colBottom4: 'initial',
    colBottom6: 'initial',
    colRowRight2: 'initial',
    colRowRight4: 'initial',
    colRowRight6: 'initial',
    colRowLeft2: 'initial',
    colRowLeft4: 'initial',
    colRowLeft6: 'initial',
  };
  public arrowUp: IconDefinition = faArrowUp;
  public arrowDown: IconDefinition = faArrowDown;
  public arrowRight: IconDefinition = faArrowRight;
  public arrowLeft: IconDefinition = faArrowLeft;
  private enableAnimation: boolean;

  public board: Board;

  public ngOnInit(): void {
    this.enableAnimation = false;
    this.board = new BoardFactory().CreateBoardTemp();
    this.onPlaceableTileChanged();
  }

  public insertTop(column: number): void {
    this.changeState('colTop' + column);
    this.board.insertTop(column - 1);
    this.onPlaceableTileChanged();
  }

  public insertRight(row: number): void {
    this.changeState('rowRight' + row);
    this.board.insertLeft(row - 1);
    this.onPlaceableTileChanged();
  }

  public insertBottom(column: number): void {
    this.changeState('colBottom' + column);
    this.board.insertBottom(column - 1);
    this.onPlaceableTileChanged();
  }

  public insertLeft(row: number): void {
    this.changeState('rowLeft' + row);
    this.board.insertRight(row - 1);
    this.onPlaceableTileChanged();
  }

  /**
   * Called after the trigger is done
   */
  public onDone($event: Event, position: string): void {
    // Also here, we only want to call this when we are in the animation
    if (this.enableAnimation) {
      this.enableAnimation = false;
      // Reset state to prepare for next tur
      this.currentState[position] = 'initial';
    }
  }

  private changeState(position: string): void {
    // this prevents the animation from being cancelled by any other animation
    if (!this.enableAnimation) {
      this.enableAnimation = true;
      // This is the state transfer, it moves from initial to final
      this.currentState[position] = this.currentState[position] === 'initial' ? 'final' : 'initial';
    }
  }

  private onPlaceableTileChanged(): void {
    this.placeableTileChangedMessage.emit(this.board.placeableTile);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('handleKeybaordEvent; alt key pressed ' + event.key);
    if (event.key === 'r') {
      console.log('Found r key rotating!');
      this.board.rotatePlacableTile();
      this.onPlaceableTileChanged();
    }
  }

}
