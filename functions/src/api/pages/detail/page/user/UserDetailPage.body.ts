import * as WatchlistService from "@api/entities/watch-list/service/Watchlist.service";
import UserEntity from "@shared/entity/user/UserEntity";
import { CardsSectionModel } from "@shared/model/components/section/Section";
import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import MediaType from "@shared/types/MediaType";
import Header from "./UserDetailPage.header";

const Body = async (user: UserEntity, viewerUid?: string): Promise<DetailPageBodyModel> => {
  const watchlistsTE = await WatchlistService.getAllWatchlists(user.uid as MediaType, viewerUid)();
  const SectionsModel = (data: {}): CardsSectionModel[] => [];
  const watchlists = watchlistsTE._tag === 'Right' ? watchlistsTE.right : [];

  return {
    detail: Header(user),
    sections: SectionsModel({}),
    watchlists
  };
};

export default Body;