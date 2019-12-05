import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/messaging/message.service';
import {Message, MessageType} from '../../model/Message';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ChatFormFactory} from '../../forms/ChatFormFactory';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input()
  public gameId: number;
  public loading = false;
  public submitted = false;
  public error = '';

  private chatForm: FormGroup;
  private tpl = '<div style="border: 2px solid #dedede;\n' +
    '  background-color: #f1f1f1;\n' +
    '  border-radius: 5px;\n' +
    '  padding: 10px;\n' +
    '  margin: 10px 0;"> ' + '<span>{{message}}</span> ' + '<span style="float: right;\n' +
    '  color: #999;"><b>{{time}}</b></span> ' + '</div>';

  public constructor(private readonly messageService: MessageService) {
  }

  public ngOnInit(): void {
    this.messageService.chatMessage.subscribe((message: Message) => this.onMessageReceived(message));
    this.chatForm = new ChatFormFactory().createForm();
  }

  public ngAfterViewInit(): void {
  }

  public get formControls(): { [p: string]: AbstractControl } {
    return this.chatForm.controls;
  }

  public onSendMessage(): void {
    this.submitted = true;

    if (this.chatForm.invalid) {
      return;
    }

    this.messageService.sendMessage(new Message(MessageType.CHAT_MESSAGE, this.formControls.chatMessage.value), this.gameId);
  }

  private onMessageReceived(message): void {
    this.appendMessage(message.content, message.sender);
  }

  private appendMessage(message: string, name: string) {
    const date = new Date();
    let htmlElement = <HTMLElement>document.querySelector('.message-box');
    htmlElement.innerHTML += this.tpl
      .replace('{{message}}', name + ': ' + message)
      .replace('{{time}}', date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());

    // Focus to bottom
    htmlElement.scrollTop = htmlElement.scrollHeight;
  }
}
