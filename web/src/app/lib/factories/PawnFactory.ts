import {Board} from '../../model/Board';
import {Pawn} from '../../model/Pawn';
import {Tile} from '../../model/Tile';

export class PawnFactory {

  public static createPawns(board: Board): Pawn {

    let pawns = [];
    let playerPawn = null;

    board.tiles.forEach((tile: Tile[]) => {
      tile.forEach((tile: Tile) => {
        if (playerPawn === null && tile.pawnDTO !== null && tile.pawnDTO.user.userId === board.currentUser.userId) {
          playerPawn = tile.pawnDTO;

          // calculate topoffset and left offset:
          tile.pawnDTO.topOffset = ((tile.xCoordinate * 90) + 265).toString();
          tile.pawnDTO.leftOffset = ((tile.yCoordinate * 90) - 10).toString();
          tile.pawnDTO.imgSrc = '/assets/images/pawn.png';

          pawns.push(playerPawn);
        } else if (tile.pawnDTO !== null) {
          pawns.push(tile.pawnDTO);
        }
      });
    });

    board.pawns = pawns;

    return playerPawn;
  }

  private static getOffsetTop(element): number {
    let offsetTop = 0;
    do {
      if (!isNaN(element.offsetTop)) {
        offsetTop += element.offsetTop;
      }
    } while (element == element.offsetParent);
    return offsetTop;
  }

  private static getOffsetLeft(element): number {
    let offsetLeft = 0;
    do {
      if (!isNaN(element.offsetLeft)) {
        offsetLeft += element.offsetLeft;
      }
    } while (element == element.offsetParent);
    return offsetLeft;
  }
}
