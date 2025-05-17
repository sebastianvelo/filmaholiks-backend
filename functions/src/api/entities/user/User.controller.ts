import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes } from "@app/common";
import Controller from "@app/controller/NController";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import UserEndpoints from "./controller/User.endpoints";
import UserMiddleware from "./controller/User.middleware";
import UserRoutes from "./controller/User.routes";
import * as UserService from "./User.service";

class UserController extends Controller<UserEndpoints> {
  protected endpoints: ControllerEndpoints<UserEndpoints> = this;
  protected middlewares: ControllerMiddlewares<UserEndpoints> = UserMiddleware;
  protected routes: ControllerRoutes<UserEndpoints> = UserRoutes;

  async getByUserName(req: Request, res: Response) {
    const { userName } = req.params;
    pipe(
      UserService.getUser(userName),
      fold(
        (error) => async () => {
          if (error.message === "User not found") {
            return res.status(404).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        },
        (user) => async () => res.status(200).json(user)
      )
    )();
  }

  async getByEmail(req: Request, res: Response) {
    const { email } = req.params;
    pipe(
      UserService.getUserByEmail(email),
      fold(
        (error) => async () => {
          if (error.message === "User not found") {
            return res.status(404).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        },
        (user) => async () => res.status(200).json(user)
      )
    )();
  }

  async create(req: Request, res: Response) {
    const { email } = req.body;
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    pipe(
      UserService.save(email, uid),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (user) => async () => res.status(201).json(user)
      )
    )();
  }

  async update(req: Request, res: Response) {
    const { userName } = req.params;
    const userData = req.body;

    pipe(
      UserService.update(userName, userData),
      fold(
        (error) => async () => {
          if (error.message === "User not found") {
            return res.status(404).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        },
        (user) => async () => res.status(200).json(user)
      )
    )();
  }

  async delete(req: Request, res: Response) {
    const { userName } = req.params;

    pipe(
      UserService.deleteUser(userName),
      fold(
        (error) => async () => {
          if (error.message === "User not found") {
            return res.status(404).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        },
        () => async () => res.status(200).json({ message: "User deleted successfully" })
      )
    )();
  }
}

export default UserController;