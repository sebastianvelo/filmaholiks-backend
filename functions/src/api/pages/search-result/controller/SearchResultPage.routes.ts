import { ControllerRoutes } from "@app/types/types";
import SearchResultPageEndpoints from "./SearchResultPage.endpoints";

const SearchResultPageRoutes: ControllerRoutes<SearchResultPageEndpoints> = {
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