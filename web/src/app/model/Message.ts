export enum MessageType {
  TURN_ENDED,
  JOIN_GAME,
  LEAVE_GAME,
  MOVE_PAWN
}

export class Message {
  private readonly _type: MessageType;
  private readonly _content: string;
  private readonly _sender: string;

  constructor(type: MessageType, content: string, sender: string) {
    this._type = type;
    this._content = content;
    this._sender = sender;
  }

  get type(): MessageType {
    return this._type;
  }

  get content(): string {
    return this._content;
  }

  get sender(): string {
    return this._sender;
  }
}

