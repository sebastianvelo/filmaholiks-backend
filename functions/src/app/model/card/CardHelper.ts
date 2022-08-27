import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { Image } from "tmdb-js/lib/api/model/image/Image";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ActionableCardModel from "../../../shared/model/components/ActionableCardModel";
import CardHorizontalModel from "../../../shared/model/components/CardHorizontalModel";
import CardVerticalModel from "../../../shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "../../../shared/routes/PageRoute";
import { getTMDBImage } from "../../helper/media/MediaHelper";

export const getGalleryImage = (image: Image): CardVerticalModel => ({
  image: getTMDBImage(image.file_path, image.id)
});

const getTags = (show: TVShowResponse) =>
  show.genres?.map((genre) => genre.name).includes("Comedy") ? "Comedy" : "Drama";

export const getShowCardHorizontal = (show: TVShowResponse): CardHorizontalModel => ({
  id: show.id ?? -1,
  title: show.original_name,
  image: getTMDBImage(show.poster_path, show.title),
  subtitle: `${show.seasons?.filter(season => season.season_number).length} seasons`,
  tags: getTags(show),
  path: PageRouteBuilder.SHOW_DETAIL(show.id),
});

export const getMoviCardHorizontal = (movie: Movie): CardHorizontalModel => ({
  id: movie.id ?? -1,
  title: movie.title,
  image: getTMDBImage(movie.poster_path, movie.title),
  subtitle: `${movie.vote_average}/10 ⭐️`,
  path: PageRouteBuilder.MOVIE_DETAIL(movie.id)
});

export const getShowActionableCardHorizontal = (show: TVShowResponse, del: boolean): ActionableCardModel => ({
  item: getShowCardHorizontal(show),
  delete: del
});

export const getMovieActionableCardHorizontal = (movie: Movie, del: boolean): ActionableCardModel => ({
  item: getMoviCardHorizontal(movie),
  delete: del,
});
