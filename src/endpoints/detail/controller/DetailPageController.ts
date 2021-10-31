import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import DetailPageService from "../service/DetailPageService";

class DetailPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/detail");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:id").get((req: Request, res: Response) => {
      DetailPageService.getMovieDetailPage(req.params.id).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/show/:id").get((req: Request, res: Response) => {
      DetailPageService.getShowDetailPage(req.params.id).then((film) => {
        res.send(film);
      });
    });

    this.setEndpoint("/show/:id/s/:season").get((req: Request, res: Response) => {
      DetailPageService.getSeasonDetailPage(req.params.id, req.params.season).then((season) => {
        res.send(season);
      });
    });


    this.setEndpoint("/show/:id/s/:season/e/:episode").get((req: Request, res: Response) => {
      DetailPageService.getEpisodeDetailPage(req.params.id, req.params.season, req.params.episode).then((season) => {
        res.send(season);
      });
    });
    return this.app;
  }
}

export default DetailPageController;
