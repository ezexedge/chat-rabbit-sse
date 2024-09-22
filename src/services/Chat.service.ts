import { inject, injectable } from "tsyringe";
import { RabbitmqService } from "./Rabbit.service";

@injectable()
export default class ChatService {
  constructor(
    @inject(RabbitmqService) private rabbitmqService: RabbitmqService,
  ) {}

  public async sendMessage(message: string) {
    await this.rabbitmqService.publishMessage({ data: message });
    return message;
  }

  public async receiveMessages(onMessage: (msg: any) => void) {
    console.log("onMessage", onMessage);
    await this.rabbitmqService.consumeMessages(onMessage);
  }
}
