import {Injectable} from '@angular/core';
import {CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly stompClient: CompatClient;

  constructor() {
    this.stompClient = Stomp.over(new SockJS('localhost:8080/ws'));
    this.stompClient.connect({}, this.onConnected(), this.onError());
  }

  public sendMessage() {

  }

  public onMessageReceived(): void {

  }

  private onConnected(): void {

  }

  private onError(): void {

  }
}
