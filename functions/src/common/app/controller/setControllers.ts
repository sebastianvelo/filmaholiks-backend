import express from "express";
import DetailPageController from "../../../app/controller/DetailPageController";
import ExplorePageController from "../../../app/controller/ExplorePageController";
import SearchResultPageController from "../../../app/controller/SearchResultPageController";
import UserController from "../../../app/controller/UserController";
import WatchlistController from "../../../app/controller/WatchlistController";
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