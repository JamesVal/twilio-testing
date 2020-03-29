import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BullModule } from '@nestjs/bull';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MessagesModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
