import {Board} from '../../model/Board';
import {Pawn, PawnType} from '../../model/Pawn';

export class PawnFactory {

  public static createPawns(board: Board): Pawn {

    // Loop over tiles

    // If pawn on a tile then check if the pawnUserId === currentUser id.
    // If equal, this is the pawn of the current user else check position in players array.
    /**
     * Check if this is actually viable?
     *
     * 1 = blue
     * 2 = green
     * 3 = yellow
     * 4 = red
     */
    const blueTile = document.getElementById(board.tiles[0][0].tileId);
    const greenTile = document.getElementById(board.tiles[0][6].tileId);
    const yellowTile = document.getElementById(board.tiles[6][0].tileId);
    const redTile = document.getElementById(board.tiles[6][6].tileId);

    // let pawnBlue = new Pawn(1, '/assets/images/pawn.png', PawnFactory.getOffsetTop(blueTile).toString(), (blueTile.offsetLeft + 23).toString());
    // let pawnGreen = new Pawn(2, '/assets/images/pawn.png', PawnFactory.getOffsetTop(greenTile).toString(), (greenTile.offsetLeft + 23).toString());
    // let pawnYellow = new Pawn(3, '/assets/images/pawn.png', (10 + PawnFactory.getOffsetTop(yellowTile) * 2.5).toString(), (yellowTile.offsetLeft + 23).toString());
    // let pawnRed = new Pawn(4, '/assets/images/pawn.png', (10 + PawnFactory.getOffsetTop(redTile) * 2.5).toString(), (redTile.offsetLeft + 23).toString());

    // board.pawns = new PawnCollection(pawnRed, pawnBlue, pawnYellow, pawnGreen);
    //
    // return pawnBlue;

    return new Pawn(1, PawnType.BLUE);
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
}
