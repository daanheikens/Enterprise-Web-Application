/* tslint:disable:variable-name */
import {WallType} from './WallType';

enum TileDecoretor {
  None = ''
}

export class TileDefinition {
  get tileDecorator(): TileDecoretor {
    return this._tileDecorator;
  }

  set tileDecorator(value: TileDecoretor) {
    this._tileDecorator = value;
  }
  get defaultRightWall(): boolean {
    return this._defaultRightWall;
  }

  set defaultRightWall(value: boolean) {
    this._defaultRightWall = value;
  }
  get defaultLeftWall(): boolean {
    return this._defaultLeftWall;
  }

  set defaultLeftWall(value: boolean) {
    this._defaultLeftWall = value;
  }
  get defaultBottomWall(): boolean {
    return this._defaultBottomWall;
  }

  set defaultBottomWall(value: boolean) {
    this._defaultBottomWall = value;
  }
  get defaultTopWall(): boolean {
    return this._defaultTopWall;
  }

  set defaultTopWall(value: boolean) {
    this._defaultTopWall = value;
  }
  get imgSrc(): string {
    return this._imgSrc;
  }

  set imgSrc(value: string) {
    this._imgSrc = value;
  }
  get wallType(): WallType {
    return this._wallType;
  }

  set wallType(value: WallType) {
    this._wallType = value;
  }
    constructor(wallType: WallType, imgSrc: string, defaultTopWall: boolean, defaultBottomWall: boolean, defaultRightWall: boolean,
                defaultLeftWall: boolean, tileDecorator: TileDecoretor = TileDecoretor.None ) {
      this._wallType = wallType;
      this._imgSrc = imgSrc;
      this._defaultTopWall = defaultTopWall;
      this._defaultBottomWall = defaultBottomWall;
      this._defaultLeftWall = defaultLeftWall;
      this._defaultRightWall = defaultRightWall;
    }

    private _wallType: WallType;
    private _imgSrc: string;
    private _defaultTopWall: boolean;
    private _defaultBottomWall: boolean;
    private _defaultLeftWall: boolean;
    private _defaultRightWall: boolean;
    private _tileDecorator: TileDecoretor;
}
