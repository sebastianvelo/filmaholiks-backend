import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import SearchBar from "../../../common/search/Movie.search";
import Body from "./MovieDetailPage.body";

const MovieDetailPage = async ({ movie, viewerUid }: { movie: MovieResponse, viewerUid?: string }): Promise<DetailPageModel> => {
  const body = await Body(movie, viewerUid);

  return {
    title: TitleHelper.movie.getDetail(movie),
    searchbar: SearchBar(),
    body
  };
};

export default MovieDetailPage;