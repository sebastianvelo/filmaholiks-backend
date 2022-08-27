import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailHeaderModel } from "../../../shared/model/pages/detail/header/DetailHeaderModel";
import MediaType from "../../../shared/types/MediaType";
import * as MediaHelper from "../../helper/media/MediaHelper";
import ShowCardHorizontalModel from "../card/horizontal/ShowCardHorizontalModel";
import * as DetailDescriptionHelper from "./description/DetailDescriptionHelper";
import * as DetailHeaderHelper from "./header/DetailHeaderHelper";
import * as DetailInfoHelper from "./info/DetailInfoHelper";

export const getPerson = (person: PersonDetailsResponse): DetailHeaderModel => ({
  poster: MediaHelper.getTMDBImage(person.profile_path, person.name),
  backdrop: MediaHelper.getTMDBImage(person.profile_path, person.name),
  header: DetailHeaderHelper.getPerson(person),
  description: DetailDescriptionHelper.getPerson(person),
  info: DetailInfoHelper.getPerson(person),
});

export const getShow = (show: TVShowResponse, videos: VideosResponse): DetailHeaderModel => ({
  poster: MediaHelper.getTMDBImage(show.poster_path, show.original_name),
  backdrop: MediaHelper.getTMDBImage(show.backdrop_path, show.original_name),
  header: DetailHeaderHelper.getShow(show),
  description: DetailDescriptionHelper.getShow(show),
  info: DetailInfoHelper.getShow(show),
  video: MediaHelper.getTrailer(videos),
  actions: {
    watchlistButton: {
      ...ShowCardHorizontalModel(show),
      mediaType: MediaType.SHOW
    }
  },
});

export const getSeason = (season: SeasonWithEpisodesResponse, videos: VideosResponse): DetailHeaderModel => ({
  poster: MediaHelper.getTMDBImage(season.poster_path, season.name),
  backdrop: MediaHelper.getTMDBImage(season.poster_path, season.name),
  header: DetailHeaderHelper.getSeason(season),
  info: DetailInfoHelper.getSeason(season),
  description: DetailDescriptionHelper.getSeason(season),
  video: MediaHelper.getTrailer(videos),
});

export const getEpisode = (episode: EpisodeResponse, videos: VideosResponse): DetailHeaderModel => ({
  poster: MediaHelper.getTMDBImage(episode.still_path, episode.name),
  backdrop: MediaHelper.getTMDBImage(episode.still_path, episode.name),
  header: DetailHeaderHelper.getEpisode(episode),
  info: DetailInfoHelper.getEpisode(episode),
  description: DetailDescriptionHelper.getEpisode(episode),
  video: MediaHelper.getTrailer(videos),
});
