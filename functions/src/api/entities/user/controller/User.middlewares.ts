import { hasResourceAccess, isAuthenticated } from "@app/middleware/authMiddleware";
import requestValidationMiddleware from "@app/middleware/requestValidationMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import UserEndpoints from "./User.endpoints";
import UserValidator from "./User.validator";

const UserMiddlewares: ControllerMiddlewares<UserEndpoints> = {
    getByUserName: [
      requestValidationMiddleware(UserValidator.getByUserName)
    ],
    getByEmail: [
      isAuthenticated,
      requestValidationMiddleware(UserValidator.getByEmail)
    ],
    create: [
      isAuthenticated,
      requestValidationMiddleware(UserValidator.create),
    ],
    update: [
      isAuthenticated,
      hasResourceAccess("userName"),
      requestValidationMiddleware(UserValidator.update),
    ],
    delete: [
      isAuthenticated,
      hasResourceAccess("userName"),
      requestValidationMiddleware(UserValidator.delete),
    ]
};

export default UserMiddlewares;