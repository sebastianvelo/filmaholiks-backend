import TMDB from "../../../tmdb/TMDB";
import BodyPageHelper from "../../common/helper/body-page/BodyPageHelper";
import SearchBarHelper from "../../common/helper/searchbar/SearchBarHelper";
import TitleHelper from "../../common/helper/title/TitleHelper";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailPageService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const body = await BodyPageHelper.movie.getDetail(movie);
    return {
      title: TitleHelper.movie.getDetail(movie),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body
    };
  }

  public static async getPersonDetailPage(id: string): Promise<DetailPageProps> {
    const person = await TMDB.person.getDetails(+id);
    const body = await BodyPageHelper.people.getDetail(person);
    return {
      title: TitleHelper.people.getDetail(person),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body
    };
  }

  public static async getShowDetailPage(id: string): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const body = await BodyPageHelper.show.getDetail(show);
    return {
      title: TitleHelper.show.getDetail(show),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getSeasonDetailPage(showId: string, seasonNumber: string): Promise<DetailPageProps> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const body = await BodyPageHelper.season.getDetail(season, showId, seasonNumber);
    return {
      title: TitleHelper.season.getDetail(season),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getEpisodeDetailPage(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageProps> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const body = await BodyPageHelper.episode.getDetail(episode, showId, seasonNumber, episodeNumber);
    return {
      title: TitleHelper.episode.getDetail(episode),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }
}

export default DetailPageService;
