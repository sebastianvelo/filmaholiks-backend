import WatchlistService from "@api/entities/watch-list/WatchlistService";
import UserEntity from "@shared/entity/user/UserEntity";
import { CardsSectionModel } from "@shared/model/components/section/Section";
import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import Header from "./UserDetailPage.header";

const Body = async (user: UserEntity, viewerUid?: string): Promise<DetailPageBodyModel> => {
  const watchlists = await WatchlistService.getViewByUser(user.uid, viewerUid);
  const SectionsModel = (data: {}): CardsSectionModel[] => [];

  return {
    detail: Header(user),
    sections: SectionsModel({}),
    ...watchlists,
  };
};

export default Body;