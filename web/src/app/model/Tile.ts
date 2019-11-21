import {TileStyle} from '../utils/TileStyle';
import {TileRotation} from './TileRotation';
import {Pawn} from './Pawn';

export class Tile {

  constructor(tileId: number, xCoordinate: number, yCoordinate: number, topWall = false, bottomWall = false, rightWall = false, leftWall = false,
              imgSrc = TileStyle.EMPTY, pawnDTO: Pawn = null, rotation = TileRotation.Zero) {
    this.tileId = tileId;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.topWall = topWall;
    this.bottomWall = bottomWall;
    this.rightWall = rightWall;
    this.leftWall = leftWall;
    this.imgSrc = imgSrc;
    this.pawnDTO = pawnDTO;
    this.rotation = rotation;
  }

  public readonly tileId: number;
  public xCoordinate: number | null;
  public yCoordinate: number | null;
  public topWall: boolean;
  public bottomWall: boolean;
  public rightWall: boolean;
  public leftWall: boolean;
  public imgSrc: TileStyle;
  public rotation: TileRotation;
  public pawnDTO: Pawn;
}
