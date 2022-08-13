import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import ExplorePageService from "../service/ExplorePageService";

class ExplorePageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/explore");
  }

  setEndpoints() {
    this.setEndpoint("/movie").get((req: Request, res: Response) => {
      ExplorePageService.getMovieExplorePage(req.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show").get((req: Request, res: Response) => {
      ExplorePageService.getShowExplorePage(req.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/person").get((req: Request, res: Response) => {
      ExplorePageService.getPeopleExplorePage().then((page) => {
        res.send(page);
      });
    });
    
    return this.app;
  }
}

export default ExplorePageController;
