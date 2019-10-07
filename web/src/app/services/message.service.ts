import {Injectable} from '@angular/core';
import {CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly stompClient: CompatClient;

  constructor() {
    this.stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));
    this.stompClient.connect({}, this.onConnected(), this.onError());
  }

  public sendMessage() {
    // Send the message to the spring endpoint
  }

  public onMessageReceived(): void {
    // Handle callback (Let component subscribe to changes)
  }



  private onConnected(): void {
    // Fetch the user room, if no room is found create a new room for the user. (Room must be gameId)
    // subscribe to that room
  }

  private onError(): void {
    // Handle error and show error in HTML? (let component subscribe to changes)
  }
}
