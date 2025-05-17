import { ControllerRoutes } from "@app/types/types";
import IDetailPageController from "./DetailPage.interface";

const DetailPageRoutes: ControllerRoutes<IDetailPageController> = {
    basePath: "/detail",
    endpointRoutes: {
        getUser: {
            path: "/user/:userName",
            method: "get"
        },
        getPerson: {
            path: "/person/:id",
            method: "get"
        },
        getMovie: {
            path: "/movie/:id",
            method: "get"
        },
        getShow: {
            path: "/show/:id",
            method: "get"
        },
        getSeason: {
            path: "/show/:id/s/:season",
            method: "get"
        },
        getEpisode: {
            path: "/show/:id/s/:season/e/:episode",
            method: "get"
        }
    }
};

export default DetailPageRoutes;