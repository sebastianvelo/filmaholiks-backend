import { ControllerRoutes } from "@app/common";
import DetailPageEndpoints from "./DetailPage.endpoints";

const DetailPageRoutes: ControllerRoutes<DetailPageEndpoints> = {
    basePath: "/detail",
    endpointRoute: {
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