export class Pawn {

  private readonly _playerId: number;

  private readonly _imgSrc: string;

  private _topOffset: string;

  private _leftOffset: string;

  constructor(playerId: number, imgSrc: string, topOffset: string, leftOffset: string) {
    this._playerId = playerId;
    this._imgSrc = imgSrc;
    this._topOffset = topOffset;
    this._leftOffset = leftOffset;
  }

  get playerId(): number {
    return this._playerId;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }

  set topOffset(value: string) {
    this._topOffset = value;
  }

  set leftOffset(value: string) {
    this._leftOffset = value;
  }

  get style(): Object {
    return {'top': this._topOffset + 'px', 'left': this._leftOffset + 'px'};
  }
}
