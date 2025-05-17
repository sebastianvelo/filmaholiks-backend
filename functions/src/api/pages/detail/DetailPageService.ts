import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import TMDB from "@TMDB/TMDB";
import * as UserService from "@api/entities/user/User.service";
import EpisodeDetailPage from "./page/episode/EpisodeDetailPage";
import MovieDetailPage from "./page/movie/MovieDetailPage";
import PersonDetailPage from "./page/person/PersonDetailPage";
import SeasonDetailPage from "./page/season/SeasonDetailPage";
import ShowDetailPage from "./page/show/ShowDetailPage";
import UserDetailPage from "./page/user/UserDetailPage";

class DetailPageService {
  public static async getUser(userName: string, viewerUid?: string): Promise<DetailPageModel> {
    const userTask = UserService.getUser(userName);
    const userResult = await userTask();
    if (userResult._tag === "Left") {
      throw new Error("User not found");
    }
    return UserDetailPage({ user: userResult.right, viewerUid });
  }

  public static async getPerson(id: string): Promise<DetailPageModel> {
    const person = await TMDB.person.getDetails(+id);
    return PersonDetailPage({ person });
  }

  public static async getMovie(id: string, viewerUid?: string): Promise<DetailPageModel> {
    const movie = await TMDB.movie.getDetails(+id);
    return MovieDetailPage({ movie, viewerUid });
  }

  public static async getShow(id: string, viewerUid?: string): Promise<DetailPageModel> {
    const show = await TMDB.tvShow.getDetails(+id);
    return ShowDetailPage({ show, viewerUid });
  }

  public static async getSeason(showId: string, seasonNumber: string): Promise<DetailPageModel> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    return SeasonDetailPage({ season, showId, seasonNumber });
  }

  public static async getEpisode(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageModel> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    return EpisodeDetailPage({ episode, showId, seasonNumber });
  }
}

export default DetailPageService;
