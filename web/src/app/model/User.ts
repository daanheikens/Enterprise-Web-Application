export class User {
  private readonly _userId: number;
  private _screenName: string;
  private _password?: string;
  private _image?: string;
  private readonly _token?: string;
  private _isTurn = false;

  constructor(userId: number, screenName: string, password?: string, image?: string, token?: string) {
    this._userId = userId;
    this._screenName = screenName;
    this._password = password;
    this._image = image;
    this._token = token;
  }

  get userId(): number {
    return this._userId;
  }

  get screenName(): string {
    return this._screenName;
  }

  set screenName(value: string) {
    this._screenName = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get token(): string {
    return this._token;
  }

  set isTurn(isTurn: boolean) {
    this._isTurn = isTurn;
  }

  get isTurn(): boolean {
    return this._isTurn;
  }
}
