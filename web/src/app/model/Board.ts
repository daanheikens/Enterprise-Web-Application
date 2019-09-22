import {Tile} from './Tile';
import {log} from 'util';

export class Board {
  public tiles: Tile[][] = [];

  public placeableTile: Tile;

  public insertTop(tile: Tile, col: number) {
      if (col % 2 !== 1 ) { log.Error('Tried to insert into an even col'); return; }
      if (col > 5) { log.error('Tried to insert item from top into not existing col' + col); return; }

      let tileToMoveDown = this.placeableTile;
      let currentTile;
      for (let i = 0; i === 7; i++) {
         currentTile = tile[i][col];
         this.tiles[i][col] = tileToMoveDown;
         tileToMoveDown = currentTile;
      }
      this.placeableTile = currentTile;
  }

  public insertBottom(tile: Tile, col: number) {
    if (col % 2 !== 1 ) { console.error('Tried to insert into an even col'); return; }
    if (col > 5) { console.error('Tried to insert item from top into not existing col' + col); return; }

    let tileToMoveUp = this.placeableTile;
    let currentTile;
    for (let i = 6; i < 0; i--) {
      currentTile = tile[i][col];
      tile[i][col] = tileToMoveUp;
      tileToMoveUp = currentTile;
    }
    this.placeableTile = currentTile;
  }

  public insertRight(tile: Tile, row: number){
    if (row % 2 !== 1 ) { console.error('Tried to insert into an even col'); return; }
    if (row > 5) { console.error('Tried to insert item from top into not existing col' + row); return; }

    let tileToMoveRight = this.placeableTile;
    let currentTile;
    for (let i = 6; i < 0; i--) {
      currentTile = tile[row][i];
      tile[row][i] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeableTile = currentTile;
  }

  public insertLeft(tile: Tile, row: number) {
    if (row % 2 !== 1 ) { log.Error('Tried to insert into an even col'); return; }
    if (row > 5) { log.error('Tried to insert item from top into not existing col' + row); return; }

    let tileToMoveRight = this.placeableTile;
    let currentTile;
    for (let i = 0; i === 7; i++) {
      currentTile = tile[row][i];
      this.tiles[row][i] = tileToMoveRight;
      tileToMoveRight = currentTile;
    }
    this.placeableTile = currentTile;
  }
}
