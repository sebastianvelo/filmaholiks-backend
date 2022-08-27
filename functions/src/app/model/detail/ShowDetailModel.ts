import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ImageModel from "../../../shared/model/atom/ImageModel";
import VideoModel from "../../../shared/model/atom/VideoModel";
import { DataItemSectionModel } from "../../../shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "../../../shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "../../../shared/model/pages/detail/header/DetailHeaderModel";
import MediaType from "../../../shared/types/MediaType";
import * as DateHelper from "../../helper/date/DateHelper";
import { getTMDBImage, getTrailer } from "../../helper/media/MediaHelper";
import ShowCardHorizontalModel from "../card/horizontal/ShowCardHorizontalModel";
import DataItemModel from "../data-item/DataItemModel";

const Poster = (show: TVShowResponse): ImageModel =>
    getTMDBImage(show.poster_path, show.original_name);

const Backdrop = (show: TVShowResponse): ImageModel =>
    getTMDBImage(show.backdrop_path, show.original_name);

const ContentHeader = (show: TVShowResponse): DetailContentHeaderModel => ({
    title: `${show.original_name}`,
});

const Description = (show: TVShowResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${show.overview}`);

const Info = (show: TVShowResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Rating`, `${show.vote_average?.toFixed(2)} ⭐️`),
        DataItemModel(`Genres`, show.genres?.map((genre) => genre.name).join(", ")),
        DataItemModel(`Language`, show.original_language),
        DataItemModel(`Release`, DateHelper.getFullMessage(show.first_air_date)),
        DataItemModel(`Status`, show.status),
    ]
});

const Video = (videos: VideosResponse): VideoModel =>
    getTrailer(videos);

const Actions = (show: TVShowResponse) => ({
    watchlistButton: {
        ...ShowCardHorizontalModel(show),
        mediaType: MediaType.SHOW
    }
});

const ShowDetailModel = (show: TVShowResponse, videos: VideosResponse): DetailHeaderModel => ({
    poster: Poster(show),
    backdrop: Backdrop(show),
    header: ContentHeader(show),
    description: Description(show),
    info: Info(show),
    video: Video(videos),
    actions: Actions(show)
});

export default ShowDetailModel;