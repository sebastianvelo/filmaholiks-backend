import { CreditPerson } from "tmdb-js/lib/api/model/credit/Credit";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShow } from "tmdb-js/lib/api/model/film/Film";
import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { CardProps } from "../../model/CardProps";
import MediaService from "../media/MediaService";

class CardService {
  public static getMovieCard = (movie: MovieResponse): CardProps => ({
    title: movie.title,
    subtitle: `${movie.vote_average}`,
    image: MediaService.getImage(movie.poster_path, movie.title),
    path: `/movie/${movie.id}`
  });

  public static getShowCard = (show: TVShow): CardProps => ({
    title: show.original_name,
    subtitle: `${show.vote_average}`,
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
}

export default CardService;
