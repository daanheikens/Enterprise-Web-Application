import {Board} from '../../model/Board';
import {InsertionStrategy} from './insertionStrategies/InsertionStrategy';
import {Tile} from '../../model/Tile';
import {EventEmitter} from '@angular/core';

export default class InsertionHandler {

  private readonly board: Board;
  private readonly placeableTileMessage: EventEmitter<Tile>;

  public constructor(board: Board, placeableTileMessage: EventEmitter<Tile>) {
    this.board = board;
    this.placeableTileMessage = placeableTileMessage;
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
    console.log(this.board);
  }
}
