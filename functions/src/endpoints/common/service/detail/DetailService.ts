import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import getDataItem from "../../../../usecases/GetDataItem";
import { DetailProps } from "../../../detail/model/DetailPageProps";
import MediaService from "../media/MediaService";

class DetailService {
  public static getShowDetail = (
    tv: TVShowResponse,
    videos: VideosResponse
  ): DetailProps => ({
    image: MediaService.getImage(tv.poster_path, tv.original_name),
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
    video: MediaService.getTrailer(videos)
  });

  public static getMovieDetail = (
    movie: MovieResponse,
    videos: VideosResponse
  ): DetailProps => ({
    image: MediaService.getImage(movie.poster_path, movie.title),
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
    video: MediaService.getTrailer(videos)
  });

  public static getPersonDetail = (
    person: PersonDetailsResponse
  ): DetailProps => ({
    image: MediaService.getImage(person.profile_path, person.name),
    header: {
      title: `${person.name}`,
      subtitle: `(${person.birthday})`
    },
    description: getDataItem(`Biography`, `${person.biography}`),
    info: {
      data: [
        getDataItem(`Place of birth`, person.place_of_birth)
      ]
    },
    actions: [],
  });

  public static getSeasonDetail = (
    season: SeasonWithEpisodesResponse,
    videos: VideosResponse
  ): DetailProps => ({
    image: MediaService.getImage(season.poster_path, season.name),
    header: {
      title: `${season.name}`,
      subtitle: `(${season.air_date})`
    },
    description: season.overview
      ? getDataItem(`Description`, `${season.overview}`)
      : undefined,
    actions: [],
    video: MediaService.getTrailer(videos)
  });

  public static getEpisodeDetail = (
    episode: EpisodeResponse,
    videos: VideosResponse
  ): DetailProps => ({
    image: MediaService.getImage(episode.still_path, episode.name),
    header: {
      title: `${episode.name}`,
      subtitle: `(${episode.air_date})`
    },
    description: episode.overview
      ? getDataItem(`Description`, `${episode.overview}`)
      : undefined,
    actions: [],
    video: MediaService.getTrailer(videos)
  });
}

export default DetailService;
