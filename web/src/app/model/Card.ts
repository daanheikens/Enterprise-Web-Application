export default class Card {

  private readonly _id: number;

  private readonly _treasureStyle: string;

  private readonly _collected: boolean;

  constructor(id: number, treasureStyle: string, collected: boolean) {
    this._id = id;
    this._treasureStyle = treasureStyle;
    this._collected = collected;
  }

  get id(): number {
    return this._id;
  }

  get treasureStyle(): string {
    return this._treasureStyle;
  }

  get collected(): boolean {
    return this._collected;
  }
}
