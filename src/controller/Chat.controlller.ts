import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import ChatService from "../services/Chat.service";


@injectable()
export default class ChatController {
  constructor(
    @inject(ChatService) private chatService: ChatService,
  ) {}

    async getChat(req:Request,res:Response){
        const data = this.chatService.getChat()
        res.status(200).json({data})
    } 

}
