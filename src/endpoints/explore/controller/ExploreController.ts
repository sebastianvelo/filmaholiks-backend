import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import ExploreService from "../service/ExploreService";

class ExploreController extends Controller {
  constructor(app: express.Application) {
    super(app, "/explore");
  }

  setEndpoints() {
    this.setEndpoint("/movie").get((req: Request, res: Response) => {
      ExploreService.getMovieExplorePage().then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/tv").get((req: Request, res: Response) => {
      ExploreService.getTVShowExplorePage().then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/person").get((req: Request, res: Response) => {
      ExploreService.getPeopleExplorePage().then((person) => {
        res.send(person);
      });
    });
    
    return this.app;
  }
}

export default ExploreController;
