import { makeAutoObservable } from 'mobx';
import { Channel } from 'pusher-js';
import { IMessage } from '../model/message.model';

class Message {
  messages: Array<IMessage> = [];
  isFetching: boolean = false;
  isError: boolean = false;
  roomChannel: Channel | null = null;
  isOptimisticInProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  bindChannel(channel: Channel) {
    this.roomChannel = channel;
  }

  disconnectChannel() {
    this.roomChannel = null;
  }

  getChannel() {
    return this.roomChannel;
  }

  messagesFetchingInProgress() {
    this.isFetching = true;
  }

  messagesFetchingSuccess(messages: IMessage[]) {
    this.isFetching = false;
    this.messages = messages;
  }

  saveMessage = (savedMessage: IMessage) => {
    // const buf = this.messages.map((message) => (message.id < 0 ? savedMessage : message));
    const buf = [...this.messages.filter((message) => message.id > 0), savedMessage];
    this.messages = buf;
    this.isOptimisticInProgress = false;
  };

  savingMessageOptimistic = (bufMessage: IMessage) => {
    this.isOptimisticInProgress = true;
    this.messages = [
      ...this.messages,
      { ...bufMessage, id: -1, created_at: Date.now() } as IMessage,
    ];
  };
}

const messageStore = new Message();

export default messageStore;
