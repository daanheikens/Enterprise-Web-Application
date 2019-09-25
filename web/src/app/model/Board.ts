import {Tile} from './Tile';
import {log} from 'util';
import {TileRotation} from './TileRotation';

export class Board {

  constructor(matrix: Tile[][] ) {
    this.tiles = matrix;
  }

  public tiles: Tile[][] = [];

  public placeableTile: Tile;

  public rotatePlacableTile() {
      const waltempRight = this.placeableTile.rightWall;
      const waltempLeft = this.placeableTile.leftWall;
      const waltempBottom = this.placeableTile.bottomWall;
      const waltempTop = this.placeableTile.topWall;

      this.placeableTile.rightWall = waltempTop;
      this.placeableTile.bottomWall = waltempRight;
      this.placeableTile.leftWall = waltempBottom;
      this.placeableTile.topWall = waltempLeft;

      switch (this.placeableTile.tileRotation) {

        case TileRotation.Zero: {
            this.placeableTile.tileRotation = TileRotation.Ninety;
            break;
        }
        case TileRotation.Ninety: {
          this.placeableTile.tileRotation = TileRotation.OneEighty;
          break;
        }
        case TileRotation.OneEighty: {
          this.placeableTile.tileRotation = TileRotation.TwoHundredSeventy;
          break;
        }
        case TileRotation.TwoHundredSeventy: {
          this.placeableTile.tileRotation = TileRotation.Zero;
        }
      }

  }

  public insertTop(col: number) {
      let tileToMoveDown = this.placeableTile;
      let currentTile;
      for (let i = 0; i < 7; i++) {
         currentTile = this.tiles[i][col];
         this.tiles[i][col] = tileToMoveDown;
         tileToMoveDown = currentTile;
      }
      this.placeableTile = currentTile;
  }

  public insertBottom(col: number) {
    if (col % 2 !== 1 ) { console.error('Tried to insert into an even col'); return; }
    if (col > 5) { console.error('Tried to insert item from top into not existing col' + col); return; }

    let tileToMoveUp = this.placeableTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = this.tiles[i][col];
      this.tiles[i][col] = tileToMoveUp;
      tileToMoveUp = currentTile;
    }
    this.placeableTile = currentTile;
  }

  public insertRight(row: number) {
    if (row % 2 !== 1 ) { console.error('Tried to insert into an even col'); return; }
    if (row > 5) { console.error('Tried to insert item from top into not existing col' + row); return; }

    let tileToMoveRight = this.placeableTile;
    let currentTile;
    for (let i = 6; i >= 0; i--) {
      currentTile = this.tiles[row][i];
      this.tiles[row][i] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeableTile = currentTile;
  }

  public insertLeft(row: number) {
    if (row % 2 !== 1 ) { log.Error('Tried to insert into an even col'); return; }
    if (row > 5) { log.error('Tried to insert item from top into not existing col' + row); return; }

    let tileToMoveRight = this.placeableTile;
    let currentTile;
    for (let i = 0; i < 7; i++) {
      currentTile = this.tiles[row][i];
      this.tiles[row][i] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeableTile = currentTile;
  }
}
