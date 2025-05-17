import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes } from "@app/common";
import Controller from "@app/controller/NController";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import DetailPageEndpoints from "./controller/DetailPage.endpoints";
import DetailPageMiddleware from "./controller/DetailPage.middleware";
import DetailPageRoutes from "./controller/DetailPage.routes";
import * as DetailPageService from "./DetailPage.service";

class DetailPageController extends Controller<DetailPageEndpoints> {
  protected endpoints: ControllerEndpoints<DetailPageEndpoints> = this;
  protected middlewares: ControllerMiddlewares<DetailPageEndpoints> = DetailPageMiddleware;
  protected routes: ControllerRoutes<DetailPageEndpoints> = DetailPageRoutes;

  async getUser(req: Request, res: Response) {
    const { userName } = req.params;
    const userId = req.user?.uid;

    pipe(
      DetailPageService.getUser(userName, userId),
      fold(
        (error) => async () => {
          if (error.message === "Not authorized") {
            return res.status(403).json({ error: error.message });
          }
          // could also handle not found
          return res.status(500).json({ error: error.message });
        },
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  async getPerson(req: Request, res: Response) {
    const { id } = req.params;

    pipe(
      DetailPageService.getPerson(id),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  async getMovie(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.uid;

    pipe(
      DetailPageService.getMovie(id, userId),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  async getShow(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.uid;

    pipe(
      DetailPageService.getShow(id, userId),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  async getSeason(req: Request, res: Response) {
    const { id, season } = req.params;

    pipe(
      DetailPageService.getSeason(id, season),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  async getEpisode(req: Request, res: Response) {
    const { id, season, episode } = req.params;

    pipe(
      DetailPageService.getEpisode(id, season, episode),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (epis) => async () => res.status(200).json(epis)
      )
    )();
  }

}

export default DetailPageController;
