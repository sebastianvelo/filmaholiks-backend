import express from "express";
import Controller from "../../../common/controller/Controller";
import DetailController from "../../detail/controller/DetailController";
import ExploreController from "../../explore/controller/ExploreController";
import SearchResultController from "../../search-result/controller/SearchResultController";

const setControllers = (app: express.Application) => {
    const controllers: Array<Controller> = [];
    controllers.push(new DetailController(app));
    controllers.push(new ExploreController(app));
    controllers.push(new SearchResultController(app));
    return controllers;
}

export default setControllers;