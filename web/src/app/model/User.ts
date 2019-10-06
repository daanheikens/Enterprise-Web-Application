export class User {
  private readonly _id: number;
  private _username: string;
  private _password?: string;
  private _image?: string;
  private readonly _token?: string;

  constructor(id: number, username: string, password?: string, image?: string, token?: string) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._image = image;
    this._token = token;
  }

  get id(): number {
    return this._id;
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
