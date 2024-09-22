import { RabbitmqService } from "../services/Rabbit.service";
import ChatService from "../services/Chat.service";
import {  container } from "tsyringe";


container.register(RabbitmqService, { useClass: RabbitmqService });
container.register(ChatService, { useClass: ChatService });

export default container;