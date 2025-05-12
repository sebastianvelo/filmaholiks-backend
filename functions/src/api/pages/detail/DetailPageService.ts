import DetailPageModel from "../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../tmdb/TMDB";
import UserService from "../../entities/user/UserService";
import * as TitleHelper from "../../helper/title/TitleHelper";
import EpisodeDetailPageBodyModel from "../../model/body-page/detail/EpisodeDetailPageBodyModel";
import MovieDetailPageBodyModel from "../../model/body-page/detail/MovieDetailPageBodyModel";
import SeasonDetailPageBodyModel from "../../model/body-page/detail/SeasonDetailPageBodyModel";
import ShowDetailPageBodyModel from "../../model/body-page/detail/ShowDetailPageBodyModel";
import MovieSearchBarModel from "../../model/searchbar/MovieSearchBarModel";
import ShowSearchBarModel from "../../model/searchbar/ShowSearchBarModel";
import PersonDetailPage from "./page/PersonDetailPage";
import UserDetailPage from "./page/UserDetailPage";

class DetailPageService {
  public static async getUser(userName: string, viewerUid?: string): Promise<DetailPageModel> {
    const user = await UserService.getUser(userName);
    if (!user) {
      throw new Error("User not found");
    }
    return UserDetailPage({ user, viewerUid });
  }

  public static async getPerson(id: string): Promise<DetailPageModel> {
    const person = await TMDB.person.getDetails(+id);
    return PersonDetailPage({ person });
  }

  public static async getMovie(id: string, viewerUid?: string): Promise<DetailPageModel> {
    const movie = await TMDB.movie.getDetails(+id);
    const body = await MovieDetailPageBodyModel(movie, viewerUid);

    return {
      title: TitleHelper.movie.getDetail(movie),
      searchbar: MovieSearchBarModel(),
      body
    };
  }

  public static async getShow(id: string, viewerUid?: string): Promise<DetailPageModel> {
    const show = await TMDB.tvShow.getDetails(+id);
    const body = await ShowDetailPageBodyModel(show, viewerUid);

    return {
      title: TitleHelper.show.getDetail(show),
      searchbar: ShowSearchBarModel(),
      body
    };
  }

  public static async getSeason(showId: string, seasonNumber: string): Promise<DetailPageModel> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const body = await SeasonDetailPageBodyModel(season, showId, seasonNumber);

    return {
      title: TitleHelper.season.getDetail(season),
      searchbar: ShowSearchBarModel(),
      body
    };
  }

  public static async getEpisode(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageModel> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const body = await EpisodeDetailPageBodyModel(episode, showId, seasonNumber);

    return {
      title: TitleHelper.episode.getDetail(episode),
      searchbar: ShowSearchBarModel(),
      body
    };
  }
}

export default DetailPageService;
