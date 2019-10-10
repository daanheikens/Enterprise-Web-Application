import {Injectable} from '@angular/core';
import {CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Message, MessageType} from '../model/Message';
import {GameService} from './game.service';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private static readonly BASE_PREFIX = '/app/game';

  private stompClient: CompatClient;

  private currentSubscription: StompSubscription;

  private isConnected = false;

  constructor(private readonly gameService: GameService) {
  }

  public connect(): void {
    this.stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  public sendMessage(message: Message, gameId: number) {
    if (!this.isConnected) {
      return;
    }

    if (message.type == MessageType.JOIN_GAME) {
      // Join room
    } else if (message.type == MessageType.TURN_ENDED) {

    } else if (message.type == MessageType.LEAVE_GAME) {

    } else if (message.type == MessageType.MOVE_PAWN) {

    } else {
      throw new Error('Unexpected type');
    }

    // Send a message to the message broker. a.k.a. turn or anything like it
  }

  private onMessageReceived(payload): void {
    if (!this.isConnected) {
      return;
    }
  }

  private onConnected(): void {
    let game;
    this.gameService.getCurrentGame()
      .pipe(first())
      .subscribe(
        data => {
          game = data;
        },
        error => {
          console.log(error);
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
    // Handle error and show error in HTML? (let component subscribe to changes)
  }
}
