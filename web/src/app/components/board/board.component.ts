import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {TileAnimations} from '../animations/TileAnimations';
import {Board} from '../../model/Board';
import {Tile} from '../../model/Tile';
import MovementHandler from '../../lib/movement/MovementHandler';
import MoveUp from '../../lib/movement/strategies/MoveUp';
import MoveLeft from '../../lib/movement/strategies/MoveLeft';
import MoveRight from '../../lib/movement/strategies/MoveRight';
import MoveDown from '../../lib/movement/strategies/MoveDown';
import {MovementService} from '../../services/game/movement.service';
import {HttpParams} from '@angular/common/http';
import {MovementDirections} from '../../lib/movement/MovementDirections';
import {GameService} from '../../services/game/game.service';
import {AuthService} from '../../services/auth/auth.service';
import InsertionHandler from '../../lib/board/InsertionHandler';
import InsertTop from '../../lib/board/insertionStrategies/InsertTop';
import InsertBottom from '../../lib/board/insertionStrategies/InsertBottom';
import InsertLeft from '../../lib/board/insertionStrategies/InsertLeft';
import InsertRight from '../../lib/board/insertionStrategies/InsertRight';
import {Pawn} from '../../model/Pawn';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [TileAnimations]
})
export class BoardComponent implements AfterViewInit {
  /** Board state properties **/
  @Input()
  public board: Board;

  @Input()
  public isPending: boolean;

  @Input()
  public isTurn = false;

  @Input()
  private userPawn: Pawn;

  /** Event emitters to notify parent of changes **/
  @Output()
  private placeableTileMessage = new EventEmitter<Tile>();

  @Output()
  private boardChangedMessage = new EventEmitter<Board>();

  @Output()
  private canEndTurnMessage = new EventEmitter<Event>();

  /** State properties for the turn **/
  @Input()
  private placedTile = false;

  private turnEndMessageSent = false;

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

  /** Insertion properties **/
  private insertionHandler: InsertionHandler;
  private insertTopStrategy = new InsertTop();
  private insertBottomStrategy = new InsertBottom();
  private insertLefStrategy = new InsertLeft();
  private insertRightStrategy = new InsertRight();

  public constructor(
    private readonly authService: AuthService,
    private readonly gameService: GameService,
    private readonly movementService: MovementService
  ) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isTurn) {
        this.placeableTileMessage.emit(this.board.placeAbleTile);
      }

      this.insertionHandler = new InsertionHandler(this.board, this.placeableTileMessage, this.boardChangedMessage);
      this.movementHandler = new MovementHandler(this.userPawn);
    }, 1000);
  }

  public insertTop(column: number): void {
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('colTop' + column);
    this.insertionHandler.handleInsertion(column - 1, this.insertTopStrategy);

    this.placedTile = true;

    if (this.turnEndMessageSent === false) {
      this.canEndTurnMessage.emit();
      this.turnEndMessageSent = true;
    }
  }

  public insertRight(row: number): void {
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('rowRight' + row);
    this.insertionHandler.handleInsertion(row - 1, this.insertRightStrategy);

    this.placedTile = true;

    if (this.turnEndMessageSent === false) {
      this.canEndTurnMessage.emit();
      this.turnEndMessageSent = true;
    }
  }

  public insertBottom(column: number): void {
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('colBottom' + column);
    this.insertionHandler.handleInsertion(column - 1, this.insertBottomStrategy);

    this.placedTile = true;

    if (this.turnEndMessageSent === false) {
      this.canEndTurnMessage.emit();
      this.turnEndMessageSent = true;
    }
  }

  public insertLeft(row: number): void {
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('rowLeft' + row);
    this.insertionHandler.handleInsertion(row - 1, this.insertLefStrategy);

    this.placedTile = true;

    if (this.turnEndMessageSent === false) {
      this.canEndTurnMessage.emit();
      this.turnEndMessageSent = true;
    }
  }

  /**
   * Called after the trigger is done
   */
  public onDone($event: Event, position: string): void {
    // Also here, we only want to call this when we are in the animation
    if (this.enableAnimation) {
      this.enableAnimation = false;
      // Reset state to prepare for next turn
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

  @HostListener('window:keyup', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isTurn) {
      return;
    }

    if (event.key === 'r') {
      this.board.rotatePlacableTile();
      this.placeableTileMessage.emit(this.board.placeAbleTile);
      return;
    }

    if (this.placedTile && MovementDirections.includes(event.key)) {
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
