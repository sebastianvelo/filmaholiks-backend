import express, { Request, Response } from "express";
import { hasResourceAccess, isAuthenticated } from "../../app/auth/authMiddleware";
import Controller from "../../common/controller/Controller";
import MediaType from "../../shared/types/MediaType";
import WatchlistService from "../service/WatchlistService";

const endpoints = {
  search: "/user/:uid/:mediaType/search/:query",
  getWatchlist: "/user/:uid/:mediaType",
  addList: "/user/:uid/:mediaType/list",
  saveAllLists: "/user/:uid/:mediaType/list",
  deleteList: "/user/:uid/:mediaType/:listIdx/list",
  swapLists: "/user/:uid/:mediaType/swap/list",
  changeListTitle: "/user/:uid/:mediaType/change/list",
  addItem: "/user/:uid/:mediaType/:listIdx/item",
  deleteItem: "/user/:uid/:mediaType/:listIdx/item",
  swapItems: "/user/:uid/:mediaType/swap/item",
  moveItem: "/user/:uid/:mediaType/move/item",
};

class WatchlistController extends Controller {
  constructor(app: express.Application) {
    super(app, "/watch-list");
  }

  setEndpoints() {
    this.setEndpoint(endpoints.search).get((req: Request, res: Response) => {
      WatchlistService.presenter.search(req.params.mediaType as MediaType, req.params.uid, req.params.query)
        .then((resp) => {
          res.send(resp);
        });
    });

    this.setEndpoint(endpoints.getWatchlist).get((req: Request, res: Response) => {
      try {
        WatchlistService.presenter.getViewByUser(req.params.mediaType as MediaType, req.params.uid)
          .then((resp) => {
            if (!resp) {
              return res.status(404).send({ error: "Watchlist not found" });
            }
            res.status(200).send(resp);
          })
          .catch(error => {
            console.error("Get watchlist error:", error);
            res.status(500).send({ error: "Error retrieving watchlist" });
          });
      } catch (error) {
        res.status(400).send({ error: "Invalid request" });
      }
    });

    this.setEndpoint(endpoints.addList)
      .post(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          if (!req.body.title) {
            return res.status(400).send({ error: "Title is required" });
          }

          WatchlistService.presenter.list.add(
            req.params.mediaType as MediaType,
            req.params.uid,
            req.body.title
          );

          res.status(201).send({ message: "List created successfully" });
        } catch (error) {
          console.error("Create list error:", error);
          res.status(500).send({ error: "Error creating list" });
        }
      });

    this.setEndpoint(endpoints.saveAllLists)
      .put(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).send({ error: "Invalid list format" });
          }

          WatchlistService.presenter.list.saveAll(
            req.params.mediaType as MediaType,
            req.params.uid,
            req.body
          );

          res.status(200).send({ message: "Lists updated successfully" });
        } catch (error) {
          console.error("Update lists error:", error);
          res.status(500).send({ error: "Error updating lists" });
        }
      });

    this.setEndpoint(endpoints.deleteList)
      .delete(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);
          if (Number.isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          WatchlistService.presenter.list.delete(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx
          );

          res.status(200).send({ message: "List deleted successfully" });
        } catch (error) {
          console.error("Delete list error:", error);
          res.status(500).send({ error: "Error deleting list" });
        }
      });

    this.setEndpoint(endpoints.swapLists)
      .put(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx1 = Number(req.body.listIdx1);
          const listIdx2 = Number(req.body.listIdx2);

          if (Number.isNaN(listIdx1) || Number.isNaN(listIdx2)) {
            return res.status(400).send({ error: "List indices must be numbers" });
          }

          WatchlistService.presenter.list.swap(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx1,
            listIdx2
          );

          res.status(200).send({ message: "Lists swapped successfully" });
        } catch (error) {
          console.error("Swap lists error:", error);
          res.status(500).send({ error: "Error swapping lists" });
        }
      });

    this.setEndpoint(endpoints.changeListTitle)
      .put(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.body.listIdx);

          if (Number.isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.title) {
            return res.status(400).send({ error: "Title is required" });
          }

          WatchlistService.presenter.list.changeTitle(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx,
            req.body.title
          );

          res.status(200).send({ message: "List title updated successfully" });
        } catch (error) {
          console.error("Update list title error:", error);
          res.status(500).send({ error: "Error updating list title" });
        }
      });

    this.setEndpoint(endpoints.addItem)
      .post(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);

          if (Number.isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.itemId) {
            return res.status(400).send({ error: "Item ID is required" });
          }

          WatchlistService.presenter.item.save(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx,
            req.body.itemId
          );

          res.status(201).send({ message: "Item added successfully" });
        } catch (error) {
          console.error("Add item error:", error);
          res.status(500).send({ error: "Error adding item" });
        }
      });

    this.setEndpoint(endpoints.deleteItem)
      .delete(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);

          if (Number.isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.itemId) {
            return res.status(400).send({ error: "Item ID is required" });
          }

          WatchlistService.presenter.item.delete(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx,
            req.body.itemId
          );

          res.status(200).send({ message: "Item removed successfully" });
        } catch (error) {
          console.error("Delete item error:", error);
          res.status(500).send({ error: "Error removing item" });
        }
      });

    this.setEndpoint(endpoints.swapItems)
      .put(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.body.listIdx);
          const itemIdx1 = Number(req.body.itemIdx1);
          const itemIdx2 = Number(req.body.itemIdx2);

          if (Number.isNaN(listIdx) || Number.isNaN(itemIdx1) || Number.isNaN(itemIdx2)) {
            return res.status(400).send({ error: "All indices must be numbers" });
          }

          WatchlistService.presenter.item.swap(
            req.params.mediaType as MediaType,
            req.params.uid,
            listIdx,
            itemIdx1,
            itemIdx2
          );

          res.status(200).send({ message: "Items swapped successfully" });
        } catch (error) {
          console.error("Swap items error:", error);
          res.status(500).send({ error: "Error swapping items" });
        }
      });

    this.setEndpoint(endpoints.moveItem)
      .put(isAuthenticated, hasResourceAccess("uid"), (req: Request, res: Response) => {
        try {
          const sourceListIdx = Number(req.body.sourceListIdx);
          const targetListIdx = Number(req.body.targetListIdx);
          const itemIdx = Number(req.body.itemIdx);

          if (Number.isNaN(sourceListIdx) || Number.isNaN(targetListIdx) || Number.isNaN(itemIdx)) {
            return res.status(400).send({ error: "All indices must be numbers" });
          }

          WatchlistService.presenter.item.move(
            req.params.mediaType as MediaType,
            req.params.uid,
            sourceListIdx,
            targetListIdx,
            itemIdx
          );

          res.status(200).send({ message: "Item moved successfully" });
        } catch (error) {
          console.error("Move item error:", error);
          res.status(500).send({ error: "Error moving item" });
        }
      });

    return this.app;
  }
}

export default WatchlistController;