import * as dotenv from 'dotenv';
import express from "express";
import Controller from "./controller/Controller";
import setGlobalErrorHandling from "./middleware/setGlobalErrorHandling";
import setGlobalMiddlewares from "./middleware/setGlobalMiddlewares";

class Application {
    private app: express.Application;
    private controllers: Controller<any>[];
    port: number | string;

    constructor(controllers: Controller<any>[]) {
        this.port = process.env.PORT || 5000;
        this.controllers = controllers;
        this.app = express();
        dotenv.config();
        this.app.set('trust proxy', 1);
    }

    private setEndpoints() {
        this.controllers.forEach(controller => {
            console.info(`Adding endpoints for ${controller.constructor.name}...`);
            for (const { method, path, endpoint, middleware = [] } of controller.getEndpoints()) {
                console.info(
                    `[${method.toUpperCase().padEnd(6)}] ${path}`
                );
                this.app[method](path, ...middleware, endpoint);
            }
            console.info(`[--------------------]`);
        });
    }

    start() {
        setGlobalMiddlewares(this.app);
        setGlobalErrorHandling(this.app);
        this.setEndpoints();

        return this.app;
    }
}

export default Application;