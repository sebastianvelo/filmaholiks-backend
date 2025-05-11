import express, { Request, Response } from "express";
import { hasResourceAccess, isAuthenticated } from "../../common/app/middleware/authMiddleware";
import Controller from "../../common/controller/Controller";
import MediaType from "../../shared/types/MediaType";
import WatchlistService from "../service/WatchlistService";

class WatchlistController extends Controller {
  constructor(app: express.Application) {
    super(app, "/watch-list");
  }

  setEndpoints() {

    this.setEndpoint("/user/:userName/:mediaType/search/:query").get((req: Request, res: Response) => {
      WatchlistService.presenter.search(req.params.mediaType as MediaType, req.params.userName, req.params.query)
        .then((resp) => {
          res.send(resp);
        });
    });

    this.setEndpoint("/user/:userName/:mediaType").get((req: Request, res: Response) => {
      try {
        WatchlistService.presenter.getViewByUser(req.params.mediaType as MediaType, req.params.userName)
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

    //--------------------------------------------------------------------------------

    // Agregar una nueva lista
    this.setEndpoint("/user/:userName/:mediaType/list")
      .post(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          if (!req.body.title) {
            return res.status(400).send({ error: "Title is required" });
          }

          WatchlistService.presenter.list.add(
            req.params.mediaType as MediaType,
            req.params.userName,
            req.body.title
          );

          res.status(201).send({ message: "List created successfully" });
        } catch (error) {
          console.error("Create list error:", error);
          res.status(500).send({ error: "Error creating list" });
        }
      });

    // Guardar todas las listas
    this.setEndpoint("/user/:userName/:mediaType/list")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          if (!req.body || !Array.isArray(req.body)) {
            return res.status(400).send({ error: "Invalid list format" });
          }

          WatchlistService.presenter.list.saveAll(
            req.params.mediaType as MediaType,
            req.params.userName,
            req.body
          );

          res.status(200).send({ message: "Lists updated successfully" });
        } catch (error) {
          console.error("Update lists error:", error);
          res.status(500).send({ error: "Error updating lists" });
        }
      });

    // Eliminar una lista
    this.setEndpoint("/user/:userName/:mediaType/:listIdx/list")
      .delete(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);
          if (isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          WatchlistService.presenter.list.delete(
            req.params.mediaType as MediaType,
            req.params.userName,
            listIdx
          );

          res.status(200).send({ message: "List deleted successfully" });
        } catch (error) {
          console.error("Delete list error:", error);
          res.status(500).send({ error: "Error deleting list" });
        }
      });

    // Intercambiar posición de listas
    this.setEndpoint("/user/:userName/:mediaType/swap/list")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx1 = Number(req.body.listIdx1);
          const listIdx2 = Number(req.body.listIdx2);

          if (isNaN(listIdx1) || isNaN(listIdx2)) {
            return res.status(400).send({ error: "List indices must be numbers" });
          }

          WatchlistService.presenter.list.swap(
            req.params.mediaType as MediaType,
            req.params.userName,
            listIdx1,
            listIdx2
          );

          res.status(200).send({ message: "Lists swapped successfully" });
        } catch (error) {
          console.error("Swap lists error:", error);
          res.status(500).send({ error: "Error swapping lists" });
        }
      });

    // Cambiar título de una lista
    this.setEndpoint("/user/:userName/:mediaType/change/list")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.body.listIdx);

          if (isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.title) {
            return res.status(400).send({ error: "Title is required" });
          }

          WatchlistService.presenter.list.changeTitle(
            req.params.mediaType as MediaType,
            req.params.userName,
            listIdx,
            req.body.title
          );

          res.status(200).send({ message: "List title updated successfully" });
        } catch (error) {
          console.error("Update list title error:", error);
          res.status(500).send({ error: "Error updating list title" });
        }
      });

    //--------------------------------------------------------------------------------
    // Operaciones de items dentro de listas
    //--------------------------------------------------------------------------------

    // Agregar un item a una lista
    this.setEndpoint("/user/:userName/:mediaType/:listIdx/item")
      .post(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);

          if (isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.itemId) {
            return res.status(400).send({ error: "Item ID is required" });
          }

          WatchlistService.presenter.item.save(
            req.params.mediaType as MediaType,
            req.params.userName,
            listIdx,
            req.body.itemId
          );

          res.status(201).send({ message: "Item added successfully" });
        } catch (error) {
          console.error("Add item error:", error);
          res.status(500).send({ error: "Error adding item" });
        }
      });

    // Eliminar un item de una lista
    this.setEndpoint("/user/:userName/:mediaType/:listIdx/item")
      .delete(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.params.listIdx);

          if (isNaN(listIdx)) {
            return res.status(400).send({ error: "List index must be a number" });
          }

          if (!req.body.itemId) {
            return res.status(400).send({ error: "Item ID is required" });
          }

          WatchlistService.presenter.item.delete(
            req.params.mediaType as MediaType,
            req.params.userName,
            listIdx,
            req.body.itemId
          );

          res.status(200).send({ message: "Item removed successfully" });
        } catch (error) {
          console.error("Delete item error:", error);
          res.status(500).send({ error: "Error removing item" });
        }
      });

    // Intercambiar posición de items
    this.setEndpoint("/user/:userName/:mediaType/swap/item")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const listIdx = Number(req.body.listIdx);
          const itemIdx1 = Number(req.body.itemIdx1);
          const itemIdx2 = Number(req.body.itemIdx2);

          if (isNaN(listIdx) || isNaN(itemIdx1) || isNaN(itemIdx2)) {
            return res.status(400).send({ error: "All indices must be numbers" });
          }

          WatchlistService.presenter.item.swap(
            req.params.mediaType as MediaType,
            req.params.userName,
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

    // Mover un item entre listas
    this.setEndpoint("/user/:userName/:mediaType/move/item")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          const sourceListIdx = Number(req.body.sourceListIdx);
          const targetListIdx = Number(req.body.targetListIdx);
          const itemIdx = Number(req.body.itemIdx);

          if (isNaN(sourceListIdx) || isNaN(targetListIdx) || isNaN(itemIdx)) {
            return res.status(400).send({ error: "All indices must be numbers" });
          }

          WatchlistService.presenter.item.move(
            req.params.mediaType as MediaType,
            req.params.userName,
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