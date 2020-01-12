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
import {TurnService} from '../../services/turn.service';
import {HttpParams} from '@angular/common/http';
import {MovementDirections} from '../../lib/movement/MovementDirections';
import {GameService} from '../../services/game.service';
import {AuthService} from '../../services/auth.service';
import InsertionHandler from '../../lib/board/InsertionHandler';
import InsertTop from '../../lib/board/insertionStrategies/InsertTop';
import InsertBottom from '../../lib/board/insertionStrategies/InsertBottom';
import InsertLeft from '../../lib/board/insertionStrategies/InsertLeft';
import InsertRight from '../../lib/board/insertionStrategies/InsertRight';
import {Pawn} from '../../model/Pawn';
import TurnResult, {TurnResultAction} from '../../model/TurnResult';
import Turn from '../../model/Turn';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [TileAnimations]
})
export class BoardComponent implements AfterViewInit, OnInit {
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
  private canEndTurnMessage = new EventEmitter<Turn>();

  @Output()
  private turnEndedMessage = new EventEmitter<Turn>();

  @Output()
  private gameEndedMessage = new EventEmitter<Event>();

  /** State properties for the turn **/
  @Input()
  private placedTile = false;

  private turn = new Turn();

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
    private readonly movementService: TurnService
  ) {
  }

  public ngOnInit(): void {
    this.gameService.board.subscribe((board => this.board = board));
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isTurn) {
        this.placeableTileMessage.emit(this.board.placeAbleTile);
      }

      this.insertionHandler = new InsertionHandler(this.board, this.placeableTileMessage, this.boardChangedMessage);
      this.movementHandler = new MovementHandler(this.userPawn);
      this.gameService.placedTile.subscribe((placedTile => this.placedTile = placedTile));
    }, 1000);
  }

  public insertTop(column: number): void {
    console.log(this.isTurn);
    console.log(this.placedTile);
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('colTop' + column);
    this.insertionHandler.handleInsertion(column - 1, this.insertTopStrategy);

    this.placedTile = true;
    this.turn.tileInsertedMessage = `<b>Placed a tile from top in column: ${column}`;
    this.canEndTurnMessage.emit(this.turn);
  }

  public insertRight(row: number): void {
    console.log(this.isTurn);
    console.log(this.placedTile);
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('rowRight' + row);
    this.insertionHandler.handleInsertion(row - 1, this.insertRightStrategy);

    this.placedTile = true;
    this.turn.tileInsertedMessage = `<b>Placed a tile from right in row: ${row}`;
    this.canEndTurnMessage.emit(this.turn);
  }

  public insertBottom(column: number): void {
    console.log(this.isTurn);
    console.log(this.placedTile);
    if (!this.isTurn || this.placedTile) {
      return;
    }

    this.changeState('colBottom' + column);
    this.insertionHandler.handleInsertion(column - 1, this.insertBottomStrategy);

    this.placedTile = true;
    this.turn.tileInsertedMessage = `<b>Placed a tile from bottom in column: ${column}`;
    console.log(this.turn);
    this.canEndTurnMessage.emit(this.turn);
  }

  public insertLeft(row: number): void {
    console.log(this.isTurn);
    console.log(this.placedTile);
    if (!this.isTurn || this.placedTile) {
      console.log('no insertion');
      return;
    }

    this.changeState('rowLeft' + row);
    this.insertionHandler.handleInsertion(row - 1, this.insertLefStrategy);

    this.placedTile = true;
    this.turn.tileInsertedMessage = `<b>Placed a tile from left in row: ${row}`;
    console.log(this.turn);
    this.canEndTurnMessage.emit(this.turn);
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
        .subscribe((result: TurnResult) => {
          if (result.resultAction !== TurnResultAction.INVALID_MOVE) {
            this.handleMovement(event.key);
            // End turn if treasure is found + send message treasure is found
            if (result.resultAction === TurnResultAction.COLLECTED_TREASURE) {
              this.turn.withTreasure = true;
              this.turnEndedMessage.emit(this.turn);
            }
            // End game if end game action is given (Send endgame message and end game)
            if (result.resultAction === TurnResultAction.GAME_END) {
              this.gameEndedMessage.emit();
            }
          }
        });
    }
  }

  private handleMovement(key: string): void {
    switch (key) {
      case 'ArrowRight':
        this.movementHandler.handleMovement(this.moveRight);
        break;
      case 'ArrowLeft':
        this.movementHandler.handleMovement(this.moveLeft);
        break;
      case 'ArrowUp':
        this.movementHandler.handleMovement(this.moveUp);
        break;
      case 'ArrowDown':
        this.movementHandler.handleMovement(this.moveDown);
        break;
      default:
        throw new Error('Cannot process movement by the provided key');
    }
  }
}
