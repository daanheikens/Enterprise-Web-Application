import {InsertionStrategy} from './InsertionStrategy';
import {log} from "util";
import {Board} from '../../../model/Board';

export default class InsertLeft implements InsertionStrategy {

  public apply(row: number, board: Board): void {
    if (row % 2 !== 1) {
      return;
    }
    if (row > 5) {
      return;
    }

    let tileToMoveRight = board.placeAbleTile;

    let currentTile;
    console.log(board.tiles);
    for (let i = 0; i < 7; i++) {
      currentTile = board.tiles[i][row];
      tileToMoveRight.xCoordinate = i;
      tileToMoveRight.yCoordinate = row;
      board.tiles[i][row] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }

    currentTile.xCoordinate = null;
    currentTile.yCoordinate = null;

    board.placeAbleTile = currentTile;
  }
}
