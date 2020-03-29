import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

export interface MessageObject {
  type: number,
  phoneNumber: string,
  message: string
}

@Injectable()
export class MessageQueueService {
  async addToQueue(newMessage: MessageObject): Promise<any> {
    console.log("queue:", newMessage);
    let job = this.messageQueue.add(newMessage);
  }

  constructor(@InjectQueue('messages') private messageQueue: Queue) {}
}

