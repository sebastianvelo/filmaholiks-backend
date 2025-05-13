import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import ImageModel from "../@shared/model/atom/ImageModel";
import VideoModel from "../@shared/model/atom/VideoModel";
import { DataItemSectionModel } from "../@shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "../@shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "../@shared/model/pages/detail/header/DetailHeaderModel";
import * as DateHelper from "../../../../helper/date/DateHelper";
import { getTMDBImage, getTrailer } from "../../../../helper/media/MediaHelper";
import DataItemModel from "../../common/data-item/DataItemModel";

const Poster = (episode: EpisodeResponse): ImageModel =>
    getTMDBImage(episode.still_path, episode.name);

const Backdrop = (episode: EpisodeResponse): ImageModel =>
    getTMDBImage(episode.still_path, episode.name);

const ContentHeader = (episode: EpisodeResponse): DetailContentHeaderModel => ({
    title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
});

const Description = (episode: EpisodeResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${episode.overview}`);

const Info = (episode: EpisodeResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Air date`, DateHelper.getFullMessage(episode.air_date)),
    ]
});

const Video = (videos: VideosResponse): VideoModel =>
    getTrailer(videos);

const Header = (episode: EpisodeResponse, videos: VideosResponse): DetailHeaderModel => ({
    poster: Poster(episode),
    backdrop: Backdrop(episode),
    header: ContentHeader(episode),
    description: Description(episode),
    info: Info(episode),
    video: Video(videos),
});

export default Header;