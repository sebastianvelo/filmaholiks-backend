import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import SearchResultPageService from "../service/SearchResultPageService";

class SearchResultPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/search");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getMovieSearch(req.params.query).then((movie) => {
        res.send(movie);
      });
    });

    this.setEndpoint("/show/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getShowSearch(req.params.query).then((show) => {
        res.send(show);
      });
    });

    this.setEndpoint("/person/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getPersonSearch(req.params.query).then((person) => {
        res.send(person);
      });
    });
    return this.app;
  }
}

export default SearchResultPageController;
