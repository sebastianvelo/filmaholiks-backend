import TMDB from "../../../tmdb/TMDB";
import { getMovieDetail, getSeasonDetail, getShowDetail } from "../../../usecases/GetDetail";
import { getMovieDetailSections, getSeasonExploreSections, getShowDetailSections } from "../../../usecases/GetSections";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(+id);
    return {
      detail: getMovieDetail(movie, video),
      sections: getMovieDetailSections(movie, moreLikeThis)
    };
  }

  public static async getShowDetailPage(
    id: string
  ): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);

    return {
      detail: getShowDetail(show, video),
      sections: getShowDetailSections(show, moreLikeThis)
    };
  }

  public static async getSeasonDetailPage(
    id: string,
    seasonNumber: string
  ): Promise<DetailPageProps> {
    const season = await TMDB.season.getDetails(+id, +seasonNumber);
    const videos = await TMDB.season.getVideos(+id, +seasonNumber);
    return {
      detail: getSeasonDetail(season, videos),
      sections: getSeasonExploreSections(season, id)
    };
  }
}

export default DetailService;
