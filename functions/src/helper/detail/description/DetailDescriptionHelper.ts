import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DataItemProps } from "../../../endpoints/detail/model/DetailPageProps";
import UserModel from "../../../repository/model/user/UserModel";
import getDataItem  from "../../data-item/DataItemHelper";

export const getUser = (user: UserModel): DataItemProps | undefined =>
    getDataItem(`About`, `${user.about}`);

export const getMovie = (movie: MovieResponse): DataItemProps | undefined =>
    getDataItem(`Description`, `${movie.overview}`);

export const getPerson = (person: PersonDetailsResponse): DataItemProps | undefined =>
    getDataItem(`Biography`, person.biography);

export const getShow = (show: TVShowResponse): DataItemProps | undefined =>
    getDataItem(`Description`, `${show.overview}`);

export const getSeason = (season: SeasonWithEpisodesResponse): DataItemProps | undefined =>
    getDataItem(`Description`, season.overview);

export const getEpisode = (episode: EpisodeResponse): DataItemProps | undefined =>
    getDataItem(`Description`, episode.overview);