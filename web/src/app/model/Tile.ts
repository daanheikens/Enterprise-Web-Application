export enum WallType {
  NoWalls = 'NoWalls'
}

export class Tile {

  constructor(wallType: WallType) {
    this.wallType = wallType;
  }

  private wallType: WallType;

  public GetClass(){
    this.wallType.toString();
  }

}
