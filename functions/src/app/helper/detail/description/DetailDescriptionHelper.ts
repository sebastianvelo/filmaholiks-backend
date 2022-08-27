import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DataItemSectionModel } from "../../../../shared/model/components/section/Section";
import UserEntity from "../../../entity/user/UserEntity";
import getDataItem  from "../../data-item/DataItemHelper";

export const getUser = (user: UserEntity): DataItemSectionModel | undefined =>
    getDataItem(`About`, `${user.about}`);

export const getMovie = (movie: MovieResponse): DataItemSectionModel | undefined =>
    getDataItem(`Description`, `${movie.overview}`);

export const getPerson = (person: PersonDetailsResponse): DataItemSectionModel | undefined =>
    getDataItem(`Biography`, person.biography);

export const getShow = (show: TVShowResponse): DataItemSectionModel | undefined =>
    getDataItem(`Description`, `${show.overview}`);

export const getSeason = (season: SeasonWithEpisodesResponse): DataItemSectionModel | undefined =>
    getDataItem(`Description`, season.overview);

export const getEpisode = (episode: EpisodeResponse): DataItemSectionModel | undefined =>
    getDataItem(`Description`, episode.overview);