import { ControllerRoutes } from "@app/types/types";
import ISearchResultPageController from "./SearchResultPage.interface";

const SearchResultPageRoutes: ControllerRoutes<ISearchResultPageController> = {
    basePath: "/search",
    endpointRoutes: {
        getMovie: {
            path: "/movie/:query",
            method: "get"
        },
        getShow: {
            path: "/show/:query",
            method: "get"
        },
        getPeople: {
            path: "/person/:query",
            method: "get"
        }
    }
};

export default SearchResultPageRoutes;