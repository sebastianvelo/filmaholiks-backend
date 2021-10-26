import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import DetailService from "../service/DetailService";

class DetailController extends Controller {

  constructor(app: express.Application) {
    super(app, "/detail");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:id").get((req: Request, res: Response) => {
      DetailService.getMovieDetailPage(req.params.id).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/tv/:id").get((req: Request, res: Response) => {
      DetailService.getTVShowDetailPage(req.params.id).then((film) => {
        res.send(film);
      });
    });
    return this.app;
  }
}

export default DetailController;
