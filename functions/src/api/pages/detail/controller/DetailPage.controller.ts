import { ControllerHandlers, ControllerMiddlewares, ControllerRoutes } from "@app/types/types";
import Controller from "@app/controller/Controller";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import IDetailPageController from "./DetailPage.interface";
import DetailPageMiddlewares from "./DetailPage.middlewares";
import DetailPageRoutes from "./DetailPage.routes";
import * as DetailPageService from "../page/DetailPage.service";

class DetailPageController extends Controller<IDetailPageController> {
  protected handlers: ControllerHandlers<IDetailPageController> = this;
  protected middlewares: ControllerMiddlewares<IDetailPageController> = DetailPageMiddlewares;
  protected routes: ControllerRoutes<IDetailPageController> = DetailPageRoutes;

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
