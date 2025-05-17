import UserController from "@api/entities/user/controller/User.controller";
import WatchlistController from "@api/entities/watch-list/controller/Watchlist.controller";
import DetailPageController from "@api/pages/detail/controller/DetailPage.controller";
import ExplorePageController from "@api/pages/explore/controller/ExplorePage.controller";
import SearchResultPageController from "@api/pages/search-result/controller/SearchResultPage.controller";
import Controller from "./Controller";

const controllers: Controller<any>[] = [
    new DetailPageController(),
    new ExplorePageController(),
    new SearchResultPageController(),
    new WatchlistController(),
    new UserController()
];

export default controllers;