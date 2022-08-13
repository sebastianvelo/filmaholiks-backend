import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import BodyPageHelper from "../../../helper/body-page/BodyPageHelper";
import SearchBarHelper from "../../../helper/searchbar/SearchBarHelper";
import TitleHelper from "../../../helper/title/TitleHelper";
import TMDB from "../../../tmdb/TMDB";
import { SearchResultProps } from "../model/SearchResultProps";

class SearchResultPageService {
  public static async getMovieSearch(query: string): Promise<SearchResultProps> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body: BodyPageHelper.movie.getSearch(movies, query)
    };
  }

  public static async getShowSearch(query: string): Promise<SearchResultProps> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body: BodyPageHelper.show.getSearch(shows, query)
    };
  }

  public static async getPersonSearch(query: string): Promise<SearchResultProps> {
    const people: PeopleResponse = await TMDB.search.getPeople({ query });
    return {
      title: TitleHelper.search.getTitle(query),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body: BodyPageHelper.people.getSearch(people, query)
    };
  }

}

export default SearchResultPageService;
