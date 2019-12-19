import {Game} from './Game';

export default class Invite {

  private readonly _inviteId: number;

  private readonly _inviterName: string;

  private readonly _game: Game;

  constructor(inviteId: number, inviterName: string, game: Game) {
    this._inviteId = inviteId;
    this._inviterName = inviterName;
    this._game = game;
  }

  get inviteId(): number {
    return this._inviteId;
  }

  get inviterName(): string {
    return this._inviterName;
  }

  get game(): Game {
    return this._game;
  }
}
