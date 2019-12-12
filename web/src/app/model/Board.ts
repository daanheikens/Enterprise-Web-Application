import {Tile} from './Tile';
import {TileRotation} from './TileRotation';
import {User} from './User';
import {Pawn} from './Pawn';

export class Board {

  public tiles: Tile[][] = [];

  public placeAbleTile: Tile;

  public pawns: Pawn[];

  private readonly _user: User;

  private readonly _currentPlayers: User[];

  private readonly _gameId: number;

  constructor(matrix: Tile[][], currentPlayers: User[], currentUser: User, placeAbleTile: Tile, gameId: number) {
    this.tiles = matrix;
    this._currentPlayers = currentPlayers;
    this._user = currentUser;
    this.placeAbleTile = placeAbleTile;
    this._gameId = gameId;
  }

  get currentPlayers(): User[] {
    return this._currentPlayers;
  }

  get currentUser(): User {
    return this._user;
  }

  get gameId(): number {
    return this._gameId;
  }

  public rotatePlacableTile() {
    const waltempRight = this.placeAbleTile.rightWall;
    const waltempLeft = this.placeAbleTile.leftWall;
    const waltempBottom = this.placeAbleTile.bottomWall;
    const waltempTop = this.placeAbleTile.topWall;

    // noinspection JSSuspiciousNameCombination
    this.placeAbleTile.rightWall = waltempTop;
    // noinspection JSSuspiciousNameCombination
    this.placeAbleTile.bottomWall = waltempRight;
    // noinspection JSSuspiciousNameCombination
    this.placeAbleTile.leftWall = waltempBottom;
    // noinspection JSSuspiciousNameCombination
    this.placeAbleTile.topWall = waltempLeft;

    switch (this.placeAbleTile.rotation) {
      case TileRotation.Zero: {
        this.placeAbleTile.rotation = TileRotation.Ninety;
        break;
      }
      case TileRotation.Ninety: {
        this.placeAbleTile.rotation = TileRotation.OneEighty;
        break;
      }
      case TileRotation.OneEighty: {
        this.placeAbleTile.rotation = TileRotation.TwoHundredSeventy;
        break;
      }
      case TileRotation.TwoHundredSeventy: {
        this.placeAbleTile.rotation = TileRotation.Zero;
        break;
      }
      default:
        throw new Error('Invalid tile rotation');
    }
  }
}
