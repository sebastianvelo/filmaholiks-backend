import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShow } from "tmdb-js/lib/api/model/film/Film";
import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { CardProps } from "../endpoints/common/model/CardProps";
import getImage from "./GetImage";

const getMovieCard = (movie: MovieResponse): CardProps => ({
  title: movie.title,
  subtitle: `${movie.vote_average}`,
  image: getImage(movie.poster_path, movie.title),
  path: `/movie/${movie.id}`
});

const getShowCard = (show: TVShow): CardProps => ({
  title: show.original_name,
  subtitle: show.first_air_date,
  image: getImage(show.poster_path, show.title),
  path: `/show/${show.id}`
});

const getPersonCard = (person: PersonDetail): CardProps => ({
  title: person.name,
  subtitle: person.birthday,
  image: getImage("person", person.name),
  path: `/person/${person.id}`
});

const getSeasonCard = (season: SeasonResponse, show?: string | number): CardProps => ({
  title: `${season.name}`,
  subtitle: `${season.episode_count} episodes`,
  image: getImage(season.poster_path, season.name),
  path: `/show/${show}/s/${season.season_number}`
});

const getEpisodeCard = (episode: Episode, season: SeasonResponse, show: string): CardProps => ({
  title: `${episode.name}`,
  subtitle: `${episode.vote_average}/10`,
  image: getImage(season.poster_path, episode.name),
  path: `/show/${show}/s/${episode.season_number}/e/${episode.episode_number}`
});

export { getMovieCard, getShowCard as getTVCard, getPersonCard, getSeasonCard, getEpisodeCard };
