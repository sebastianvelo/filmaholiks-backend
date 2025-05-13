import express, { Request, Response } from "express";
import { checkOptionalResourceAccess, detectAuthentication } from "@app/auth/authMiddleware";
import Controller from "@app/controller/Controller";
import DetailPageService from "./DetailPageService";

class DetailPageController extends Controller {
  constructor(app: express.Application) {
    super(app, "/detail");
  }

  setEndpoints() {
    this.setEndpoint("/user/:userName").get(checkOptionalResourceAccess(":userName"), (req: Request, res: Response) => {
      DetailPageService.getUser(req.params.userName, req.user?.uid).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/person/:id").get((req: Request, res: Response) => {
      DetailPageService.getPerson(req.params.id).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/movie/:id").get(detectAuthentication, (req: Request, res: Response) => {
      DetailPageService.getMovie(req.params.id, req.user?.uid).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show/:id").get(detectAuthentication, (req: Request, res: Response) => {
      DetailPageService.getShow(req.params.id, req.user?.uid).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show/:id/s/:season").get((req: Request, res: Response) => {
      DetailPageService.getSeason(req.params.id, req.params.season).then((page) => {
        res.send(page);
      });
    });

    this.setEndpoint("/show/:id/s/:season/e/:episode").get((req: Request, res: Response) => {
      DetailPageService.getEpisode(req.params.id, req.params.season, req.params.episode).then((season) => {
        res.send(season);
      });
    });
    return this.app;
  }
}

export default DetailPageController;
