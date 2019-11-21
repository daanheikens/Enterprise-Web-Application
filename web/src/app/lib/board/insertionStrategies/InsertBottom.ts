import {InsertionStrategy} from './InsertionStrategy';
import {Board} from '../../../model/Board';

export default class InsertBottom implements InsertionStrategy {

  public apply(col: number, board: Board): void {
    if (col % 2 !== 1) {
      console.error('Tried to insert into an even col');
      return;
    }
    if (col > 5) {
      console.error('Tried to insert item from top into not existing col' + col);
      return;
    }

    let tileToMoveUp = board.placeAbleTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = board.tiles[col][i];
      tileToMoveUp.xCoordinate = col;
      tileToMoveUp.yCoordinate = i;
      board.tiles[col][i] = tileToMoveUp;
      tileToMoveUp = currentTile;
    }
    board.placeAbleTile = currentTile;
  }
}
