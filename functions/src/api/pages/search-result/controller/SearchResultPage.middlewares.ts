import { ControllerMiddlewares } from "@app/types/types";
import ISearchResultPageController from "./SearchResultPage.interface";

const SearchResultPageMiddlewares: ControllerMiddlewares<ISearchResultPageController> = {
  getPeople: [],
  getMovie: [],
  getShow: []
};

export default SearchResultPageMiddlewares;