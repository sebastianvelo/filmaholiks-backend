import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import {
  getMovieSearchbar,
  getPeopleSearchbar,
  getShowSearchbar
} from "../../../usecases/GetSearchbar";
import {
  getMovieExploreSections,
  getPeopleExploreSections,
  getShowExploreSections
} from "../../../usecases/GetSections";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExploreService {
  public static async getMovieExplorePage(): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming();
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies();
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying();
    return {
      searchbar: getMovieSearchbar(),
      sections: getMovieExploreSections({ upcoming, topRated, nowPlaying })
    };
  }

  public static async getShowExplorePage(): Promise<ExplorePageProps> {
    const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir();
    const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows();
    return {
      searchbar: getShowSearchbar(),
      sections: getShowExploreSections({ onTheAir, topRated })
    };
  }

  public static async getPeopleExplorePage(): Promise<ExplorePageProps> {
    const popular: PeopleResponse = await TMDB.person.getPopular();
    return {
      searchbar: getPeopleSearchbar(),
      sections: getPeopleExploreSections({ popular })
    };
  }
}

export default ExploreService;
