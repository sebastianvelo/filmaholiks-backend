import { checkOptionalResourceAccess, detectAuthentication } from "@app/auth/authMiddleware";
import { ControllerMiddlewares } from "@app/types/types";
import validate from "@app/middleware/validate";
import DetailPageEndpoints from "./DetailPage.endpoints";
import DetailPageValidator from "./DetailPage.validator";

const DetailPageMiddleware: ControllerMiddlewares<DetailPageEndpoints> = {
  getUser: [
    checkOptionalResourceAccess(":userName")
  ],
  getPerson: [
  ],
  getMovie: [
    detectAuthentication
  ],
  getShow: [
    detectAuthentication
  ],
  getSeason: [
  ],
  getEpisode: [
  ],
};

export default DetailPageMiddleware;