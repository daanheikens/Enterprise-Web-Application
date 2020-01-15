export enum TurnResultAction {
  VALID_MOVE = 'VALID_MOVE',
  COLLECTED_TREASURE = 'COLLECTED_TREASURE',
  GAME_END = 'GAME_END',
  INVALID_MOVE = 'INVALID_MOVE'
}

export default class TurnResult {
  private readonly _resultAction: TurnResultAction;

  public constructor(resultAction: TurnResultAction) {
    this._resultAction = resultAction;
  }

  public get resultAction(): TurnResultAction {
    return this._resultAction;
  }
}
