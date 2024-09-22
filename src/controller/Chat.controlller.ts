import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import ChatService from "../services/Chat.service";

@injectable()
export default class ChatController {
  private clients: Response[] = [];

  constructor(
    @inject(ChatService) private chatService: ChatService,
  ) {}

  async sendMessage(req: Request, res: Response) {
    const { message } = req.body;
    const data = await this.chatService.sendMessage(message);
    res.status(200).json({ data });
  }

  async getMessage(req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    this.clients.push(res);

    req.on("close", () => {
      this.clients = this.clients.filter(client => client !== res);
    });

    this.chatService.receiveMessages((msg) => {
      this.clients.forEach(client => {
        client.write(`data: ${JSON.stringify(msg)}\n\n`);
      });
    });
  }
}
