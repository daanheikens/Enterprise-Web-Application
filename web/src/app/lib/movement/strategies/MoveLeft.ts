import MoveStrategy from './MoveStrategy';
import {Pawn} from '../../../model/Pawn';

export default class MoveLeft implements MoveStrategy {
  private static readonly leftOffsetModifier = 90;

  public apply(pawn: Pawn): void {
    pawn.leftOffset = (parseInt(pawn.leftOffset) - MoveLeft.leftOffsetModifier).toString();
  }
}
