import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardProps } from "../endpoints/common/model/CardProps";
import getImage from "./GetImage";

const getMovieCard = (movie: MovieResponse): CardProps => ({
  title: movie.title,
  subtitle: `${movie.vote_average}`,
  image: getImage(movie.poster_path, movie.title),
  path: `/movie/${movie.id}`
});

const getTVCard = (show: TVShowResponse): CardProps => ({
  title: show.original_name,
  subtitle: show.release_date,
  image: getImage(show.poster_path, show.title),
  path: `/tv/${show.id}`
});

export { getMovieCard, getTVCard };
