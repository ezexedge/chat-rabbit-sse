import "reflect-metadata";
import express, { Express } from "express";
import { container } from "tsyringe";
import Route from "./routes";
import { RabbitmqService } from "./services/Rabbit.service";
import cors from "cors";
export default class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.registerRoutes();
    this.app.use(cors({
        origin: process.env.CLIENT_PORT, 
        methods: "GET,POST",
        allowedHeaders: "Content-Type",
      }));
  }

  private registerRoutes() {
    const route = container.resolve(Route);
    route.initRoutes(this.app);
  }

  async run() {
    const rabbitmqService = container.resolve(RabbitmqService);
    await rabbitmqService.init();

    this.app.listen(process.env.BACKEND_PORT, "localhost", () => {
      console.log("Server running on http://localhost:3000");
    });
  }
}

const app = container.resolve(App);
app.run();
