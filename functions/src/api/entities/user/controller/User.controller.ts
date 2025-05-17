import { ControllerHandlers, ControllerMiddlewares, ControllerRoutes } from "@app/types/types";
import Controller from "@app/controller/Controller";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import IUserController from "./User.interface";
import UserMiddlewares from "./User.middlewares";
import UserRoutes from "./User.routes";
import * as UserService from "../service/User.service";

class UserController extends Controller<IUserController> {
  protected handlers: ControllerHandlers<IUserController> = this;
  protected middlewares: ControllerMiddlewares<IUserController> = UserMiddlewares;
  protected routes: ControllerRoutes<IUserController> = UserRoutes;

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