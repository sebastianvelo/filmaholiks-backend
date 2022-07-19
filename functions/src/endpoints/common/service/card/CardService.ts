import { CreditPerson } from "tmdb-js/lib/api/model/credit/Credit";
import { Character, Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShow } from "tmdb-js/lib/api/model/film/Film";
import { Image } from "tmdb-js/lib/api/model/image/Image";
import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { ItemProps } from "../../../watch-list/model/WatchListPageProps";
import { CardProps } from "../../model/CardProps";
import MediaService from "../media/MediaService";

class CardService {
  public static getMovieCard = (movie: MovieResponse): CardProps => ({
    title: movie.title,
    subtitle: `${movie.release_date?.substring(0, 4)}`,
    image: MediaService.getImage(movie.poster_path, movie.title),
    path: `/movie/${movie.id}`
  });

  public static getShowCard = (show: TVShow): CardProps => ({
    title: show.original_name,
    subtitle: `${show.first_air_date?.substring(0, 4)}`,
    image: MediaService.getImage(show.poster_path, show.title),
    path: `/show/${show.id}`
  });

  public static getPersonCard = (person: PersonDetail): CardProps => ({
    title: person.name,
    subtitle: person.birthday,
    image: MediaService.getImage(person.profile_path, person.name),
    path: `/person/${person.id}`
  });

  public static getCastMemberCard = (castMember: CreditPerson): CardProps => ({
    title: castMember.name,
    subtitle: `as ${castMember.character}`,
    image: MediaService.getImage(castMember.profile_path, castMember.name),
    path: `/person/${castMember.id}`
  });

  public static getCrewCard = (crew: Character): CardProps => ({
    title: crew.name,
    subtitle: `as ${crew.job}`,
    image: MediaService.getImage(crew.profile_path, crew.name),
    path: `/person/${crew.id}`
  });

  public static getShowAppareances = (castMember: any): CardProps => ({
    title: castMember.name,
    subtitle: `as ${castMember.character}`,
    path: `/show/${castMember.id}`,
    image: MediaService.getImage(castMember.backdrop_path, castMember.name),
  });

  public static getMovieAppareances = (castMember: any): CardProps => ({
    title: castMember.original_title,
    subtitle: `as ${castMember.character}`,
    path: `/movie/${castMember.id}`,
    image: MediaService.getImage(castMember.backdrop_path, castMember.original_title),
  });

  public static getSeasonCard = (
    season: SeasonResponse,
    show?: string | number
  ): CardProps => ({
    title: `${season.name}`,
    subtitle: `${season.episode_count} episodes`,
    image: MediaService.getImage(season.poster_path, season.name),
    path: `/show/${show}/s/${season.season_number}`
  });

  public static getEpisodeCard = (
    episode: Episode,
    season: SeasonResponse,
    show: string
  ): CardProps => ({
    title: `${episode.name}`,
    subtitle: `${episode.vote_average}/10`,
    image: MediaService.getImage(season.poster_path, episode.name),
    path: `/show/${show}/s/${episode.season_number}/e/${episode.episode_number}`
  });

  public static getGalleryImage = (
    image: Image
  ): CardProps => ({
    image: MediaService.getImage(image.file_path, image.id)
  });

  public static getShowSuggestionCard = (show: TVShow): ItemProps => ({
    title: show.original_name ?? "",
    poster: MediaService.getImage(show.poster_path, show.title),
    info: "ss",
    category: "ss",
    path: `/show/${show.id}`
  });
}

export default CardService;
