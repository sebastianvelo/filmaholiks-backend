import express from "express";
import DetailPageController from "../../../api/controller/DetailPageController";
import ExplorePageController from "../../../api/controller/ExplorePageController";
import SearchResultPageController from "../../../api/controller/SearchResultPageController";
import UserController from "../../../api/controller/UserController";
import WatchlistController from "../../../api/controller/WatchlistController";
import Controller from "../../controller/Controller";

const setControllers = (app: express.Application) => {
    const controllers: Array<Controller> = [
        new DetailPageController(app),
        new ExplorePageController(app),
        new SearchResultPageController(app),
        new WatchlistController(app),
        new UserController(app)
    ];

    return controllers;
}

export default setControllers;