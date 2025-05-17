import { hasResourceAccess, isAuthenticated } from "@app/middleware/authMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import requestValidationMiddleware from "@app/middleware/requestValidationMiddleware";
import WatchlistEndpoints from "./Watchlist.endpoints";
import WatchlistValidator from "./Watchlist.validator";

const WatchlistMiddlewares: ControllerMiddlewares<WatchlistEndpoints> = {
    search: [
        requestValidationMiddleware(WatchlistValidator.search)
    ],
    getWatchlist: [
        requestValidationMiddleware(WatchlistValidator.getWatchlist)
    ],
    addList: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.addList)
    ],
    saveAllLists: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.saveAllLists)
    ],
    deleteList: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.deleteList)
    ],
    swapLists: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.swapLists)
    ],
    changeListTitle: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.changeListTitle)
    ],
    addItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.addItem)
    ],
    deleteItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.deleteItem)
    ],
    swapItems: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.swapItems)
    ],
    moveItem: [
        isAuthenticated,
        hasResourceAccess("uid"),
        requestValidationMiddleware(WatchlistValidator.moveItem)
    ],
};

export default WatchlistMiddlewares;