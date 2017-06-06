import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatSocketService } from '../chat-socket.service';
import { Message } from '../models/message';
declare const $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatSocketService]
})
export class ChatComponent implements OnInit, OnDestroy {

  public connected = false;
  messages = [];
  connection;

  constructor(private _authService: AuthService, private _chatService: ChatSocketService) { }

  ngOnInit() {
    this._chatService.socketConnect();
    this.connected = true;
    this.connection = this._chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      const block = $('#show-conversation-block');
      block.animate({scrollTop: block.prop('scrollHeight')}, 400);
    });
  }

  joinConversation() {
    this._chatService.socketConnect();
    this.connected = true;
  }

  leaveConversation() {
    this.connected = false;
  }

  sendMessage(form: any, event: Event) {
    event.preventDefault();
    const message = form.value.message;
    const data = new Message(this._authService.signedIn.name, this._authService.signedIn._id, message);
    this._chatService.sendMessage(data);
    this.messages.push(data);
    const block = $('#show-conversation-block');
    block.animate({scrollTop: block.prop('scrollHeight')}, 400);
    form.reset();
  }

  ngOnDestroy() {
    this._chatService.dissconnect();
  }

}
