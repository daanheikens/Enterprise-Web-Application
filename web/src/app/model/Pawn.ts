import {User} from './User';

export enum PawnType {
  BLUE, GREEN, YELLOW, RED
}

export class Pawn {

  private readonly _pawnId: number;

  private readonly _pawnType: PawnType;

  private _imgSrc: string;

  private _topOffset: string;

  private _leftOffset: string;

  private readonly _user: User;

  public constructor(pawnId: number, pawnType: PawnType, user: User) {
    this._pawnId = pawnId;
    this._pawnType = pawnType;
    this._user = user;
  }

  get pawnId(): number {
    return this._pawnId;
  }

  get pawnType(): PawnType {
    return this._pawnType;
  }

  get user(): User {
    return this._user;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }

  set imgSrc(value: string) {
    this._imgSrc = value;
  }

  get topOffset(): string {
    return this._topOffset;
  }

  set topOffset(value: string) {
    this._topOffset = value;
  }

  get leftOffset(): string {
    return this._leftOffset;
  }

  set leftOffset(value: string) {
    this._leftOffset = value;
  }

  get style(): Object {
    return {'top': this._topOffset + 'px', 'left': this._leftOffset + 'px'};
  }
}
