import express, { Request, Response } from "express";
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
      WatchlistService.presenter.getViewByUser(req.params.mediaType as MediaType, req.params.userName)
        .then((resp) => {
          res.send(resp);
        });
    });

    //--------------------------------------------------------------------------------

    this.setEndpoint("/user/:userName/:mediaType/list").post((req: Request, res: Response) => {
      WatchlistService.presenter.list.add(req.params.mediaType as MediaType, req.params.userName, req.body.title);
      res.send(200);
    });

    this.setEndpoint("/user/:userName/:mediaType/list").put((req: Request, res: Response) => {
      WatchlistService.presenter.list.saveAll(req.params.mediaType as MediaType, req.params.userName, req.body);
      res.send(200);
    });

    this.setEndpoint("/user/:userName/:mediaType/:listIdx/list").delete((req: Request, res: Response) => {
      WatchlistService.presenter.list.delete(req.params.mediaType as MediaType, req.params.userName, Number(req.params.listIdx));
      res.send(200);
    });

    this.setEndpoint("/user/:userName/:mediaType/swap/list").put((req: Request, res: Response) => {
      WatchlistService.presenter.list.swap(req.params.mediaType as MediaType, req.params.userName, Number(req.body.listIdx1), Number(req.body.listIdx2));
      res.send(200);
    });

    //--------------------------------------------------------------------------------

    this.setEndpoint("/user/:userName/:mediaType/:listIdx/item").post((req: Request, res: Response) => {
      WatchlistService.presenter.item.save(req.params.mediaType as MediaType, req.params.userName, Number(req.params.listIdx), req.body.itemId);
      res.send(200);
    });
    this.setEndpoint("/user/:userName/:mediaType/:listIdx/item").delete((req: Request, res: Response) => {
      WatchlistService.presenter.item.delete(req.params.mediaType as MediaType, req.params.userName, Number(req.params.listIdx), req.body.itemId);
      res.send(200);
    });

    this.setEndpoint("/user/:userName/:mediaType/swap/item").put((req: Request, res: Response) => {
      WatchlistService.presenter.item.swap(req.params.mediaType as MediaType, req.params.userName, Number(req.body.listIdx), Number(req.body.itemIdx1), Number(req.body.itemIdx2));
      res.send(200);
    });

    this.setEndpoint("/user/:userName/:mediaType/move/item").put((req: Request, res: Response) => {
      WatchlistService.presenter.item.move(req.params.mediaType as MediaType, req.params.userName, Number(req.body.sourceListIdx), Number(req.body.targetListIdx), Number(req.body.itemIdx))
      res.send(200);
    });

    //--------------------------------------------------------------------------------

    return this.app;
  }
}

export default WatchlistController;
