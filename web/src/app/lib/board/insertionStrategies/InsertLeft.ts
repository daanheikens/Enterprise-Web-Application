import {InsertionStrategy} from './InsertionStrategy';
import {log} from "util";
import {Board} from '../../../model/Board';

export default class InsertLeft implements InsertionStrategy {

  public apply(row: number, board: Board): void {
    if (row % 2 !== 1) {
      log.Error('Tried to insert into an even col');
      return;
    }
    if (row > 5) {
      log.error('Tried to insert item from top into not existing col' + row);
      return;
    }

    let tileToMoveRight = board.placeAbleTile;

    let currentTile;
    for (let i = 0; i < 7; i++) {
      currentTile = board.tiles[i][row];
      tileToMoveRight.xCoordinate = i;
      tileToMoveRight.yCoordinate = row;
      board.tiles[i][row] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }

    board.placeAbleTile = currentTile;
  }
}
