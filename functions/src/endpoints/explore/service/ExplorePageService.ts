import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import SearchBarHelper from "../../common/helper/searchbar/SearchBarHelper";
import SectionHelper from "../../common/helper/section/SectionHelper";
import TitleHelper from "../../common/helper/title/TitleHelper";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExplorePageService {
  public static async getMovieExplorePage(query?: LanguageParams): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming(query);
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies(query);
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying(query);
    const popular: MoviesResponse = await TMDB.movie.getPopularMovies(query);
    return {
      title: TitleHelper.explore.getMovieTitle(),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      sections: SectionHelper.movie.getExplore({
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
      title: TitleHelper.explore.getShowTitle(),
      searchbar: SearchBarHelper.show.getSearchbar(),
      sections: SectionHelper.show.getExplore({
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
      title: TitleHelper.explore.getPersonTitle(),
      searchbar: SearchBarHelper.people.getSearchbar(),
      sections: SectionHelper.people.getExplore({ popular })
    };
  }
}

export default ExplorePageService;
