import { ControllerRoutes } from "@app/types/types";
import IUserController from "./User.interface";

const UserRoutes: ControllerRoutes<IUserController> = {
    basePath: "/user",
    endpointRoutes: {
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