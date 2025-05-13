import * as TitleHelper from "@helper/title/TitleHelper";
import UserEntity from "@shared/entity/user/UserEntity";
import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import Body from "./UserDetailPage.body";
import SearchBar from "../../../common/search/User.search";

const UserDetailPage = async ({ user, viewerUid }: { user: UserEntity, viewerUid?: string }): Promise<DetailPageModel> => {
  const body = await Body(user, viewerUid);

  return {
    title: TitleHelper.user.getDetail(user.userName),
    searchbar: SearchBar(),
    body
  };
}

export default UserDetailPage;
