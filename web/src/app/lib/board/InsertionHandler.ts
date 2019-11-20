import {Board} from '../../model/Board';
import {InsertionStrategy} from './insertionStrategies/InsertionStrategy';

export default class InsertionHandler {

  private readonly board: Board;

  public constructor(board: Board) {
    this.board = board;
  }

  public handleInsertion(index: number, insertion: InsertionStrategy) {
    insertion.apply(index, this.board);
  }
}
