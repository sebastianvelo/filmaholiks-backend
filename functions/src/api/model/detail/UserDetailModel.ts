import ImageModel from "../../../shared/model/atom/ImageModel";
import { DataItemSectionModel } from "../../../shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "../../../shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "../../../shared/model/pages/detail/header/DetailHeaderModel";
import UserEntity from "../../../shared/entity/user/UserEntity";
import { getImage } from "../../helper/media/MediaHelper";
import DataItemModel from "../data-item/DataItemModel";
import * as DateHelper from "../../helper/date/DateHelper";

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

const UserDetailModel = (user: UserEntity): DetailHeaderModel => ({
    poster: Poster(user),
    header: ContentHeader(user),
    description: Description(user),
    info: Info(user),
});

export default UserDetailModel;