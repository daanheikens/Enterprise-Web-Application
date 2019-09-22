import {TileDefinition} from '../model/tileDefinition';
import {WallType} from '../model/WallType';

export class BoardFactory {

  private TileDefinition: TileDefinition[] = [
      new TileDefinition(WallType.Corner, '', false, true, false, true),
      new TileDefinition(WallType.Straight, '', true, true, false, false),
  ];


}
