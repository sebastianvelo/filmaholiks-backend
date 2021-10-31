import express from "express";
import setMiddlewares from "./middleware/setMiddlewares";
import setControllers from "./controller/setControllers";

class Application {
    app: express.Application;

    port: number | string;

    constructor(port: number | string) {
        this.app = express();
        this.port = port;
    }

    init() {
        setMiddlewares(this.app);
        setControllers(this.app);
        return this.app;
    }
}

export default Application;