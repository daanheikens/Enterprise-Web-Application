export class Game {

  private readonly _id: number;

  private readonly _maxPlayers: number;

  private readonly _maxTurnTime: number;

  private readonly _maxPendingTime: number;

  constructor(id: number, maxPlayers: number, maxTurnTime: number, maxPendingTime: number) {
    this._id = id;
    this._maxPlayers = maxPlayers;
    this._maxTurnTime = maxTurnTime;
    this._maxPendingTime = maxPendingTime;
  }

  get id(): number {
    return this._id;
  }

  get maxPlayers(): number {
    return this._maxPlayers;
  }

  get maxTurnTime(): number {
    return this._maxTurnTime;
  }

  get maxPendingTime(): number {
    return this._maxPendingTime;
  }
}
