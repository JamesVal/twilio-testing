import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import * as twilio from 'twilio';

@Processor('messages')
export class MessageQueueConsumer {
  twilioClient: any = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

  @Process()
  async processMessages(job: Job): Promise<any> {
    console.log("processing", job.data);

    return this.twilioClient.messages
      .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: process.env.TWI_NUMBER,
        to: process.env.DST_NUMBER
      }).then((message) => {
        return "message sent";
      });
  }

  @OnQueueCompleted()
  async jobFinished(job: Job, result: any): Promise<any> {
    console.log("job", job.data, "result", result);
  }
}