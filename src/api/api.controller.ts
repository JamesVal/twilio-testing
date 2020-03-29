import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageQueueService } from '../messages/message-queue.service';

@Controller('api')
export class ApiController {

  @Get()
  getAll(@Req() request: Request): string {
    console.log(process.env.ACCOUNT_SID);
    return "api is working!";
  }

  @Post("test")
  async testSend(@Req() request: Request): Promise<string> {
    console.log("request body", request.body);
    return new Promise((resolve, reject) => {
      this.messageQueueService.addToQueue({
        type: 0,
        phoneNumber: "number",
        message: "message"
      });
      resolve("test queued");
    });
  }

  constructor(private messageQueueService: MessageQueueService) {}

}
