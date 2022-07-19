import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import CardService from "../../common/service/card/CardService";
import SearchBarService from "../../common/service/searchbar/SearchBarService";
import TitleService from "../../common/service/title/TitleService";
import { SearchResultProps } from "../model/SearchResultProps";

class SearchResultPageService {
  public static async getMovieSearch(
    query: string
  ): Promise<SearchResultProps> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      title: TitleService.search.getTitle(query),
      searchbar: SearchBarService.getMovieSearchbar(),
      results: {
        id: "results",
        title: `Results of "${query}"`,
        cards: movies.results.map(CardService.getMovieCard)
      }
    };
  }

  public static async getShowSearch(
    query: string
  ): Promise<SearchResultProps> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      title: TitleService.search.getTitle(query),
      searchbar: SearchBarService.getShowSearchbar(),
      results: {
        id: "results",
        title: `Results of "${query}"`,
        cards: shows.results.map(CardService.getShowCard)
      }
    };
  }

  public static async getPersonSearch(
    query: string
  ): Promise<SearchResultProps> {
    const person: PeopleResponse = await TMDB.search.getPeople({ query });
    return {
      title: TitleService.search.getTitle(query),
      searchbar: SearchBarService.getPeopleSearchbar(),
      results: {
        id: "results",
        title: `Results of "${query}"`,
        cards: person.results.map(CardService.getPersonCard)
      }
    };
  }

}

export default SearchResultPageService;
