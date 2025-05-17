import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes } from "@app/common";
import Controller from "@app/controller/NController";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import ExplorePageEndpoints from "./controller/ExplorePage.endpoints";
import ExplorePageMiddleware from "./controller/ExplorePage.middleware";
import ExplorePageRoutes from "./controller/ExplorePage.routes";
import * as ExplorePageService from "./ExplorePage.service";

class ExplorePageController extends Controller<ExplorePageEndpoints> {
  protected endpoints: ControllerEndpoints<ExplorePageEndpoints> = this;
  protected middlewares: ControllerMiddlewares<ExplorePageEndpoints> = ExplorePageMiddleware;
  protected routes: ControllerRoutes<ExplorePageEndpoints> = ExplorePageRoutes;

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