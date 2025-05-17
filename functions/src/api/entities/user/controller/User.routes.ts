import { ControllerRoutes } from "@app/common";
import UserEndpoints from "./User.endpoints";

const UserRoutes: ControllerRoutes<UserEndpoints> = {
    basePath: "/user",
    endpointRoute: {
        getByUserName: {
            path: "/:userName",
            method: "get"
        },
        getByEmail: {
            path: "/email/:email",
            method: "get"
        },
        create: {
            path: "",
            method: "post"
        },
        update: {
            path: "/:userName",
            method: "put"
        },
        delete: {
            path: "/:userName",
            method: "delete"
        }
    }
};

export default UserRoutes;