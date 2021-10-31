import express from "express";
import setMiddlewares from "./middleware/setMiddlewares";
import setControllers from "./controller/setControllers";
import setServer from "./server/setServer";

class Application {
    app: express.Application;

    port: number | string;

    constructor(port: number | string) {
        this.app = express();
        this.port = port;
    }

    init() {
        setServer(this.app, this.port);
        setMiddlewares(this.app);
        setControllers(this.app);
        return this;
    }
}

export default Application;