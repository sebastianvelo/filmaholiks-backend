import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import UserEntity from "../../../entity/user/UserEntity";
import * as DetailHelper from "../../../helper/detail/DetailHelper";
import SectionHelper from "../../../helper/section/SectionHelper";
import WatchlistService from "../../../service/WatchlistService";

const UserDetailPageBodyModel =  async (user: UserEntity): Promise<DetailPageBodyModel> => {
    const watchlists = await WatchlistService.getViewByUser(user.userName);
    return {
        detail: DetailHelper.getUser(user),
        sections: SectionHelper.user.getDetail({}),
        ...watchlists,
    };
};

export default UserDetailPageBodyModel;