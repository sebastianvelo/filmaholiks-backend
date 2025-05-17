import WatchlistService from "@api/entities/watch-list/Watchlist.service";
import { getTMDBImage, getTrailer } from "@api/helper/media/MediaHelper";
import ShowCardHorizontalModel from "@api/pages/common/card/horizontal/ShowCardHorizontalModel";
import DataItemModel from "@api/pages/detail/common/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import ImageModel from "@shared/model/atom/ImageModel";
import VideoModel from "@shared/model/atom/VideoModel";
import { DataItemSectionModel } from "@shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "@shared/model/pages/detail/header/DetailContentModel";
import { DetailActionsModel, DetailHeaderModel, WatchlistButtonModel } from "@shared/model/pages/detail/header/DetailHeaderModel";
import MediaType from "@shared/types/MediaType";
import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

const WatchlistButton = async (show: TVShowResponse, uid: string): Promise<WatchlistButtonModel> => {
  const list = await WatchlistService.presenter.list.getByItem(MediaType.SHOW, uid, Number(show.id));
  const lists = await WatchlistService.presenter.list.getByUser(MediaType.SHOW, uid);

  return {
    ...ShowCardHorizontalModel(show),
    list,
    lists,
    mediaType: MediaType.SHOW
  };
};

const Actions = async (show: TVShowResponse, viewerUid?: string): Promise<DetailActionsModel> => {
  const watchlistButton = viewerUid ? await WatchlistButton(show, viewerUid) : undefined;

  return {
    watchlistButton
  };
};

const Poster = (show: TVShowResponse): ImageModel => getTMDBImage(show.poster_path, show.original_name);

const Backdrop = (show: TVShowResponse): ImageModel => getTMDBImage(show.backdrop_path, show.original_name);

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

const Video = (videos: VideosResponse): VideoModel => getTrailer(videos);

const Header = async (show: TVShowResponse, videos: VideosResponse, viewerUid?: string): Promise<DetailHeaderModel> => {
  const actions = await Actions(show, viewerUid);

  return {
    poster: Poster(show),
    backdrop: Backdrop(show),
    header: ContentHeader(show),
    description: Description(show),
    info: Info(show),
    video: Video(videos),
    actions
  };
};

export default Header;