import { MoviesResponse, PeopleResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import SearchResultPageModel from "../../../shared/model/pages/search-result/SearchResultPageModel";
import TMDB from "../../../tmdb/TMDB";
import MovieSearchResultPage from "./page/movie/MovieSearchResultPage";
import PersonSearchResultPage from "./page/person/PersonSearchResultPage";
import ShowSearchResultPage from "./page/show/ShowSearchResultPage";

class SearchResultPageService {
  public static async getMovie(query: string): Promise<SearchResultPageModel> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return MovieSearchResultPage(movies, query);
  }

  public static async getShow(query: string): Promise<SearchResultPageModel> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return ShowSearchResultPage(shows, query);
  }

  public static async getPeople(query: string): Promise<SearchResultPageModel> {
    const people: PeopleResponse = await TMDB.search.getPeople({ query });
    return PersonSearchResultPage(people, query);
  }
}

export default SearchResultPageService;
