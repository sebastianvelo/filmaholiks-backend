import { ControllerRoutes } from "@app/common";
import ExplorePageEndpoints from "./ExplorePage.endpoints";

const ExplorePageRoutes: ControllerRoutes<ExplorePageEndpoints> = {
    basePath: "/explore",
    endpointRoute: {
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