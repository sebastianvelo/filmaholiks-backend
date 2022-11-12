import express, { Request, Response } from "express";
import Controller from "../../common/controller/Controller";
import UserService from "../service/UserService";

class UserController extends Controller {
  constructor(app: express.Application) {
    super(app, "/user");
  }

  setEndpoints() {
    this.setEndpoint("/:userName").get((req: Request, res: Response) => {
      UserService.getUser(req.params.userName, req.query.userLoggedIn as string).then((page) => {
        if (page)
          res.status(200).send(page);
        else
          res.status(404).send();
      });
    });

    this.setEndpoint("/").post((req: Request, res: Response) => {
      UserService.save(req.body.email).then((r) => res.send(r));
    })

    return this.app;
  }
}

export default UserController;
