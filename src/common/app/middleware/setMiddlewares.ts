import cors from "cors";
import express from "express";
import Logger from "../../log/Logger";

const setMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(cors());
    app.use(Logger);
}

export default setMiddlewares;