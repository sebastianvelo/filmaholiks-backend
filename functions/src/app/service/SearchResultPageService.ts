import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import BodyPageHelper from "../model/body-page/BodyPageHelper";
import SearchBarHelper from "../helper/searchbar/SearchBarHelper";
import * as TitleHelper from "../helper/title/TitleHelper";
import TMDB from "../../tmdb/TMDB";
import SearchResultPageModel from "../../shared/model/pages/search-result/SearchResultPageModel";
import PersonSearchResultPageModel from "../model/body-page/search/PersonSearchResultPageModel";
import ShowSearchResultPageModel from "../model/body-page/search/ShowSearchResultPageModel";
import MovieSearchResultPageModel from "../model/body-page/search/MovieSearchResultPageModel";

class SearchResultPageService {
  public static async getMovie(query: string): Promise<SearchResultPageModel> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body: MovieSearchResultPageModel(movies, query)
    };
  }

  public static async getShow(query: string): Promise<SearchResultPageModel> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body: ShowSearchResultPageModel(shows, query)
    };
  }

  public static async getPeople(query: string): Promise<SearchResultPageModel> {
    const people: PeopleResponse = await TMDB.search.getPeople({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body: PersonSearchResultPageModel(people, query)
    };
  }

}

export default SearchResultPageService;
