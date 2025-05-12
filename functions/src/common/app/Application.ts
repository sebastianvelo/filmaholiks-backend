import * as dotenv from 'dotenv';
import express from "express";
import rateLimit from 'express-rate-limit';
import setControllers from "./controller/setControllers";
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
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        });

        this.app.use(limiter);
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