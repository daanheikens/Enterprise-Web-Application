import MoveStrategy from './MoveStrategy';
import {Pawn} from '../../../model/Pawn';

export default class MoveUp implements MoveStrategy {
  private static readonly topOffsetModifier = 90;

  public apply(pawn: Pawn): void {
    pawn.topOffset = (parseInt(pawn.topOffset) - MoveUp.topOffsetModifier).toString();
  }
}
