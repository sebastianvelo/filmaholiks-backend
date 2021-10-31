import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import SearchResultService from "../service/SearchResultService";

class SearchResultController extends Controller {
  constructor(app: express.Application) {
    super(app, "/search");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:query").get((req: Request, res: Response) => {
      SearchResultService.getMovieExplorePage(req.params.query).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/show/:query").get((req: Request, res: Response) => {
      SearchResultService.getShowExplorePage(req.params.query).then((film) => {
        res.send(film);
      });
    });
    return this.app;
  }
}

export default SearchResultController;
