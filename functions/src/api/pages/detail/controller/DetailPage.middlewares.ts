import { checkOptionalResourceAccess, detectAuthentication } from "@app/middleware/authMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import DetailPageEndpoints from "./DetailPage.endpoints";

const DetailPageMiddlewares: ControllerMiddlewares<DetailPageEndpoints> = {
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