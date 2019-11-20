import {Board} from '../../../model/Board';

/**
 * Interface for the available tile insertions.
 *
 * Index is the row or column which the movement is done from
 * Board is the actual board reference to apply the strategy on
 */
export interface InsertionStrategy {

  apply(index: number, board: Board): void;
}
