import express from "express";
import * as dotenv from 'dotenv';
import setMiddlewares from "./middleware/setMiddlewares";
import setControllers from "./controller/setControllers";
import { initializeFirebaseAdmin } from "./config/firebase";

class Application {
    app: express.Application;
    port: number | string;

    constructor(port: number | string) {
        dotenv.config();
        this.app = express();
        this.port = port;
    }

    init() {
        initializeFirebaseAdmin();
        setMiddlewares(this.app);
        setControllers(this.app);
        this.setupErrorHandling();

        return this.app;
    }

    setupErrorHandling() {
        this.app.use((req, res, next) => {
            res.status(404).json({ error: "Endpoint not found" });
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: "Something went wrong" });
        });
    }
}

export default Application;