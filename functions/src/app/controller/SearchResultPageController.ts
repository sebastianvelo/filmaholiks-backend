import express, { Request, Response } from "express";
import Controller from "../../common/controller/Controller";
import SearchResultPageService from "../service/SearchResultPageService";

class SearchResultPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/search");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getMovieSearch(req.params.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getShowSearch(req.params.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/person/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getPersonSearch(req.params.query).then((page) => {
        res.send(page);
      });
    });
    return this.app;
  }
}

export default SearchResultPageController;
