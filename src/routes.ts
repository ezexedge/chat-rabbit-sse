import { Express } from "express";
import { injectable, container } from "tsyringe";
import ChatController from "./controller/Chat.controlller";

@injectable()
export default class Route {
  public initRoutes(app: Express) {
    const chatController = container.resolve(ChatController);

    app.post("/sendMessage", (req, res) => chatController.sendMessage(req, res));
    app.get("/getMessage", (req, res) => chatController.getMessage(req, res));
  }
}
