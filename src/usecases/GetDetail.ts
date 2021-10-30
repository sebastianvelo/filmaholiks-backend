import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailProps } from "../endpoints/detail/model/DetailPageProps";
import getDataItem from "./GetDataItem";
import getImage from "./GetImage";
import getTrailer from "./GetTrailer";

const getTVShowDetail = (
  tv: TVShowResponse,
  videos: VideosResponse
): DetailProps => ({
  image: getImage(tv.poster_path, tv.original_name),
  header: {
    title: `${tv.original_name}`,
    subtitle: `(${tv.vote_average})`
  },
  description: getDataItem(`Description`, `${tv.overview}`),
  info: {
    data: [
      getDataItem(`Genres`, tv.genres?.map((genre) => genre.name).join(", ")),
      getDataItem(`Language`, tv.original_language)
    ]
  },
  actions: [],
  video: getTrailer(videos)
});

const getMovieDetail = (
  movie: MovieResponse,
  videos: VideosResponse
): DetailProps => ({
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
  video: getTrailer(videos)
});

export { getMovieDetail, getTVShowDetail };
