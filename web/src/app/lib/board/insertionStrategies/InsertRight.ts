import {InsertionStrategy} from './InsertionStrategy';
import {Board} from '../../../model/Board';

export default class InsertRight implements InsertionStrategy {

  public apply(row: number, board: Board): void {
    if (row % 2 !== 1) {
      console.error('Tried to insert into an even col');
      return;
    }
    if (row > 5) {
      console.error('Tried to insert item from top into not existing col' + row);
      return;
    }

    let tileToMoveLeft = board.placeAbleTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = board.tiles[i][row];
      tileToMoveLeft.xCoordinate = i;
      tileToMoveLeft.yCoordinate = row;
      board.tiles[i][row] = tileToMoveLeft;
      tileToMoveLeft = currentTile;
    }

    currentTile.xCoordinate = null;
    currentTile.yCoordinate = null;

    board.placeAbleTile = currentTile;
  }
}
