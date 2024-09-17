import { Express } from "express";
import { injectable, container } from "tsyringe";
import ChatController from "./controller/Chat.controlller";

@injectable()
export default class Route {
  public initRoutes(app: Express) {
    const chatController = container.resolve(ChatController);

    app.get("/chat", (req, res) => chatController.getChat(req, res));
  }
}
