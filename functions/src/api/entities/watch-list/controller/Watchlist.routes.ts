import { ControllerRoutes } from "@app/types/types";
import IWatchlistController from "./Watchlist.interface";

const WatchlistRoutes: ControllerRoutes<IWatchlistController> = {
  basePath: "/watch-list/user/:uid/:mediaType",
  endpointRoutes: {
    search: {
      path: "/search/:query",
      method: "get"
    },
    getWatchlist: {
      path: "",
      method: "get"
    },
    addList: {
      path: "/list",
      method: "post"
    },
    saveAllLists: {
      path: "/list",
      method: "put"
    },
    deleteList: {
      path: "/:listIdx/list",
      method: "delete"
    },
    swapLists: {
      path: "/swap/list",
      method: "put"
    },
    changeListTitle: {
      path: "/change/list",
      method: "put"
    },
    addItem: {
      path: "/:listIdx/item",
      method: "post"
    },
    deleteItem: {
      path: "/:listIdx/item",
      method: "delete"
    },
    swapItems: {
      path: "/swap/item",
      method: "put"
    },
    moveItem: {
      path: "/move/item",
      method: "put"
    }
  }
};

export default WatchlistRoutes;