import TMDB from "../../tmdb/TMDB";
import BodyPageHelper from "../helper/body-page/BodyPageHelper";
import SearchBarHelper from "../helper/searchbar/SearchBarHelper";
import * as TitleHelper from "../helper/title/TitleHelper";
import UserRepository from "../../repository/user/UserRepository";
import DetailPageModel from "../model/pages/detail/DetailPageModel";

class DetailPageService {
  public static async getUser(id: string): Promise<DetailPageModel> {
    const user = await UserRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    const body = await BodyPageHelper.user.getDetail(user);
    return {
      title: TitleHelper.user.getDetail(user.userName),
      searchbar: SearchBarHelper.user.getSearchbar(),
      body
    };
  }

  public static async getMovie(id: string): Promise<DetailPageModel> {
    const movie = await TMDB.movie.getDetails(+id);
    const body = await BodyPageHelper.movie.getDetail(movie);
    return {
      title: TitleHelper.movie.getDetail(movie),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body
    };
  }

  public static async getPerson(id: string): Promise<DetailPageModel> {
    const person = await TMDB.person.getDetails(+id);
    const body = await BodyPageHelper.people.getDetail(person);
    return {
      title: TitleHelper.people.getDetail(person),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body
    };
  }

  public static async getShow(id: string): Promise<DetailPageModel> {
    const show = await TMDB.tvShow.getDetails(+id);
    const body = await BodyPageHelper.show.getDetail(show);
    return {
      title: TitleHelper.show.getDetail(show),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getSeason(showId: string, seasonNumber: string): Promise<DetailPageModel> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const body = await BodyPageHelper.season.getDetail(season, showId, seasonNumber);
    return {
      title: TitleHelper.season.getDetail(season),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getEpisode(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageModel> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const body = await BodyPageHelper.episode.getDetail(episode, showId, seasonNumber);
    return {
      title: TitleHelper.episode.getDetail(episode),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }
}

export default DetailPageService;
