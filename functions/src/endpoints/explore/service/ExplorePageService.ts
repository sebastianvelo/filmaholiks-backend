import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import SearchBarService from "../../common/service/searchbar/SearchBarService";
import SectionService from "../../common/service/section/SectionService";
import TitleService from "../../common/service/title/TitleService";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExplorePageService {
  public static async getMovieExplorePage(query?: LanguageParams): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming(query);
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies(query);
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying(query);
    const popular: MoviesResponse = await TMDB.movie.getPopularMovies(query);
    return {
      title: TitleService.explore.getMovieTitle(),
      searchbar: SearchBarService.getMovieSearchbar(),
      sections: SectionService.getMovieExploreSections({
        upcoming,
        topRated,
        nowPlaying,
        popular
      })
    };
  }

  public static async getShowExplorePage(query?: LanguageParams): Promise<ExplorePageProps> {
    const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir(query);
    const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows(query);
    const popular: TVShowsResponse = await TMDB.tvShow.getPopularShows(query);
    const airingToday: TVShowsResponse = await TMDB.tvShow.getAiringToday(query);
    return {
      title: TitleService.explore.getShowTitle(),
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
      title: TitleService.explore.getPersonTitle(),
      searchbar: SearchBarService.getPeopleSearchbar(),
      sections: SectionService.getPeopleExploreSections({ popular })
    };
  }
}

export default ExplorePageService;
