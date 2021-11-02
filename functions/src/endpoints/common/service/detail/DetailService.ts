import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailProps } from "../../../detail/model/DetailPageProps";
import DataItemService from "../data-item/DataItemService";
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
    description: DataItemService.getDataItem(`Description`, `${tv.overview}`),
    info: {
      data: [
        DataItemService.getDataItem(
          `Genres`,
          tv.genres?.map((genre) => genre.name).join(", ")
        ),
        DataItemService.getDataItem(`Language`, tv.original_language)
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
    description: DataItemService.getDataItem(
      `Description`,
      `${movie.overview}`
    ),
    info: {
      data: [
        DataItemService.getDataItem(
          `Genres`,
          movie.genres?.map((genre) => genre.name).join(", ")
        ),
        DataItemService.getDataItem(`Duration`, `${movie.runtime}m`),
        DataItemService.getDataItem(`Language`, movie.original_language)
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
    description: DataItemService.getDataItem(
      `Biography`,
      `${person.biography}`
    ),
    info: {
      data: [
        DataItemService.getDataItem(`Place of birth`, person.place_of_birth)
      ]
    },
    actions: []
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
    description: DataItemService.getDataItem(
      `Description`,
      `${season.overview}`
    ),
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
    description: DataItemService.getDataItem(
      `Description`,
      `${episode.overview}`
    ),
    actions: [],
    video: MediaService.getTrailer(videos)
  });
}

export default DetailService;
