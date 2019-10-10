import {Injectable} from '@angular/core';
import {CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Message, MessageType} from '../model/Message';
import {GameService} from './game.service';
import {first} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /**
   * Observables for messages
   */
  public joinGame: Observable<Message>;
  public turnEnded: Observable<Message>;
  public leaveGame: Observable<Message>;
  public movePawn: Observable<Message>;
  /**
   * Subject for the messages
   */
  private joinGameSubject: Subject<Message>;
  private turnEndedSubject: Subject<Message>;
  private leaveGameSubject: Subject<Message>;
  private movePawnSubject: Subject<Message>;

  private static readonly BASE_PREFIX = '/app/game';
  private stompClient: CompatClient;
  private currentSubscription: StompSubscription;
  private isConnected = false;

  constructor(private readonly gameService: GameService,) {
    this.joinGameSubject = new Subject<Message>();
    this.turnEndedSubject = new Subject<Message>();
    this.leaveGameSubject = new Subject<Message>();
    this.movePawnSubject = new Subject<Message>();
    this.joinGame = this.joinGameSubject.asObservable();
    this.turnEnded = this.turnEndedSubject.asObservable();
    this.leaveGame = this.leaveGameSubject.asObservable();
    this.movePawn = this.movePawnSubject.asObservable();
  }

  public sendMessage(message: Message, gameId: number) {
    if (!this.isConnected) {
      this.stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
      this.stompClient.connect({}, this.onConnected, this.onError);
    }

    console.log("Connected");

    switch (message.type) {
      case MessageType.JOIN_GAME:
        console.log("Joining game......");
        this.stompClient.send(`${MessageService.BASE_PREFIX}/join`, {}, JSON.stringify(message));
        break;
      case MessageType.TURN_ENDED:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/notify`, {}, JSON.stringify(message));
        break;
      case MessageType.LEAVE_GAME:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/leave`, {}, JSON.stringify(message));
        break;
      case MessageType.MOVE_PAWN:
        this.stompClient.send(`${MessageService.BASE_PREFIX}/move`, {}, JSON.stringify(message));
        break;
      default:
        throw new Error('Unexpected type');
    }
  }

  private onMessageReceived(payload): void {

  }

  private onConnected(): void {
    let game;
    this.gameService.getCurrentGame()
      .pipe(first())
      .subscribe(
        data => {
          game = data;
        });

    if (game == null) {
      return;
    }

    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    this.currentSubscription = this.stompClient.subscribe(`/channel/${game.getId()}`, this.onMessageReceived);

    this.isConnected = true;
  }

  private onError(error): void {
    this.stompClient.disconnect();
  }
}
