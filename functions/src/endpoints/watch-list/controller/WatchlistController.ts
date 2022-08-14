import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import WatchlistService from "../service/WatchlistService";

class WatchlistController extends Controller {
  constructor(app: express.Application) {
    super(app, "/watch-list");
  }

  setEndpoints() {
    this.setEndpoint("/search/show/:query").get((req: Request, res: Response) => {
      WatchlistService.showsSuggestions(req.params.query).then((shows) => {
        res.send(shows);
      });
    });

    this.setEndpoint("/user/:userName/save").put((req: Request, res: Response) => {
      WatchlistService.saveShowsWatchlist(req.params.userName, req.body);
      res.send(200);
    });

    return this.app;
  }
}

export default WatchlistController;
