import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import ExplorePageModel from "@shared/model/pages/explore/ExplorePageModel";
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import SearchMovie from "../../../common/search/Movie.search";
import Body from "./MovieExplorePage.body";

const MovieExplorePage = async (query?: LanguageParams): Promise<ExplorePageModel> => {
  const body: DetailPageBodyModel = await Body(query);
  
  return {
    title: TitleHelper.movie.getExplore(),
    searchbar: SearchMovie(),
    body
  };
}

export default MovieExplorePage;
