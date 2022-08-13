import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import AccountPageService from "../service/AccountPageService";

class AccountPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/user");
  }

  setEndpoints() {
    this.setEndpoint("/:userName").get((req: Request, res: Response) => {
      AccountPageService.getDetail(req.params.userName).then((page) => {
        res.send(page);
      });
    });

    return this.app;
  }
}

export default AccountPageController;
