import {TileDefinition} from '../model/tileDefinition';
import {WallType} from '../model/WallType';
import {Tile} from '../model/Tile';
import {Board} from '../model/Board';
import {TileStyle} from '../utils/TileStyle';

export class BoardFactory {

  private TileDefinition: TileDefinition[] = [
      new TileDefinition(WallType.Corner, '', false, true, false, true),
      new TileDefinition(WallType.Straight, '', true, true, false, false),
  ];


  public CreateBoardTemp() {
    console.log('createboardTemp; start');
    const boardArray: Tile[][] = [];

    for (let i = 0; i < 7; i++) {
      console.log('creatBoardTemp; creating row ' + i);
      boardArray[i] = [
        new Tile(WallType.Straight, true,  true, false, false, TileStyle.STRAIGHT),
        new Tile(WallType.Corner , false , true,  false, true , TileStyle.CORNER ),
        new Tile(WallType.Straight, true,  true, false, false, TileStyle.STRAIGHT  ),
        new Tile(WallType.Corner , false , true,  false, true , TileStyle.CORNER ),
        new Tile(WallType.Straight, true,  true, false, false, TileStyle.STRAIGHT  ),
        new Tile(WallType.Corner , false , true,  false, true , TileStyle.CORNER ),
        new Tile(WallType.Straight, true,  true, false, false, TileStyle.STRAIGHT  ),
        ];
      console.log(new Tile().imgSrc);
    }
    const board = new Board(boardArray);
    console.log('CreateboardTemp; stop');
    console.log(boardArray);
    board.placeableTile = new Tile( WallType.Corner,  true,  true,  false,  false,
       TileStyle.UGLY_ASS);
    return board;
  }

}
