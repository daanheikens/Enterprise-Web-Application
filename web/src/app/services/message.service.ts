import {AfterViewInit, Injectable} from '@angular/core';
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
    let roomId = 1;
    let topic = `/app/chat/${roomId}`;


    let currentSubscription = this.stompClient.subscribe(`/channel/${roomId}`, this.onMessageReceived);

    this.stompClient.send(`${topic}/addUser`,
      {},
      JSON.stringify({sender: "Daan", type: 'JOIN'})
    );
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
