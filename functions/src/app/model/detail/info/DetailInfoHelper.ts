import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailContentInfoModel } from "../../../../shared/model/pages/detail/header/DetailContentModel";
import * as DateHelper from "../../../helper/date/DateHelper";
import DataItemModel from "../../data-item/DataItemModel";

export const getShow = (show: TVShowResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Rating`, `${show.vote_average?.toFixed(2)} ⭐️`),
        DataItemModel(`Genres`, show.genres?.map((genre) => genre.name).join(", ")),
        DataItemModel(`Language`, show.original_language),
        DataItemModel(`Release`, DateHelper.getFullMessage(show.first_air_date)),
        DataItemModel(`Status`, show.status),
    ]
});

export const getEpisode = (episode: EpisodeResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Air date`, DateHelper.getFullMessage(episode.air_date)),
    ]
});