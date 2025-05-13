import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import SearchResultPageModel from "../../../shared/model/pages/search-result/SearchResultPageModel";
import TMDB from "../../../tmdb/TMDB";
import * as TitleHelper from "../../helper/title/TitleHelper";
import MovieSearchResultPageBodyModel from "../../model/body-page/search/MovieSearchResultPageBodyModel";
import PersonSearchResultPageBodyModel from "../../model/body-page/search/PersonSearchResultPageBodyModel";
import ShowSearchResultPageBodyModel from "../../model/body-page/search/ShowSearchResultPageBodyModel";
import SearchMovie from "../common/search/Movie.search";
import SearchPerson from "../common/search/Person.search";
import SearchShow from "../common/search/Show.search";

class SearchResultPageService {
  public static async getMovie(query: string): Promise<SearchResultPageModel> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchMovie(),
      body: MovieSearchResultPageBodyModel(movies, query)
    };
  }

  public static async getShow(query: string): Promise<SearchResultPageModel> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchShow(),
      body: ShowSearchResultPageBodyModel(shows, query)
    };
  }

  public static async getPeople(query: string): Promise<SearchResultPageModel> {
    const people: PeopleResponse = await TMDB.search.getPeople({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchPerson(),
      body: PersonSearchResultPageBodyModel(people, query)
    };
  }

}

export default SearchResultPageService;
