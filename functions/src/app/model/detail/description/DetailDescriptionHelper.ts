import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DataItemSectionModel } from "../../../../shared/model/components/section/Section";
import DataItemModel from "../../data-item/DataItemModel";

export const getPerson = (person: PersonDetailsResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Biography`, person.biography);

export const getShow = (show: TVShowResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${show.overview}`);

export const getSeason = (season: SeasonWithEpisodesResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, season.overview);

export const getEpisode = (episode: EpisodeResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, episode.overview);