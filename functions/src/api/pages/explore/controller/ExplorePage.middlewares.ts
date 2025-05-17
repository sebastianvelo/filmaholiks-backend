import { ControllerMiddlewares } from "@app/types/types";
import IExplorePageController from "./ExplorePage.interface";

const ExplorePageMiddlewares: ControllerMiddlewares<IExplorePageController> = {
  getPeople: [],
  getMovie: [],
  getShow: []
};

export default ExplorePageMiddlewares;