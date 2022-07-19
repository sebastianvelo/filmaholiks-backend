import express, { Request, Response } from "express";
import Controller from "../../../common/controller/Controller";
import DetailPageService from "../service/DetailPageService";

class DetailPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/detail");
  }

  setEndpoints() {
    this.setEndpoint("/movie/:id").get((req: Request, res: Response) => {
      DetailPageService.getMovieDetailPage(req.params.id).then((movie) => {
        res.send(movie);
      });
    });

    this.setEndpoint("/person/:id").get((req: Request, res: Response) => {
      DetailPageService.getPersonDetailPage(req.params.id).then((person) => {
        res.send(person);
      });
    });

    this.setEndpoint("/show/:id").get((req: Request, res: Response) => {
      DetailPageService.getShowDetailPage(req.params.id).then((show) => {
        res.send(show);
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
