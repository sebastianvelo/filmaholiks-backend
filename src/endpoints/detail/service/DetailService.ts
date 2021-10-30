import TMDB from "../../../tmdb/TMDB";
import { getMovieDetail, getTVShowDetail } from "../../../usecases/GetDetail";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    return {
      detail: getMovieDetail(movie, video)
    };
  }

  public static async getTVShowDetailPage(
    id: string
  ): Promise<DetailPageProps> {
    const tv = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    return {
      detail: getTVShowDetail(tv, video)
    };
  }
}

export default DetailService;
