import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import SearchBarService from "../../common/service/searchbar/SearchBarService";
import SectionService from "../../common/service/section/SectionService";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExplorePageService {
  public static async getMovieExplorePage(): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming();
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies();
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying();
    const popular: MoviesResponse = await TMDB.movie.getPopularMovies();
    return {
      searchbar: SearchBarService.getMovieSearchbar(),
      sections: SectionService.getMovieExploreSections({
        upcoming,
        topRated,
        nowPlaying,
        popular
      })
    };
  }

  public static async getShowExplorePage(): Promise<ExplorePageProps> {
    const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir();
    const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows();
    const popular: TVShowsResponse = await TMDB.tvShow.getPopularShows();
    const airingToday: TVShowsResponse = await TMDB.tvShow.getAiringToday();
    return {
      searchbar: SearchBarService.getShowSearchbar(),
      sections: SectionService.getShowExploreSections({
        onTheAir,
        topRated,
        popular,
        airingToday
      })
    };
  }

  public static async getPeopleExplorePage(): Promise<ExplorePageProps> {
    const popular: PeopleResponse = await TMDB.person.getPopular();
    return {
      searchbar: SearchBarService.getPeopleSearchbar(),
      sections: SectionService.getPeopleExploreSections({ popular })
    };
  }
}

export default ExplorePageService;
