import DetailPageModel from "../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../tmdb/TMDB";
import SearchBarHelper from "../helper/searchbar/SearchBarHelper";
import * as TitleHelper from "../helper/title/TitleHelper";
import EpisodeDetailPageBodyModel from "../model/body-page/detail/EpisodeDetailPageBodyModel";
import MovieDetailPageBodyModel from "../model/body-page/detail/MovieDetailPageBodyModel";
import PersonDetailPageBodyModel from "../model/body-page/detail/PersonDetailPageBodyModel";
import SeasonDetailPageBodyModel from "../model/body-page/detail/SeasonDetailPageBodyModel";
import ShowDetailPageBodyModel from "../model/body-page/detail/ShowDetailPageBodyModel";
import UserDetailPageBodyModel from "../model/body-page/detail/UserDetailPageBodyModel";
import UserRepository from "../repository/UserRepository";

class DetailPageService {
  public static async getUser(id: string): Promise<DetailPageModel> {
    const user = await UserRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    const body = await UserDetailPageBodyModel(user);
    return {
      title: TitleHelper.user.getDetail(user.userName),
      searchbar: SearchBarHelper.user.getSearchbar(),
      body
    };
  }

  public static async getMovie(id: string): Promise<DetailPageModel> {
    const movie = await TMDB.movie.getDetails(+id);
    const body = await MovieDetailPageBodyModel(movie);
    return {
      title: TitleHelper.movie.getDetail(movie),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body
    };
  }

  public static async getPerson(id: string): Promise<DetailPageModel> {
    const person = await TMDB.person.getDetails(+id);
    const body = await PersonDetailPageBodyModel(person);
    return {
      title: TitleHelper.people.getDetail(person),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body
    };
  }

  public static async getShow(id: string): Promise<DetailPageModel> {
    const show = await TMDB.tvShow.getDetails(+id);
    const body = await ShowDetailPageBodyModel(show);
    return {
      title: TitleHelper.show.getDetail(show),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getSeason(showId: string, seasonNumber: string): Promise<DetailPageModel> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const body = await SeasonDetailPageBodyModel(season, showId, seasonNumber);
    return {
      title: TitleHelper.season.getDetail(season),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getEpisode(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageModel> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const body = await EpisodeDetailPageBodyModel(episode, showId, seasonNumber);
    return {
      title: TitleHelper.episode.getDetail(episode),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }
}

export default DetailPageService;
