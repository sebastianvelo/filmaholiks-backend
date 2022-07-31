import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailProps } from "../../../detail/model/DetailPageProps";
import MediaHelper from "../media/MediaHelper";
import DetailDescriptionHelper from "./description/DetailDescriptionHelper";
import DetailHeaderHelper from "./header/DetailHeaderHelper";
import DetailInfoHelper from "./info/DetailInfoHelper";

class DetailHelper {
  public static getShowDetail = (show: TVShowResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getImage(show.poster_path, show.original_name),
    backdrop: MediaHelper.getImage(show.backdrop_path, show.original_name),
    header: DetailHeaderHelper.getShowHeader(show),
    description: DetailDescriptionHelper.getShowDescription(show),
    info: DetailInfoHelper.getShowInfo(show),
    video: MediaHelper.getTrailer(videos), 
    actions: {
      addToWatchlist: {
        title: show.original_name,
        info: `${show.seasons?.filter(season => season.season_number).length} seasons`,
        path: "",
        poster: MediaHelper.getImage(show.poster_path, show.original_name)
      }
    },
  });

  public static getMovieDetail = (movie: MovieResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getImage(movie.poster_path, movie.title),
    backdrop: MediaHelper.getImage(movie.backdrop_path, movie.title),
    header: DetailHeaderHelper.getMovieHeader(movie),
    description: DetailDescriptionHelper.getMovieDescription(movie),
    info: DetailInfoHelper.getMovieInfo(movie),
    video: MediaHelper.getTrailer(videos),
  });

  public static getPersonDetail = (person: PersonDetailsResponse): DetailProps => ({
    poster: MediaHelper.getImage(person.profile_path, person.name),
    backdrop: MediaHelper.getImage(person.profile_path, person.name),
    header: DetailHeaderHelper.getPersonHeader(person),
    description: DetailDescriptionHelper.getPersonDescription(person),
    info: DetailInfoHelper.getPersonInfo(person),
  });

  public static getSeasonDetail = (season: SeasonWithEpisodesResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getImage(season.poster_path, season.name),
    backdrop: MediaHelper.getImage(season.poster_path, season.name),
    header: DetailHeaderHelper.getSeasonHeader(season),
    info: DetailInfoHelper.getSeasonInfo(season),
    description: DetailDescriptionHelper.getSeasonDescription(season),
    video: MediaHelper.getTrailer(videos),
  });

  public static getEpisodeDetail = (episode: EpisodeResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getImage(episode.still_path, episode.name),
    backdrop: MediaHelper.getImage(episode.still_path, episode.name),
    header: DetailHeaderHelper.getEpisodeHeader(episode),
    info: DetailInfoHelper.getEpisodeInfo(episode),
    description: DetailDescriptionHelper.getEpisodeDescription(episode),
    video: MediaHelper.getTrailer(videos),
  });
}

export default DetailHelper;
