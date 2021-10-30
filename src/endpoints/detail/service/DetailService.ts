import TMDB from "../../../tmdb/TMDB";
import { getMovieDetail, getTVShowDetail } from "../../../usecases/GetDetail";
import { getMovieDetailSections, getTVShowDetailSections } from "../../../usecases/GetSections";
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

  public static async getTVShowDetailPage(
    id: string
  ): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);

    return {
      detail: getTVShowDetail(show, video),
      sections: getTVShowDetailSections(show, moreLikeThis)
    };
  }
}

export default DetailService;
