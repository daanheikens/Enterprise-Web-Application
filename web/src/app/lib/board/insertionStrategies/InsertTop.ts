import {InsertionStrategy} from './InsertionStrategy';
import {Board} from '../../../model/Board';

export default class InsertTop implements InsertionStrategy {

  public apply(col: number, board: Board): void {
    let tileToMoveDown = board.placeAbleTile;
    let currentTile;
    for (let i = 0; i < 7; i++) {
      currentTile = board.tiles[i][col];
      board.tiles[col][i] = tileToMoveDown;
      tileToMoveDown = currentTile;
    }
    board.placeAbleTile = currentTile;
  }
}
