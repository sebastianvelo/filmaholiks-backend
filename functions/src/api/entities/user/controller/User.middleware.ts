import { hasResourceAccess, isAuthenticated } from "@app/auth/authMiddleware";
import validate from "@app/middleware/validate";
import { ControllerMiddlewares } from "@app/types/types";
import UserEndpoints from "./User.endpoints";
import UserValidator from "./User.validator";

const UserMiddleware: ControllerMiddlewares<UserEndpoints> = {
    getByUserName: [
      validate(UserValidator.getByUserName)
    ],
    getByEmail: [
      isAuthenticated,
      validate(UserValidator.getByEmail)
    ],
    create: [
      isAuthenticated,
      validate(UserValidator.create),
    ],
    update: [
      isAuthenticated,
      hasResourceAccess("userName"),
      validate(UserValidator.update),
    ],
    delete: [
      isAuthenticated,
      hasResourceAccess("userName"),
      validate(UserValidator.update),
    ]
};

export default UserMiddleware;