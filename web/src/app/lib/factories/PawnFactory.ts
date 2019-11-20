import {Board} from '../../model/Board';
import {Pawn} from '../../model/Pawn';
import {Tile} from '../../model/Tile';

export class PawnFactory {

  public static createPawns(board: Board): Pawn {

    let pawns = [];
    let playerPawn = null;

    board.tiles.forEach((tile: Tile[]) => {
      tile.forEach((tile: Tile) => {
        if (tile.pawnDTO === null) {
          return;
        }

        if (playerPawn === null && tile.pawnDTO.user.userId === board.currentUser.userId) {
          playerPawn = tile.pawnDTO;
        }

        this.placePawn(pawns, board, tile);
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

  private static placePawn(pawns: Pawn[], board: Board, tile: Tile): void {
    const tileElement: HTMLElement = document.getElementById(board.tiles[tile.xCoordinate][tile.yCoordinate].tileId.toString());

    tile.pawnDTO.topOffset = (PawnFactory.getOffsetTop(tileElement) + 10).toString();
    tile.pawnDTO.leftOffset = (PawnFactory.getOffsetLeft(tileElement) + 25).toString();
    tile.pawnDTO.imgSrc = '/assets/images/pawn.png';

    pawns.push(tile.pawnDTO);
  }
}
