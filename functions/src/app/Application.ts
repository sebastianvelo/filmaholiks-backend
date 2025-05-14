import * as dotenv from 'dotenv';
import express from "express";
import setControllers from "./controller/setControllers";
import setErrorHandling from './error/setErrorHandling';
import setMiddlewares from "./middleware/setMiddlewares";

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
        setMiddlewares(this.app);
        setControllers(this.app);
        setErrorHandling(this.app);

        return this.app;
    }

}

export default Application;