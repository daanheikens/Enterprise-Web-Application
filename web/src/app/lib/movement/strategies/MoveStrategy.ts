import {Pawn} from '../../../model/Pawn';

export default interface MoveStrategy {
  apply(pawn: Pawn): void
}
