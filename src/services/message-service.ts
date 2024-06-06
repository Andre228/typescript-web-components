import { IMessage } from '../model/message.model';

export class MessageService {
  constructor() {}

  getAllMessages(): Promise<IMessage []> {
    return fetch('/message-mock.json').then(items => items.json());
  }
}