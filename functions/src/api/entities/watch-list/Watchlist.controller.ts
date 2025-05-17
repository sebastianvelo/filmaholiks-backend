import { ControllerEndpoints, ControllerMiddlewares, ControllerRoutes } from "@app/types/types";
import Controller from "@app/controller/Controller";
import MediaType from "@shared/types/MediaType";
import { Request, Response } from "express";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/TaskEither";
import WatchlistEndpoints from "./controller/Watchlist.endpoints";
import WatchlistMiddleware from "./controller/Watchlist.middleware";
import WatchlistRoutes from "./controller/Watchlist.routes";
import * as WatchlistService from "./Watchlist.service";

class WatchlistController extends Controller<WatchlistEndpoints> {
  protected endpoints: ControllerEndpoints<WatchlistEndpoints> = this;
  protected middlewares: ControllerMiddlewares<WatchlistEndpoints> = WatchlistMiddleware;
  protected routes: ControllerRoutes<WatchlistEndpoints> = WatchlistRoutes;

  async search(req: Request, res: Response) {
    const { mediaType, uid, query } = req.params;

    pipe(
      WatchlistService.search(mediaType as MediaType, uid, query),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        (result) => async () => res.status(200).json(result)
      )
    )();
  }

  async getWatchlist(req: Request, res: Response) {
    const { mediaType, uid } = req.params;

    pipe(
      WatchlistService.getViewByUser(mediaType as MediaType, uid),
      fold(
        (error) => async () => {
          if (error.message === "Watchlist not found") {
            return res.status(404).json({ error: error.message });
          }
          return res.status(500).json({ error: error.message });
        },
        (watchlist) => async () => res.status(200).json(watchlist)
      )
    )();
  }

  async addList(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const { title } = req.body;

    pipe(
      WatchlistService.addList(mediaType as MediaType, uid, title),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(201).json({ message: "List created successfully" })
      )
    )();
  }

  async saveAllLists(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const lists = req.body;

    pipe(
      WatchlistService.saveAllLists(mediaType as MediaType, uid, lists),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "Lists updated successfully" })
      )
    )();
  }

  async deleteList(req: Request, res: Response) {
    const { mediaType, uid, listIdx } = req.params;

    pipe(
      WatchlistService.deleteList(mediaType as MediaType, uid, Number(listIdx)),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "List deleted successfully" })
      )
    )();
  }

  async swapLists(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const { listIdx1, listIdx2 } = req.body;

    pipe(
      WatchlistService.swapLists(mediaType as MediaType, uid, Number(listIdx1), Number(listIdx2)),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "Lists swapped successfully" })
      )
    )();
  }

  async changeListTitle(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const { listIdx, title } = req.body;

    pipe(
      WatchlistService.changeListTitle(mediaType as MediaType, uid, Number(listIdx), title),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "List title updated successfully" })
      )
    )();
  }

  async addItem(req: Request, res: Response) {
    const { mediaType, uid, listIdx } = req.params;
    const { itemId } = req.body;

    pipe(
      WatchlistService.addItem(mediaType as MediaType, uid, Number(listIdx), itemId),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(201).json({ message: "Item added successfully" })
      )
    )();
  }

  async deleteItem(req: Request, res: Response) {
    const { mediaType, uid, listIdx } = req.params;
    const { itemId } = req.body;

    pipe(
      WatchlistService.deleteItem(mediaType as MediaType, uid, Number(listIdx), itemId),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "Item removed successfully" })
      )
    )();
  }

  async swapItems(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const { listIdx, itemIdx1, itemIdx2 } = req.body;

    pipe(
      WatchlistService.swapItems(mediaType as MediaType, uid, Number(listIdx), Number(itemIdx1), Number(itemIdx2)),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "Items swapped successfully" })
      )
    )();
  }

  async moveItem(req: Request, res: Response) {
    const { mediaType, uid } = req.params;
    const { sourceListIdx, targetListIdx, itemIdx } = req.body;

    pipe(
      WatchlistService.moveItem(mediaType as MediaType, uid, Number(sourceListIdx), Number(targetListIdx), Number(itemIdx)),
      fold(
        (error) => async () => res.status(500).json({ error: error.message }),
        () => async () => res.status(200).json({ message: "Item moved successfully" })
      )
    )();
  }
}

export default WatchlistController;