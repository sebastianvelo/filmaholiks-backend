import express from "express";
import setControllers from "../../endpoints/common/controller/Controllers";
import setMiddlewares from "../../endpoints/common/middleware/middlewares";
import setServer from "../../endpoints/common/server/server";

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