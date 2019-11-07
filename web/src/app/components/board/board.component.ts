import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {TileAnimations} from '../animations/TileAnimations';
import {Board} from '../../model/Board';
import {BoardFactory} from '../../services/boardFactory';
import {Tile} from '../../model/Tile';
import {PawnFactory} from '../../lib/factories/PawnFactory';
import MovementHandler from '../../lib/movement/MovementHandler';
import MoveUp from '../../lib/movement/strategies/MoveUp';
import MoveLeft from '../../lib/movement/strategies/MoveLeft';
import MoveRight from '../../lib/movement/strategies/MoveRight';
import MoveDown from '../../lib/movement/strategies/MoveDown';
import {MovementService} from '../../services/movement.service';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {MovementDirections} from '../../lib/movement/MovementDirections';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [TileAnimations]
})
export class BoardComponent implements OnInit, AfterViewInit {
  /** Board state properties **/
  public board: Board;
  @Output() public placeableTileChangedMessage: EventEmitter<Tile> = new EventEmitter<Tile>();
  @Input() public isPending: boolean;

  /** Animation properties **/
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
  private enableAnimation = false;

  /** Icons **/
  public arrowUp: IconDefinition = faArrowUp;
  public arrowDown: IconDefinition = faArrowDown;
  public arrowRight: IconDefinition = faArrowRight;
  public arrowLeft: IconDefinition = faArrowLeft;

  /** Movement properties **/
  private movementHandler: MovementHandler;
  private moveUp = new MoveUp();
  private moveDown = new MoveDown();
  private moveLeft = new MoveLeft();
  private moveRight = new MoveRight();

  public constructor(private readonly movementService: MovementService) {
  }

  public ngOnInit(): void {
    this.board = new BoardFactory().CreateBoardTemp();
    this.onPlaceableTileChanged();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      let userPawn = PawnFactory.createPawns(this.board);
      this.movementHandler = new MovementHandler(userPawn);
    });
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
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'r') {
      this.board.rotatePlacableTile();
      this.onPlaceableTileChanged();
      return;
    }

    if (MovementDirections.includes(event.key)) {
      this.movementService.movePawn(new HttpParams().set('direction', event.key))
        .subscribe((result: boolean) => {
          if (result === true) {
            if (event.key === 'ArrowRight') {
              this.movementHandler.handleMovement(this.moveRight);
            } else if (event.key === 'ArrowLeft') {
              this.movementHandler.handleMovement(this.moveLeft);
            } else if (event.key === 'ArrowUp') {
              this.movementHandler.handleMovement(this.moveUp);
            } else if (event.key === 'ArrowDown') {
              this.movementHandler.handleMovement(this.moveDown);
            }
          }
        });
    }
  }
}
