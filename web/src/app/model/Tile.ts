import {TileStyle} from '../utils/TileStyle';
import {TileRotation} from './TileRotation';
import {Pawn} from './Pawn';

export class Tile {

  constructor(tileId: number, topWall = false, bottomWall = false, rightWall = false, leftWall = false,
              imgSrc = TileStyle.EMPTY, pawn: Pawn = null) {
    this.tileId = tileId;
    this.topWall = topWall;
    this.bottomWall = bottomWall;
    this.rightWall = rightWall;
    this.leftWall = leftWall;
    this.imgSrc = imgSrc;
    this.pawn = pawn;
  }

  public readonly tileId;
  public topWall: boolean;
  public bottomWall: boolean;
  public rightWall: boolean;
  public leftWall: boolean;
  public imgSrc: TileStyle;
  public tileRotation: TileRotation = TileRotation.Zero;
  public pawn: Pawn;
}
