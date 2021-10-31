import express from "express";

abstract class Controller {
  app: express.Application;

  resource: string;

  constructor(app: express.Application, resource: string) {
    this.app = app;
    this.resource = resource;
    this.setEndpoints();
  }

  public getName() {
    return this.resource;
  }

  public setEndpoint(path: string) {
    return this.app.route(`${this.resource}${path}`);
  }

  protected abstract setEndpoints(): express.Application;
}

export default Controller;
