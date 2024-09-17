import "reflect-metadata";

import express, { Express } from "express";
import { container } from "tsyringe";
import Route from "./routes";

export default class App{

    public app:Express
    
    constructor(){

        this.app = express();
        this.app.use(express.json());
        this.registerRoutes();

    }

    private registerRoutes() {
        const route = container.resolve(Route);
        route.initRoutes(this.app);
      }
    async run() {

        this.app.listen(3000,"localhost", () => {
            console.log("runnn..")
        });
      }
}

const app = new App();
app.run();