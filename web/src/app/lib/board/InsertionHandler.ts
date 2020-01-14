import {Board} from '../../model/Board';
import {InsertionStrategy} from './insertionStrategies/InsertionStrategy';
import {Tile} from '../../model/Tile';
import {EventEmitter} from '@angular/core';

export default class InsertionHandler {

  private board: Board;
  private readonly placeableTileMessage: EventEmitter<Tile>;
  private readonly boardChangedMessage: EventEmitter<Board>;

  public constructor(placeableTileMessage: EventEmitter<Tile>, boardChangedMessage: EventEmitter<Board>) {
    this.placeableTileMessage = placeableTileMessage;
    this.boardChangedMessage = boardChangedMessage;
  }

  public setBoard(board: Board): InsertionHandler {
    this.board = board;
    return this;
  }

  public handleInsertion(index: number, insertion: InsertionStrategy) {
    insertion.apply(index, this.board);
    this.notify();
  }

  /**
   * Removed the player tile since it's placed. (Thus players can't place any other tiles and their placement is final)
   */
  private notify() {
    this.placeableTileMessage.emit(null);
    this.boardChangedMessage.emit(this.board);
  }
}
