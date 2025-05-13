import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import * as DateHelper from "@helper/date/DateHelper";
import { getTMDBImage, getTrailer } from "@api/helper/media/MediaHelper";
import ImageModel from "shared/model/atom/ImageModel";
import VideoModel from "shared/model/atom/VideoModel";
import { DataItemSectionModel } from "shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "shared/model/pages/detail/header/DetailHeaderModel";
import DataItemModel from "../../common/data-item/DataItemModel";

const Poster = (season: SeasonWithEpisodesResponse): ImageModel =>
    getTMDBImage(season.poster_path, season.name);

const Backdrop = (season: SeasonWithEpisodesResponse): ImageModel =>
    getTMDBImage(season.poster_path, season.name);

const ContentHeader = (season: SeasonWithEpisodesResponse): DetailContentHeaderModel => ({
    title: `${season.name}`
});

const Description = (season: SeasonWithEpisodesResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${season.overview}`);

const Info = (season: SeasonWithEpisodesResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Air date`, DateHelper.getFullMessage(season.air_date)),
        DataItemModel(`Episodes`, `${season.episodes?.length}`),
    ]
});

const Video = (videos: VideosResponse): VideoModel =>
    getTrailer(videos);

const Header = (season: SeasonWithEpisodesResponse, videos: VideosResponse): DetailHeaderModel => ({
    poster: Poster(season),
    backdrop: Backdrop(season),
    header: ContentHeader(season),
    description: Description(season),
    info: Info(season),
    video: Video(videos),
});

export default Header;