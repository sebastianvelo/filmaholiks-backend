import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ActionableCardModel from "../../../shared/model/components/ActionableCardModel";
import MovieCardHorizontalModel from "./horizontal/MovieCardHorizontalModel";
import ShowCardHorizontalModel from "./horizontal/ShowCardHorizontalModel";

export const getShowActionableCardHorizontal = (show: TVShowResponse, del: boolean): ActionableCardModel => ({
  item: ShowCardHorizontalModel(show),
  delete: del
});

export const getMovieActionableCardHorizontal = (movie: Movie, del: boolean): ActionableCardModel => ({
  item: MovieCardHorizontalModel(movie),
  delete: del,
});
