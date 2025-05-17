import * as dotenv from 'dotenv';
import express from "express";
import setControllers from "./controller/controllers";
import setGlobalErrorHandling from './error/setGlobalErrorHandling';
import setGlobalMiddlewares from "./middleware/setGlobalMiddlewares";

class Application {
    app: express.Application;

    port: number | string;

    constructor(port: number | string) {
        dotenv.config();
        this.app = express();
        this.app.set('trust proxy', 1);
        this.port = port;
    }

    init() {
        setGlobalMiddlewares(this.app);
        setControllers(this.app);
        setGlobalErrorHandling(this.app);

        return this.app;
    }

}

export default Application;