import * as dotenv from 'dotenv';
import express from "express";
import { EndpointMethod, HTTPMethod, HTTPVerb } from "./common";
import Controller from "./controller/NController";
import setGlobalErrorHandling from "./error/setGlobalErrorHandling";
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

    private when(method: HTTPVerb): HTTPMethod {
        return {
            at: (path: string = "") => {
                console.info(`${path.padEnd(15)} [${method.toUpperCase()}]`);
                return {
                    use: (endpoint: EndpointMethod, middlewares: any[] = []) =>
                        this.app[method](path, ...middlewares, endpoint)
                };
            }
        };
    }

    private setEndpoints = () => {
        this.controllers.forEach((controller) => {
            console.info(`Adding [${controller.name.toUpperCase()}] endpoints...`);
            controller.getEndpoints().forEach(({ path, method, endpoint, middleware = [] }) => {
                this.when(method).at(path).use(endpoint, middleware);
            })
            console.info(`[|||||||||||||||||]`);
        })
    }

    start() {
        setGlobalMiddlewares(this.app);
        setGlobalErrorHandling(this.app);
        this.setEndpoints();

        return this.app;
    }
}

export default Application;