import Controller from "@app/controller/Controller";
import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes } from "@app/types/types";
import { Request, Response } from "express";
import { fold } from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as SearchResultPageService from "./SearchResultPage.service";
import SearchResultPageEndpoints from "./controller/SearchResultPage.endpoints";
import SearchResultPageMiddleware from "./controller/SearchResultPage.middleware";
import SearchResultPageRoutes from "./controller/SearchResultPage.routes";

class SearchResultPageController extends Controller<SearchResultPageEndpoints> {
  protected endpoints: ControllerEndpoints<SearchResultPageEndpoints> = this;
  protected middlewares: ControllerMiddlewares<SearchResultPageEndpoints> = SearchResultPageMiddleware;
  protected routes: ControllerRoutes<SearchResultPageEndpoints> = SearchResultPageRoutes;

  /**
   * Handler para listar películas de exploración
   */
  async getMovie(req: Request, res: Response) {
    pipe(
      SearchResultPageService.getMovie(req.params.query),
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
      SearchResultPageService.getShow(req.params.query),
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
      SearchResultPageService.getPeople(req.params.query),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (page) => async () => res.status(200).json(page)
      )
    )();
  }
}

export default SearchResultPageController;
