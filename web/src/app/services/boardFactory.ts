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

  private TilesToInert: Tile[] =  [
      new Tile( true, false, false, true, TileStyle.MOUSE),
      new Tile( true, false, false, true, TileStyle.SALAMANDER),
      new Tile( false, true, true, false, TileStyle.BUG),
      new Tile( false, true, false, false, TileStyle.DRAGON),
      new Tile( true, false, false, true, TileStyle.SPIDER),
      new Tile( false, false, true, false, TileStyle.WITCH),
      new Tile( false, true, false, false, TileStyle.BAT),
      new Tile( true, false, false, false, TileStyle.GHOST),
      new Tile( false, true, false, false, TileStyle.GHOST_UGLY),
      new Tile( true, false, false, true, TileStyle.OWL),
      new Tile( true, false, true, false, TileStyle.FLY_THING),
    ];

  public CreateBoardTemp() {
    console.log('createboardTemp; start');
    const boardArray: Tile[][] = [];

    for (let i = 0; i < 7; i++) {
      boardArray[i] = [];
    }

    for (const tileToInsert of this.TilesToInert) {
      const randomRow = Math.floor(Math.random() * 6);
      let randomCol = Math.floor(Math.random() * 6);
      if (randomCol % 2 !== 1) {
          randomCol = randomCol - 1;
      }
      boardArray[randomRow][randomCol] = tileToInsert;
    }

    boardArray[0][0] = new Tile(true, false, false, true, TileStyle.CORNER_BLUE);
    boardArray[0][2] = new Tile(true, false, false, false, TileStyle.HELMET);
    boardArray[0][4] = new Tile(true, false, false, false, TileStyle.CANDLE);
    boardArray[0][6] = new Tile(true, false, true, true, TileStyle.CORNER_GREEN);

    boardArray[2][0] = new Tile(false, false, false, true, TileStyle.SWORD);
    boardArray[2][2] = new Tile(false, false, false, true, TileStyle.GEM);
    boardArray[2][4] = new Tile(true, false, false, false, TileStyle.CHEST);
    boardArray[2][6] = new Tile(false, false, true, false, TileStyle.RING);

    boardArray[4][0] = new Tile(false, false, false, true, TileStyle.SKULL);
    boardArray[4][2] = new Tile(false, true, false, false, TileStyle.KEYS);
    boardArray[4][4] = new Tile(false, false, true, false, TileStyle.CROWN);
    boardArray[4][6] = new Tile(false, false, true, false, TileStyle.MAP);

    boardArray[6][0] = new Tile(false, true, false, true, TileStyle.CORNER_YELLOW);
    boardArray[6][2] = new Tile(false, true, false, false, TileStyle.GOLD);
    boardArray[6][4] = new Tile(false, true, false, false, TileStyle.BOOK);
    boardArray[6][6] = new Tile(false, true, true, true, TileStyle.CORNER_RED);

    for (let i = 0; i < 7; i++) {
      console.log('creatBoardTemp; creating row ' + i);

      for (let j = 0; j < 7; j++) {
        if (typeof(boardArray[i][j]) !== 'undefined' && typeof(boardArray[i][j]) !== null) { continue; }
        const random = Math.random();
        if (random > 0.5) {
            boardArray[i][j] = new Tile(true, true, false, false, TileStyle.STRAIGHT);
          } else {
            boardArray[i][j] = new Tile(false, true, false, true, TileStyle.CORNER);
          }

      }
      console.log(new Tile().imgSrc);
    }



    const board = new Board(boardArray);
    console.log('CreateboardTemp; stop');
    console.log(boardArray);
    board.placeableTile = new Tile(true,  true,  false,  false,
       TileStyle.UGLY_ASS);
    return board;
  }

}
