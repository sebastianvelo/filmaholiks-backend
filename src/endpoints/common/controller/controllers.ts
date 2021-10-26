import express from "express";
import Controller from "../../../common/controller/Controller";
import DetailController from "../../detail/controller/DetailController";

const setControllers = (app: express.Application) => {
    const controllers: Array<Controller> = [];
    controllers.push(new DetailController(app));
    return controllers;
}

export default setControllers;