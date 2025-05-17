import Controller from "@app/controller/Controller";
import { ControllerHandlers, ControllerMiddlewares, ControllerRoutes } from "@app/types/types";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import * as ExplorePageService from "../page/ExplorePage.service";
import IExplorePageController from "./ExplorePage.interface";
import ExplorePageMiddlewares from "./ExplorePage.middlewares";
import ExplorePageRoutes from "./ExplorePage.routes";

class ExplorePageController extends Controller<IExplorePageController> {
  protected handlers: ControllerHandlers<IExplorePageController> = this;
  protected middlewares: ControllerMiddlewares<IExplorePageController> = ExplorePageMiddlewares;
  protected routes: ControllerRoutes<IExplorePageController> = ExplorePageRoutes;

  /**
   * Handler para listar películas de exploración
   */
  async getMovie(req: Request, res: Response) {
    pipe(
      ExplorePageService.getMovie(req.query),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  /**
   * Handler para listar series de exploración
   */
  async getShow(req: Request, res: Response) {
    pipe(
      ExplorePageService.getShow(req.query),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }

  /**
   * Handler para listar personas de exploración
   */
  async getPeople(req: Request, res: Response) {
    pipe(
      ExplorePageService.getPeople(),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }
}

export default ExplorePageController;