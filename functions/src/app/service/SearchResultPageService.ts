import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import BodyPageHelper from "../helper/body-page/BodyPageHelper";
import SearchBarHelper from "../helper/searchbar/SearchBarHelper";
import * as TitleHelper from "../helper/title/TitleHelper";
import TMDB from "../../tmdb/TMDB";
import SearchResultPageModel from "../../shared/model/pages/search-result/SearchResultPageModel";

class SearchResultPageService {
  public static async getMovieSearch(query: string): Promise<SearchResultPageModel> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body: BodyPageHelper.movie.getSearch(movies, query)
    };
  }

  public static async getShowSearch(query: string): Promise<SearchResultPageModel> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body: BodyPageHelper.show.getSearch(shows, query)
    };
  }

  public static async getPersonSearch(query: string): Promise<SearchResultPageModel> {
    const people: PeopleResponse = await TMDB.search.getPeople({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body: BodyPageHelper.people.getSearch(people, query)
    };
  }

}

export default SearchResultPageService;
