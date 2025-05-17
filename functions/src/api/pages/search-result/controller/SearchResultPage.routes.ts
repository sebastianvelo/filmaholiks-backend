import { ControllerRoutes } from "@app/common";
import SearchResultPageEndpoints from "./SearchResultPage.endpoints";

const SearchResultPageRoutes: ControllerRoutes<SearchResultPageEndpoints> = {
    basePath: "/search",
    endpointRoute: {
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