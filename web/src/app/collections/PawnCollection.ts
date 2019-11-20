import {Pawn} from '../model/Pawn';

export default class PawnCollection {
  private readonly pawns: Pawn[];

  public constructor(pawns: Pawn[]) {
    this.pawns = pawns;
  }

  public getPawns(): Pawn[] {
    return this.pawns;
  }
}
