import { CreditPerson } from "tmdb-js/lib/api/model/credit/Credit";
import { Character, Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { Movie, TVShow } from "tmdb-js/lib/api/model/film/Film";
import { Image } from "tmdb-js/lib/api/model/image/Image";
import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ActionableCardModel from "../../../shared/model/components/ActionableCardModel";
import CardHorizontalModel from "../../../shared/model/components/CardHorizontalModel";
import CardVerticalModel from "../../../shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "../../../shared/routes/PageRoute";
import { getTMDBImage } from "../../helper/media/MediaHelper";

export const getShowAppareances = (castMember: any): CardVerticalModel => ({
  title: castMember.name,
  subtitle: `as ${castMember.character}`,
  image: getTMDBImage(castMember.poster_path, castMember.name),
  path: PageRouteBuilder.SHOW_DETAIL(castMember.id),
});

export const getMovieAppareances = (castMember: any): CardVerticalModel => ({
  title: castMember.original_title,
  subtitle: `as ${castMember.character} `,
  image: getTMDBImage(castMember.poster_path, castMember.original_title),
  path: PageRouteBuilder.MOVIE_DETAIL(castMember.id)
});

export const getSeasonCard = (season: SeasonResponse, show?: number): CardVerticalModel => ({
  title: `${season.name} `,
  subtitle: `${season.episode_count} episodes`,
  image: getTMDBImage(season.poster_path, season.name),
  path: PageRouteBuilder.SEASON_DETAIL(show!, season.season_number)
});

export const getEpisodeCard = (episode: Episode, show?: number): CardVerticalModel => ({
  title: `${episode.name} `,
  subtitle: `${episode.vote_average} /10`,
  image: getTMDBImage(episode.still_path, episode.name),
  path: PageRouteBuilder.EPISODE_DETAIL(show!, episode.season_number!, episode.episode_number!)
});

export const getTopRatedEpisodeCard = (episode: Episode, show?: number): CardVerticalModel => ({
  title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
  subtitle: `${episode.vote_average}/10`,
  image: getTMDBImage(episode.still_path, episode.name),
  path: PageRouteBuilder.EPISODE_DETAIL(show!, episode.season_number!, episode.episode_number!)
});

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
