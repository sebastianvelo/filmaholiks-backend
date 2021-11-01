import TMDB from "../../../tmdb/TMDB";
import DetailService from "../../common/service/detail/DetailService";
import SectionService from "../../common/service/section/SectionService";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailPageService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(+id);
    const credits = await TMDB.movie.getCredits(+id);
    return {
      detail: DetailService.getMovieDetail(movie, video),
      sections: SectionService.getMovieDetailSections({ credits, moreLikeThis })
    };
  }

  public static async getPersonDetailPage(id: string): Promise<DetailPageProps> {
    const person = await TMDB.person.getDetails(+id);
    return {
      detail: DetailService.getPersonDetail(person),
    };
  }

  public static async getShowDetailPage(id: string): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);
    const credits = await TMDB.tvShow.getCredits(+id);
    return {
      detail: DetailService.getShowDetail(show, video),
      sections: SectionService.getShowDetailSections({
        show,
        moreLikeThis,
        credits
      })
    };
  }

  public static async getSeasonDetailPage(
    showId: string,
    seasonNumber: string
  ): Promise<DetailPageProps> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const videos = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
    return {
      detail: DetailService.getSeasonDetail(season, videos),
      sections: SectionService.getSeasonDetailSections({
        season,
        showId,
        credits
      })
    };
  }

  public static async getEpisodeDetailPage(
    id: string,
    seasonNumber: string,
    episode: string
  ): Promise<DetailPageProps> {
    const details = await TMDB.episode.getDetails(+id, +seasonNumber, +episode);
    const videos = await TMDB.episode.getVideos(+id, +seasonNumber, +episode);
    return {
      detail: DetailService.getEpisodeDetail(details, videos)
    };
  }
}

export default DetailPageService;
