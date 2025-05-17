import { ControllerMiddlewares } from "@app/types/types";
import SearchResultPageEndpoints from "./SearchResultPage.endpoints";

const SearchResultPageMiddleware: ControllerMiddlewares<SearchResultPageEndpoints> = {
  getPeople: [
  ],
  getMovie: [
  ],
  getShow: [
  ]
};

export default SearchResultPageMiddleware;