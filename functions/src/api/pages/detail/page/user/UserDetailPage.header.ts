import { getImage } from "@api/helper/media/MediaHelper";
import DataItemModel from "@api/pages/detail/common/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import UserEntity from "@shared/entity/user/UserEntity";
import ImageModel from "@shared/model/atom/ImageModel";
import { DataItemSectionModel } from "@shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "@shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "@shared/model/pages/detail/header/DetailHeaderModel";

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

const Header = (user: UserEntity): DetailHeaderModel => ({
  poster: Poster(user),
  header: ContentHeader(user),
  description: Description(user),
  info: Info(user),
});

export default Header;
