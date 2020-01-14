import {Injectable, OnInit} from '@angular/core';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {Message, MessageType} from '../../model/Message';
import {GameService} from '../game/game.service';
import {Observable, Subject} from 'rxjs';
import {Game} from '../../model/Game';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  /**
   * Observables for messages
   */
  public joinGame: Observable<Message>;
  public turnEnded: Observable<Message>;
  public leaveGame: Observable<Message>;
  public chatMessage: Observable<Message>;
  public gameFinished: Observable<Message>;
  /**
   * Subject for the messages
   */
  private joinGameSubject: Subject<Message>;
  private turnEndedSubject: Subject<Message>;
  private leaveGameSubject: Subject<Message>;
  private chatMessageSubject: Subject<Message>;
  private gameFinishedSubject: Subject<Message>;

  private static readonly BASE_PREFIX = '/app/game';
  private stompClient: CompatClient;
  private game: Game;


  constructor(
    private readonly authService: AuthService,
    private readonly gameService: GameService
  ) {
    this.joinGameSubject = new Subject<Message>();
    this.turnEndedSubject = new Subject<Message>();
    this.leaveGameSubject = new Subject<Message>();
    this.chatMessageSubject = new Subject<Message>();
    this.gameFinishedSubject = new Subject<Message>();
    this.joinGame = this.joinGameSubject.asObservable();
    this.turnEnded = this.turnEndedSubject.asObservable();
    this.leaveGame = this.leaveGameSubject.asObservable();
    this.chatMessage = this.chatMessageSubject.asObservable();
    this.gameFinished = this.gameFinishedSubject.asObservable();
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe(
      data => {
        this.game = data;
      }
    );
  }

  public connect(gameId: number) {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser['access_token']) {
      this.authService.logout();
      return;
    }

    this.stompClient = Stomp.client(`ws://localhost:8080/ws?access_token=${currentUser['access_token']}`);
    this.stompClient.connect({}, () => {
      this.sendMessage(new Message(MessageType.JOIN_GAME), gameId);
      this.sendMessage(new Message(MessageType.CHAT_MESSAGE, '<b>Came online!</b>'), gameId);
      this.stompClient.subscribe(`/channel/${gameId}`, (payload) => {
        this.onMessageReceived(JSON.parse(payload.body));
      });
    }, () => {
      this.disconnect(gameId);
    });
  }

  public disconnect(gameId?: number): void {
    if (this.stompClient && this.stompClient.connected) {
      if (gameId !== undefined) {
        this.sendMessage(new Message(MessageType.CHAT_MESSAGE, '<b>Went offline!</b>'), gameId);
      }
      this.stompClient.disconnect();
    }
  }

  public sendMessage(message: Message, gameId: number) {
    if (!this.stompClient.connected) {
      return;
    }

    switch (message.getType()) {
      case MessageType.CHAT_MESSAGE:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/${gameId}/chat`, {}, JSON.stringify(message));
        break;
      case MessageType.JOIN_GAME:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/${gameId}/join`, {}, JSON.stringify(message));
        break;
      case MessageType.TURN_ENDED:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/${gameId}/notify`, {}, JSON.stringify(message));
        break;
      case MessageType.LEAVE_GAME:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/${gameId}/leave`, {}, JSON.stringify(message));
        break;
      case MessageType.END_GAME:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/${gameId}/finish`, {}, JSON.stringify(message));
        break;
      default:
        throw new Error('Unexpected type');
    }
  }

  private onMessageReceived(message) {
    console.log(message);
    switch (message.type) {
      case MessageType.CHAT_MESSAGE:
        this.chatMessageSubject.next(message);
        break;
      case MessageType.JOIN_GAME:
        this.joinGameSubject.next(message);
        break;
      case MessageType.LEAVE_GAME:
        this.leaveGameSubject.next(message);
        break;
      case MessageType.TURN_ENDED:
        this.turnEndedSubject.next(message);
        break;
      case MessageType.END_GAME:
        this.gameFinishedSubject.next(message);
        break;
      default:
        throw new Error('Unexpected type');
    }
  }
}
