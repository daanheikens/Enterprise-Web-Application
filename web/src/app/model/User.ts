export class User {
  private readonly _userId: number;
  private _username: string;
  private _password?: string;
  private _image?: string;
  private readonly _token?: string;

  constructor(userId: number, username: string, password?: string, image?: string, token?: string) {
    this._userId = userId;
    this._username = username;
    this._password = password;
    this._image = image;
    this._token = token;
  }

  get userId(): number {
    return this._userId;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
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
}
