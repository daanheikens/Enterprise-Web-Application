import {Board} from '../../model/Board';
import {Pawn, PawnType} from '../../model/Pawn';
import {Tile} from '../../model/Tile';
import PawnCollection from '../../collections/PawnCollection';

export class PawnFactory {

  public static createPawns(board: Board): Pawn {

    let pawns = [];
    let playerPawn = null;

    board.tiles.forEach((tile: Tile[]) => {
      tile.forEach((tile: Tile) => {
        if (playerPawn === null && tile.pawnDTO !== null && tile.pawnDTO.user.userId === board.currentUser.userId) {
          playerPawn = tile.pawnDTO;
          const tileElement: HTMLElement = document.getElementById(board.tiles[tile.xCoordinate][tile.yCoordinate].tileId.toString());

          tile.pawnDTO.topOffset = (PawnFactory.getOffsetTop(tileElement) + 10).toString();
          tile.pawnDTO.leftOffset = (PawnFactory.getOffsetLeft(tileElement) + 25).toString();
          tile.pawnDTO.imgSrc = '/assets/images/pawn.png';

          pawns.push(playerPawn);
        } else if (tile.pawnDTO !== null) {
          const tileElement: HTMLElement = document.getElementById(board.tiles[tile.xCoordinate][tile.yCoordinate].tileId.toString());

          tile.pawnDTO.topOffset = (PawnFactory.getOffsetTop(tileElement) + 10).toString();
          tile.pawnDTO.leftOffset = (PawnFactory.getOffsetLeft(tileElement) + 25).toString();

          tile.pawnDTO.imgSrc = '/assets/images/pawn.png';
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
