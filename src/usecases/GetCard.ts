import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShow } from "tmdb-js/lib/api/model/film/Film";
import { CardProps } from "../endpoints/common/model/CardProps";
import getImage from "./GetImage";

const getMovieCard = (movie: MovieResponse): CardProps => ({
  title: movie.title,
  subtitle: `${movie.vote_average}`,
  image: getImage(movie.poster_path, movie.title),
  path: `/movie/${movie.id}`
});

const getTVShowCard = (show: TVShow): CardProps => ({
  title: show.original_name,
  subtitle: show.first_air_date,
  image: getImage(show.poster_path, show.title),
  path: `/tv/${show.id}`
});

const getPersonCard = (person: PersonDetail): CardProps => ({
  title: person.name,
  subtitle: person.birthday,
  image: getImage("person", person.name),
  path: `/person/${person.id}`
});

const getSeasonCard = (season: SeasonResponse): CardProps => ({
  title: `${season.name}`,
  subtitle: `${season.episode_count} episodes`,
  image: getImage(season.poster_path, season.name),
  path: `/season/${season.season_number}`
});

export { getMovieCard, getTVShowCard as getTVCard, getPersonCard, getSeasonCard };
