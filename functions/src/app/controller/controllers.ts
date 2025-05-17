import UserController from "@api/entities/user/User.controller";
import WatchlistController from "@api/entities/watch-list/Watchlist.controller";
import DetailPageController from "@api/pages/detail/DetailPage.controller";
import ExplorePageController from "@api/pages/explore/ExplorePage.controller";
import SearchResultPageController from "@api/pages/search-result/SearchResultPage.controller";
import Controller from "./Controller";

const controllers: Controller<any>[] = [
    new DetailPageController(),
    new ExplorePageController(),
    new SearchResultPageController(),
    new WatchlistController(),
    new UserController()
];

export default controllers;