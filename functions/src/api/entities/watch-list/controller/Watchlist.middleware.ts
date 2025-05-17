import { hasResourceAccess, isAuthenticated } from "@app/auth/authMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import validate from "@app/middleware/validate";
import WatchlistEndpoints from "./Watchlist.endpoints";
import WatchlistValidator from "./Watchlist.validator";

const WatchlistMiddleware: ControllerMiddlewares<WatchlistEndpoints> = {
    search: [
        ...WatchlistValidator.search,
        validate
    ],
    getWatchlist: [
        ...WatchlistValidator.getWatchlist,
        validate
    ],
    addList: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.addList,
        validate
    ],
    saveAllLists: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.saveAllLists,
        validate
    ],
    deleteList: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.deleteList,
        validate
    ],
    swapLists: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.swapLists,
        validate
    ],
    changeListTitle: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.changeListTitle,
        validate
    ],
    addItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.addItem,
        validate
    ],
    deleteItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.deleteItem,
        validate
    ],
    swapItems: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.swapItems,
        validate
    ],
    moveItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        ...WatchlistValidator.moveItem,
        validate
    ],
};

export default WatchlistMiddleware;