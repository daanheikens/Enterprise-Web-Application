export default class Notification {

  private readonly _notificationId: number;

  private readonly _message: string;

  private readonly _creationTimestamp: string;

  private readonly _sender: string;

  constructor(notificationId: number, message: string, creationTimestamp: string, sender: string) {
    this._notificationId = notificationId;
    this._message = message;
    this._creationTimestamp = creationTimestamp;
    this._sender = sender;
  }

  get notificationId() {
    return this._notificationId;
  }

  get message() {
    return this._message;
  }

  get creationTimestamp() {
    return this._creationTimestamp;
  }

  get sender(): string {
    return this._sender;
  }
}
