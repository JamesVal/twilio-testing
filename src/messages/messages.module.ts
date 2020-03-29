import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageQueueService } from './message-queue.service';
import { MessageQueueConsumer } from './messages-consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: "messages"
    }),
  ],
  exports: [MessageQueueService],
  providers: [MessageQueueService, MessageQueueConsumer]
})
export class MessagesModule {}
