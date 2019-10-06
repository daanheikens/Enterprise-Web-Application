import {Pawn} from '../model/Pawn';

export default class PawnCollection {

  private readonly _redPawn: Pawn;
  private readonly _bluePawn: Pawn;
  private readonly _yellowPawn: Pawn;
  private readonly _greenPawn: Pawn;

  constructor(redPawn: Pawn, bluePawn: Pawn, yellowPawn: Pawn, greenPawn: Pawn) {
    this._redPawn = redPawn;
    this._bluePawn = bluePawn;
    this._yellowPawn = yellowPawn;
    this._greenPawn = greenPawn;
  }

  get redPawn(): Pawn {
    return this._redPawn;
  }

  get bluePawn(): Pawn {
    return this._bluePawn;
  }

  get yellowPawn(): Pawn {
    return this._yellowPawn;
  }

  get greenPawn(): Pawn {
    return this._greenPawn;
  }
}
