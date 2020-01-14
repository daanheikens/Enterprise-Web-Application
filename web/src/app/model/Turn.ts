export default class Turn {

  private _withTreasure = false;

  private _tileInsertedMessage: string;

  get withTreasure(): boolean {
    return this._withTreasure;
  }

  set withTreasure(value: boolean) {
    this._withTreasure = value;
  }

  get tileInsertedMessage(): string {
    return this._tileInsertedMessage;
  }

  set tileInsertedMessage(value: string) {
    this._tileInsertedMessage = value;
  }
}
