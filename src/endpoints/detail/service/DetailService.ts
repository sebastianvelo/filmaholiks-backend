import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import TMDB from "../../../tmdb/TMDB";
import getDataItem from "../../../usecases/GetDataItem";
import getImage from "../../../usecases/GetImage";
import { DetailPageProps, DetailProps } from "../model/DetailPageProps";

class DetailService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    return {
      detail: DetailService.getMovieDetail(movie)
    };
  }

  public static async getTVShowDetailPage(
    id: string
  ): Promise<DetailPageProps> {
    const tv = await TMDB.tvShow.getDetails(+id);
    return {
      detail: DetailService.getTVShowDetail(tv)
    };
  }

  static getMovieDetail(movie: MovieResponse): DetailProps {
    return {
      image: getImage(movie.poster_path, movie.title),
      header: {
        title: `${movie.title}`,
        subtitle: `(${movie.vote_average})`
      },
      description: getDataItem(`Description`, `${movie.overview}`),
      info: {
        data: [
          getDataItem(
            `Genres`,
            movie.genres?.map((genre) => genre.name).join(", ")
          ),
          getDataItem(`Duration`, `${movie.runtime}m`),
          getDataItem(`Language`, movie.original_language)
        ]
      },
      actions: [],
      video: {
        title: "Trailer",
        src: ``
      }
    };
  }

  static getTVShowDetail(tv: TVShowResponse): DetailProps {
    return {
      image: getImage(tv.poster_path, tv.original_name),
      header: {
        title: `${tv.original_name}`,
        subtitle: `(${tv.vote_average})`
      },
      description: getDataItem(`Description`, `${tv.overview}`),
      info: {
        data: [
          getDataItem(
            `Genres`,
            tv.genres?.map((genre) => genre.name).join(", ")
          ),
          getDataItem(`Language`, tv.original_language)
        ]
      },
      actions: [],
      video: {
        title: "Trailer",
        src: ``
      }
    };
  }
}

export default DetailService;
