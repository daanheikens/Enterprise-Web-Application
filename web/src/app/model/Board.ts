import {Tile} from './Tile';
import {log} from 'util';
import {TileRotation} from './TileRotation'
import {User} from './User';
import {Pawn} from './Pawn';

export class Board {

  public tiles: Tile[][] = [];

  public placeAbleTile: Tile;

  public pawns: Pawn[];

  private readonly _user: User;

  private readonly _currentPlayers: User[];

  constructor(matrix: Tile[][], currentPlayers: User[], currentUser: User, placeAbleTile: Tile) {
    this.tiles = matrix;
    this._currentPlayers = currentPlayers;
    this._user = currentUser;
    this.placeAbleTile = placeAbleTile
  }

  get currentPlayers(): User[] {
    return this._currentPlayers;
  }

  get currentUser(): User {
    return this._user;
  }

  public rotatePlacableTile() {
    switch (this.placeAbleTile.tileRotation) {
      case TileRotation.Zero: {
        this.placeAbleTile.tileRotation = TileRotation.Ninety;
        break;
      }
      case TileRotation.Ninety: {
        this.placeAbleTile.tileRotation = TileRotation.OneEighty;
        break;
      }
      case TileRotation.OneEighty: {
        this.placeAbleTile.tileRotation = TileRotation.TwoHundredSeventy;
        break;
      }
      case TileRotation.TwoHundredSeventy: {
        this.placeAbleTile.tileRotation = TileRotation.Zero;
        break;
      }
      default:
        throw new Error('Invalid tile rotation');
    }
  }

  public insertTop(col: number) {
    let tileToMoveDown = this.placeAbleTile;
    let currentTile;
    for (let i = 0; i < 7; i++) {
      currentTile = this.tiles[i][col];
      this.tiles[col][i] = tileToMoveDown;
      tileToMoveDown = currentTile;
    }
    this.placeAbleTile = currentTile;
  }

  public insertBottom(col: number) {
    if (col % 2 !== 1) {
      console.error('Tried to insert into an even col');
      return;
    }
    if (col > 5) {
      console.error('Tried to insert item from top into not existing col' + col);
      return;
    }

    let tileToMoveUp = this.placeAbleTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = this.tiles[i][col];
      this.tiles[col][i] = tileToMoveUp;
      tileToMoveUp = currentTile;
    }
    this.placeAbleTile = currentTile;
  }

  public insertRight(row: number) {
    if (row % 2 !== 1) {
      console.error('Tried to insert into an even col');
      return;
    }
    if (row > 5) {
      console.error('Tried to insert item from top into not existing col' + row);
      return;
    }

    let tileToMoveRight = this.placeAbleTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = this.tiles[row][i];
      this.tiles[i][row] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeAbleTile = currentTile;
  }

  public insertLeft(row: number) {
    if (row % 2 !== 1) {
      log.Error('Tried to insert into an even col');
      return;
    }
    if (row > 5) {
      log.error('Tried to insert item from top into not existing col' + row);
      return;
    }

    let tileToMoveRight = this.placeAbleTile;
    let currentTile;
    for (let i = 0; i < 7; i++) {
      currentTile = this.tiles[row][i];
      this.tiles[i][row] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeAbleTile = currentTile;
  }
}
