export enum MessageType {
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  TURN_ENDED = 'TURN_ENDED',
  JOIN_GAME = 'JOIN_GAME',
  LEAVE_GAME = 'LEAVE_GAME',
  TREASURE_FOUND = 'TREASURE_FOUND',
  END_GAME = 'END_GAME'
}

export class Message {
  private readonly type: MessageType;
  private readonly content: string;
  private readonly sender: string;

  constructor(type: MessageType, content?: string, sender?: string) {
    this.type = type;
    this.content = content;
    this.sender = sender;
  }

  public getType(): MessageType {
    return this.type;
  }

  public getContent(): string {
    return this.content;
  }

  public getSender(): string {
    return this.sender;
  }
}

