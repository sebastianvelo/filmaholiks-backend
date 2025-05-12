import express from "express";
import Controller from "./Controller";
import UserController from "../../api/entities/user/UserController";
import WatchlistController from "../../api/entities/watch-list/WatchlistController";
import DetailPageController from "../../api/pages/detail/DetailPageController";
import ExplorePageController from "../../api/pages/explore/ExplorePageController";
import SearchResultPageController from "../../api/pages/search-result/SearchResultPageController";

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