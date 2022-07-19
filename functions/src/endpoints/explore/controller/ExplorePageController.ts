import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import ExplorePageService from "../service/ExplorePageService";

class ExplorePageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/explore");
  }

  setEndpoints() {
    this.setEndpoint("/movie").get((req: Request, res: Response) => {
      ExplorePageService.getMovieExplorePage(req.query).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/show").get((req: Request, res: Response) => {
      ExplorePageService.getShowExplorePage(req.query).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/person").get((req: Request, res: Response) => {
      ExplorePageService.getPeopleExplorePage().then((person) => {
        res.send(person);
      });
    });
    
    return this.app;
  }
}

export default ExplorePageController;
