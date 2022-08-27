import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ActionableCardModel from "../../../shared/model/components/ActionableCardModel";
import CardHorizontalModel from "../../../shared/model/components/CardHorizontalModel";
import { PageRouteBuilder } from "../../../shared/routes/PageRoute";
import { getTMDBImage } from "../../helper/media/MediaHelper";
import ShowCardHorizontalModel from "./horizontal/ShowCardHorizontalModel";

export const getMoviCardHorizontal = (movie: Movie): CardHorizontalModel => ({
  id: movie.id ?? -1,
  title: movie.title,
  image: getTMDBImage(movie.poster_path, movie.title),
  subtitle: `${movie.vote_average}/10 ⭐️`,
  path: PageRouteBuilder.MOVIE_DETAIL(movie.id)
});

export const getShowActionableCardHorizontal = (show: TVShowResponse, del: boolean): ActionableCardModel => ({
  item: ShowCardHorizontalModel(show),
  delete: del
});

export const getMovieActionableCardHorizontal = (movie: Movie, del: boolean): ActionableCardModel => ({
  item: getMoviCardHorizontal(movie),
  delete: del,
});
