import { ControllerRoutes } from "@app/types/types";
import IExplorePageController from "./ExplorePage.interface";

const ExplorePageRoutes: ControllerRoutes<IExplorePageController> = {
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