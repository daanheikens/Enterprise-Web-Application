import {InsertionStrategy} from './InsertionStrategy';
import {Board} from '../../../model/Board';

export default class InsertTop implements InsertionStrategy {

  public apply(col: number, board: Board): void {
    let tileToMoveDown = board.placeAbleTile;
    let currentTile;

    console.log(tileToMoveDown);
    for (let i = 0; i < 7; i++) {
      currentTile = board.tiles[col][i];
      tileToMoveDown.xCoordinate = col;
      tileToMoveDown.yCoordinate = i;
      board.tiles[col][i] = tileToMoveDown;
      tileToMoveDown = currentTile;
    }
    console.log(board.tiles[col][0]);
    board.placeAbleTile = currentTile;
  }
}
