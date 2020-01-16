import MoveStrategy from './strategies/MoveStrategy';
import {Pawn} from '../../model/Pawn';

export default class MovementHandler {
  private pawn: Pawn;

  public setPawn(pawn: Pawn): void {
    this.pawn = pawn;
  }

  public handleMovement(movement: MoveStrategy) {
    movement.apply(this.pawn);
  }
}
