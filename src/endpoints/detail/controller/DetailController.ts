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

    this.setEndpoint("/show/:id").get((req: Request, res: Response) => {
      DetailService.getShowDetailPage(req.params.id).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/show/:id/s/:season").get((req: Request, res: Response) => {
      DetailService.getSeasonDetailPage(req.params.id, req.params.season).then((season) => {
        res.send(season);
      });
    });
    return this.app;
  }
}

export default DetailController;
