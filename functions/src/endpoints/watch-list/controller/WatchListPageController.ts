import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import WatchListPageService from "../service/WatchListPageService";

class WatchListPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/watch-list");
  }

  setEndpoints() {
    this.setEndpoint("/show/:user").get((req: Request, res: Response) => {
      WatchListPageService.shows(req.params.user).then((shows) => {
        res.send(shows);
      });
    });

    this.setEndpoint("/search/show/:query").get((req: Request, res: Response) => {
      WatchListPageService.showsSuggestions(req.params.query).then((shows) => {
        res.send(shows);
      });
    });

    this.setEndpoint("/movie/:user").get((req: Request, res: Response) => {
      WatchListPageService.movies(req.params.user).then((movies) => {
        res.send(movies);
      });
    });

    return this.app;
  }
}

export default WatchListPageController;
