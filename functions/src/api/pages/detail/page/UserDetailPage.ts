import WatchlistService from "@api/entities/watch-list/WatchlistService";
import { getImage } from "@api/helper/media/MediaHelper";
import DataItemModel from "@api/model/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import * as TitleHelper from "@helper/title/TitleHelper";
import UserEntity from "shared/entity/user/UserEntity";
import ImageModel from "shared/model/atom/ImageModel";
import SearchBarModel from "shared/model/components/SearchBarModel";
import { CardsSectionModel, DataItemSectionModel } from "shared/model/components/section/Section";
import DetailPageModel, { DetailPageBodyModel } from "shared/model/pages/detail/DetailPageModel";
import { DetailContentHeaderModel, DetailContentInfoModel } from "shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "shared/model/pages/detail/header/DetailHeaderModel";
import PageRoute from "shared/routes/PageRoute";

const HeaderModel = (user: UserEntity): DetailHeaderModel => {
  const Poster = (user: UserEntity): ImageModel => getImage(user.avatar, user.name);

  const ContentHeader = (user: UserEntity): DetailContentHeaderModel => ({
    title: `${user.userName}`
  });

  const Description = (user: UserEntity): DataItemSectionModel | undefined =>
    DataItemModel(`About`, `${user.about}`);

  const Info = (user: UserEntity): DetailContentInfoModel => ({
    data: [
      // DataItemModel(`Name`, user.name),
      // DataItemModel(`E-Mail`, user.email),
      DataItemModel(`Filmaholik since`, DateHelper.toString(user.registered)),
    ]
  });

  return {
    poster: Poster(user),
    header: ContentHeader(user),
    description: Description(user),
    info: Info(user),
  }
};

//-----------------------

const SectionsModel = (data: {}): CardsSectionModel[] => [];

//-----------------------

const SearchBarModel = (): SearchBarModel => ({
  placeholder: `Search users...`,
  path: PageRoute.USER_SEARCH,
  hide: true
});
//-----------------------


const BodyModel = async (user: UserEntity, viewerUid?: string): Promise<DetailPageBodyModel> => {
  const watchlists = await WatchlistService.getViewByUser(user.uid, viewerUid);
  return {
    detail: HeaderModel(user),
    sections: SectionsModel({}),
    ...watchlists,
  };
};

const UserDetailPage = async ({ user, viewerUid }: { user: UserEntity, viewerUid?: string }): Promise<DetailPageModel> => {
  const body = await BodyModel(user, viewerUid);

  return {
    title: TitleHelper.user.getDetail(user.userName),
    searchbar: SearchBarModel(),
    body
  };
}

export default UserDetailPage;
