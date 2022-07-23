import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailProps } from "../../../detail/model/DetailPageProps";
import MediaService from "../media/MediaService";
import DetailDescriptionService from "./description/DetailDescriptionService";
import DetailHeaderService from "./header/DetailHeaderService";
import DetailInfoService from "./info/DetailInfoService";

class DetailService {
  public static getShowDetail = (tv: TVShowResponse, videos: VideosResponse): DetailProps => ({
    image: MediaService.getImage(tv.poster_path, tv.original_name),
    backdrop: MediaService.getImage(tv.backdrop_path, tv.original_name),
    header: DetailHeaderService.getShowHeader(tv),
    description: DetailDescriptionService.getShowDescription(tv),
    info: DetailInfoService.getShowInfo(tv),
    video: MediaService.getTrailer(videos),
    actions: [],
  });

  public static getMovieDetail = (movie: MovieResponse, videos: VideosResponse): DetailProps => ({
    image: MediaService.getImage(movie.poster_path, movie.title),
    backdrop: MediaService.getImage(movie.backdrop_path, movie.title),
    header: DetailHeaderService.getMovieHeader(movie),
    description: DetailDescriptionService.getMovieDescription(movie),
    info: DetailInfoService.getMovieInfo(movie),
    video: MediaService.getTrailer(videos),
    actions: [],
  });

  public static getPersonDetail = (person: PersonDetailsResponse): DetailProps => ({
    image: MediaService.getImage(person.profile_path, person.name),
    backdrop: MediaService.getImage(person.profile_path, person.name),
    header: DetailHeaderService.getPersonHeader(person),
    description: DetailDescriptionService.getPersonDescription(person),
    info: DetailInfoService.getPersonInfo(person),
    actions: [],
  });

  public static getSeasonDetail = (season: SeasonWithEpisodesResponse, videos: VideosResponse): DetailProps => ({
    image: MediaService.getImage(season.poster_path, season.name),
    backdrop: MediaService.getImage(season.poster_path, season.name),
    header: DetailHeaderService.getSeasonHeader(season),
    info: DetailInfoService.getSeasonInfo(season),
    description: DetailDescriptionService.getSeasonDescription(season),
    video: MediaService.getTrailer(videos),
  });

  public static getEpisodeDetail = (episode: EpisodeResponse, videos: VideosResponse): DetailProps => ({
    image: MediaService.getImage(episode.still_path, episode.name),
    backdrop: MediaService.getImage(episode.still_path, episode.name),
    header: DetailHeaderService.getEpisodeHeader(episode),
    info: DetailInfoService.getEpisodeInfo(episode),
    description: DetailDescriptionService.getEpisodeDescription(episode),
    video: MediaService.getTrailer(videos),
  });
}

export default DetailService;
