import { ControllerRoutes } from "@app/types/types";
import ExplorePageEndpoints from "./ExplorePage.endpoints";

const ExplorePageRoutes: ControllerRoutes<ExplorePageEndpoints> = {
    basePath: "/explore",
    endpointRoutes: {
        getMovie: {
            path: "/movie",
            method: "get"
        },
        getShow: {
            path: "/show",
            method: "get"
        },
        getPeople: {
            path: "/person",
            method: "get"
        }
    }
};

export default ExplorePageRoutes;