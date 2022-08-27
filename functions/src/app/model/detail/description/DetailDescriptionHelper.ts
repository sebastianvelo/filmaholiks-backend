import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DataItemSectionModel } from "../../../../shared/model/components/section/Section";
import DataItemModel from "../../data-item/DataItemModel";

export const getShow = (show: TVShowResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${show.overview}`);

export const getEpisode = (episode: EpisodeResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, episode.overview);