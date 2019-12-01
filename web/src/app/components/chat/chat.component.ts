import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Message, MessageType} from '../../model/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  public gameId: number;

  public constructor(private readonly messageService: MessageService) {
  }

  public ngOnInit(): void {
    this.messageService.chatMessage.subscribe((message: Message) => this.onMessageReceived(message));
  }

  public onSendMessage(message: string): void {
    this.messageService.sendMessage(new Message(MessageType.CHAT_MESSAGE, message), this.gameId);
  }

  private onMessageReceived(message: Message): void {

  }
}
