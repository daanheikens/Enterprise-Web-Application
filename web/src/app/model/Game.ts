import {Tile} from './Tile';
import {User} from './User';

export class Game {

  private readonly _id: number;

  private readonly _name: string;

  private readonly _maxPlayers: number;

  private readonly _maxTurnTime: number;

  private readonly _maxPendingTime: number;

  private readonly _currentPlayers: User[];

  private readonly _user: User;

  private readonly _matrix: Tile[][];

  public constructor(
    id: number,
    name: string,
    maxPlayers: number,
    maxTurnTime: number,
    maxPendingTime: number,
    currentPlayers: User[],
    user: User,
    matrix: Tile[][]
  ) {
    this._id = id;
    this._name = name;
    this._maxPlayers = maxPlayers;
    this._maxTurnTime = maxTurnTime;
    this._maxPendingTime = maxPendingTime;
    this._currentPlayers = currentPlayers;
    this._user = user;
    this._matrix = matrix;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
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

  get currentPlayers(): User[] {
    return this._currentPlayers;
  }

  get user(): User {
    return this._user;
  }

  get matrix(): Tile[][] {
    return this._matrix;
  }
}
