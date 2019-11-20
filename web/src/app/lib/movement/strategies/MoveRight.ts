import MoveStrategy from './MoveStrategy';
import {Pawn} from '../../../model/Pawn';

export default class MoveRight implements MoveStrategy {
  private static readonly leftOffsetModifier = 90;

  public apply(pawn: Pawn): void {
    pawn.leftOffset = (parseInt(pawn.leftOffset) + MoveRight.leftOffsetModifier).toString();
 }
}
