import {Tile} from '../model/Tile';
import {Board} from '../model/Board';
import {TileStyle} from '../utils/TileStyle';

export class BoardFactory {

  private TilesToInert: Tile[] = [
    new Tile(1, true, false, false, true, TileStyle.MOUSE),
    new Tile(2, true, false, false, true, TileStyle.SALAMANDER),
    new Tile(3, false, true, true, false, TileStyle.BUG),
    new Tile(4, false, true, false, false, TileStyle.DRAGON),
    new Tile(5, true, false, false, true, TileStyle.SPIDER),
    new Tile(6, false, false, true, false, TileStyle.WITCH),
    new Tile(7, false, true, false, false, TileStyle.BAT),
    new Tile(8, true, false, false, false, TileStyle.GHOST),
    new Tile(9, false, true, false, false, TileStyle.GHOST_UGLY),
    new Tile(10, true, false, false, true, TileStyle.OWL),
    new Tile(11, true, false, true, false, TileStyle.FLY_THING),
  ];

  public CreateBoardTemp() {
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

    boardArray[0][0] = new Tile(12, true, false, false, true, TileStyle.CORNER_BLUE);
    boardArray[0][2] = new Tile(13, true, false, false, false, TileStyle.HELMET);
    boardArray[0][4] = new Tile(14, true, false, false, false, TileStyle.CANDLE);
    boardArray[0][6] = new Tile(15, true, false, true, true, TileStyle.CORNER_GREEN);

    boardArray[2][0] = new Tile(16, false, false, false, true, TileStyle.SWORD);
    boardArray[2][2] = new Tile(17, false, false, false, true, TileStyle.GEM);
    boardArray[2][4] = new Tile(18, true, false, false, false, TileStyle.CHEST);
    boardArray[2][6] = new Tile(19, false, false, true, false, TileStyle.RING);

    boardArray[4][0] = new Tile(20, false, false, false, true, TileStyle.SKULL);
    boardArray[4][2] = new Tile(21, false, true, false, false, TileStyle.KEYS);
    boardArray[4][4] = new Tile(22, false, false, true, false, TileStyle.CROWN);
    boardArray[4][6] = new Tile(23, false, false, true, false, TileStyle.MAP);

    boardArray[6][0] = new Tile(24, false, true, false, true, TileStyle.CORNER_YELLOW);
    boardArray[6][2] = new Tile(25, false, true, false, false, TileStyle.GOLD);
    boardArray[6][4] = new Tile(26, false, true, false, false, TileStyle.BOOK);
    boardArray[6][6] = new Tile(27, false, true, true, true, TileStyle.CORNER_RED);

    let idNumber = 28;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (typeof (boardArray[i][j]) !== 'undefined' && typeof (boardArray[i][j]) !== null) {
          continue;
        }
        const random = Math.random();
        if (random > 0.5) {
          boardArray[i][j] = new Tile(idNumber, true, true, false, false, TileStyle.STRAIGHT);
        } else {
          boardArray[i][j] = new Tile(idNumber, false, true, false, true, TileStyle.CORNER);
        }
        idNumber++;
      }
    }

    const board = new Board(boardArray);
    board.placeableTile = new Tile(idNumber, true, true, false, false, TileStyle.UGLY_ASS);
    return board;
  }
}
