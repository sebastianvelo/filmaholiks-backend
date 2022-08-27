import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import UserEntity from "../../../entity/user/UserEntity";
import * as DetailHelper from "../../../helper/detail/DetailHelper";
import WatchlistService from "../../../service/WatchlistService";
import UserDetailSectionsModel from "../../section/detail/UserDetailSectionsModel";

const UserDetailPageBodyModel =  async (user: UserEntity): Promise<DetailPageBodyModel> => {
    const watchlists = await WatchlistService.getViewByUser(user.userName);
    return {
        detail: DetailHelper.getUser(user),
        sections: UserDetailSectionsModel({}),
        ...watchlists,
    };
};

export default UserDetailPageBodyModel;