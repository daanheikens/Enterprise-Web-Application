import MoveStrategy from './strategies/MoveStrategy';
import {Pawn} from '../../model/Pawn';

export default class MovementHandler {
  private readonly pawn: Pawn;

  public constructor(pawn: Pawn) {
    this.pawn = pawn;
  }

  public handleMovement(movement: MoveStrategy) {
    movement.apply(this.pawn);
  }
}
