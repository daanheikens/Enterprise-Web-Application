import {WallType} from './WallType';
import {TileStyle} from '../utils/TileStyle';
import {TileRotation} from './TileRotation';

export class Tile {

  constructor(wallType = WallType.NoWalls, topWall = false, bottomWall = false, rightWall = false, leftWall = false,
              imgSrc = TileStyle.EMPTY) {
    this.wallType = wallType;
    this.topWall = topWall;
    this.bottomWall = bottomWall;
    this.rightWall = rightWall;
    this.leftWall = leftWall;
    this.imgSrc = imgSrc;
  }

  public wallType: WallType;
  public topWall: boolean;
  public bottomWall: boolean;
  public rightWall: boolean;
  public leftWall: boolean;
  public imgSrc: TileStyle;
  public tileRotation: TileRotation = TileRotation.Zero;
}
