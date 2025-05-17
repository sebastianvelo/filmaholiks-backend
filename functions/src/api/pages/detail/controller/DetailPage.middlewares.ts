import { checkOptionalResourceAccess, detectAuthentication } from "@app/middleware/authMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import IDetailPageController from "./DetailPage.interface";

const DetailPageMiddlewares: ControllerMiddlewares<IDetailPageController> = {
  getUser: [
    checkOptionalResourceAccess(":userName")
  ],
  getPerson: [],
  getMovie: [
    detectAuthentication
  ],
  getShow: [
    detectAuthentication
  ],
  getSeason: [],
  getEpisode: [],
};

export default DetailPageMiddlewares;