import { Channel, connect, Connection, ConsumeMessage } from "amqplib";
import { injectable, singleton } from "tsyringe";

@singleton()
@injectable()
export class RabbitmqService {
  private connectionUrl: string;
  private exchangeName: string;
  private exchangeType: string;
  private routingKey: string;
  private queueName: string;
  private connection!: Connection;
  private channel!: Channel;

  constructor() {
    this.connectionUrl = process.env.RABBIT_URL
    this.exchangeName = process.env.EXCHANGE_NAME
    this.exchangeType = process.env.EXCHANGE_TYPE
    this.routingKey = process.env.ROUTING_KEY
    this.queueName = process.env.QUEUE_NAME
  }

  async init() {
    this.connection = await connect(this.connectionUrl);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
    await this.channel.assertQueue(this.queueName, { durable: true });
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
  }

  async publishMessage(message: unknown): Promise<boolean> {
    const published = this.channel.publish(
      this.exchangeName,
      this.routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    return published;
  }

  async consumeMessages(onMessage: (msg: any) => void) {
    this.channel.consume(this.queueName, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        onMessage(message);
        this.channel.ack(msg);
      }
    });
  }
}
