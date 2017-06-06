import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Message } from './models/message';

@Injectable()
export class ChatSocketService {

  static socket: any;
  private url = 'http://localhost:8887';

  constructor(private _authService: AuthService) { }

  socketConnect() {
    ChatSocketService.socket = io.connect(this.url);
    if (this._authService.signedIn) {
      const user = JSON.stringify({
        'nick': this._authService.signedIn.name,
        'id': this._authService.signedIn._id
      });
      ChatSocketService.socket.emit('join', user);
    }
    console.log('Socket connected');
  }

  sendMessage(message: Message) {
    const data = JSON.stringify(message);
    ChatSocketService.socket.emit('message', data);
  }

  getMessages() {
    const observable = new Observable(observer => {
      ChatSocketService.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  dissconnect() {
    ChatSocketService.socket.disconnect();
    console.log('Socket dissconnected');
  }

}
