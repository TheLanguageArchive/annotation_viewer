import { Component, OnInit } from '@angular/core';
import { MessageService } from '@fav-services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: '../views/messages.component.html',
  styleUrls: ['../styles/messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  getMessages() {
    return this.messageService.messages;
  }

  hasMessages() {
    return this.messageService.messages.length;
  }

  clearMessages() {
    this.messageService.clear();
  }

  ngOnInit() {
  }

}
