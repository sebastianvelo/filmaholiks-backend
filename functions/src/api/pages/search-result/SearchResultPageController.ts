import express, { Request, Response } from "express";
import Controller from "../../../app/controller/Controller";
import SearchResultPageService from "./SearchResultPageService";

class SearchResultPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/search");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getMovie(req.params.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getShow(req.params.query).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/person/:query").get((req: Request, res: Response) => {
      SearchResultPageService.getPeople(req.params.query).then((page) => {
        res.send(page);
      });
    });
    return this.app;
  }
}

export default SearchResultPageController;
