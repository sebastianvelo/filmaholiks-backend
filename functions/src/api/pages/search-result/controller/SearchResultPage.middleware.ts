import { ControllerMiddlewares } from "@app/common";
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