import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailProps } from "../../endpoints/detail/model/DetailPageProps";
import User from "../../model/user/User";
import MediaHelper from "../media/MediaHelper";
import DetailDescriptionHelper from "./description/DetailDescriptionHelper";
import DetailHeaderHelper from "./header/DetailHeaderHelper";
import DetailInfoHelper from "./info/DetailInfoHelper";

class DetailHelper {

  public static getUser = (user: User): DetailProps => ({
    poster: {
      src: user.photoURL,
      alt: user.displayName,
    },
    header: DetailHeaderHelper.getUser(user),
    description: DetailDescriptionHelper.getUser(user),
    info: DetailInfoHelper.getUser(user),
  });

  public static getMovie = (movie: MovieResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getTMDBImage(movie.poster_path, movie.title),
    backdrop: MediaHelper.getTMDBImage(movie.backdrop_path, movie.title),
    header: DetailHeaderHelper.getMovie(movie),
    description: DetailDescriptionHelper.getMovie(movie),
    info: DetailInfoHelper.getMovie(movie),
    video: MediaHelper.getTrailer(videos),
  });

  public static getPerson = (person: PersonDetailsResponse): DetailProps => ({
    poster: MediaHelper.getTMDBImage(person.profile_path, person.name),
    backdrop: MediaHelper.getTMDBImage(person.profile_path, person.name),
    header: DetailHeaderHelper.getPerson(person),
    description: DetailDescriptionHelper.getPerson(person),
    info: DetailInfoHelper.getPerson(person),
  });

  public static getShow = (show: TVShowResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getTMDBImage(show.poster_path, show.original_name),
    backdrop: MediaHelper.getTMDBImage(show.backdrop_path, show.original_name),
    header: DetailHeaderHelper.getShow(show),
    description: DetailDescriptionHelper.getShow(show),
    info: DetailInfoHelper.getShow(show),
    video: MediaHelper.getTrailer(videos),
    actions: {
      watchlistButton: {
        title: show.original_name,
        info: `${show.seasons?.filter(season => season.season_number).length} seasons`,
        path: `/show/${show.id}`,
        poster: MediaHelper.getTMDBImage(show.poster_path, show.original_name),
        category: show.genres?.map((genre) => genre.name).join(", "),
      }
    },
  });

  public static getSeason = (season: SeasonWithEpisodesResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getTMDBImage(season.poster_path, season.name),
    backdrop: MediaHelper.getTMDBImage(season.poster_path, season.name),
    header: DetailHeaderHelper.getSeason(season),
    info: DetailInfoHelper.getSeason(season),
    description: DetailDescriptionHelper.getSeason(season),
    video: MediaHelper.getTrailer(videos),
  });

  public static getEpisode = (episode: EpisodeResponse, videos: VideosResponse): DetailProps => ({
    poster: MediaHelper.getTMDBImage(episode.still_path, episode.name),
    backdrop: MediaHelper.getTMDBImage(episode.still_path, episode.name),
    header: DetailHeaderHelper.getEpisode(episode),
    info: DetailInfoHelper.getEpisode(episode),
    description: DetailDescriptionHelper.getEpisode(episode),
    video: MediaHelper.getTrailer(videos),
  });
}

export default DetailHelper;
