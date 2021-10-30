import {
  MoviesResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import { getMovieCard, getTVCard } from "../../../usecases/GetCard";
import { SearchResultProps } from "../model/SearchResultProps";

class SearchResultService {
  public static async getMovieExplorePage(
    query: string
  ): Promise<SearchResultProps> {
    const movies: MoviesResponse = await TMDB.search.getMovies({ query });
    return {
      results: {
        id: "results",
        title: `Results of "${query}"`,
        cards: movies.results.map(getMovieCard)
      }
    };
  }

  public static async getTVShowExplorePage(
    query: string
  ): Promise<SearchResultProps> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    return {
      results: {
        id: "results",
        title: `Results of "${query}"`,
        cards: shows.results.map(getTVCard)
      }
    };
  }
}

export default SearchResultService;
