import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import UserEntity from "../../../entity/user/UserEntity";
import WatchlistService from "../../../service/WatchlistService";
import UserDetailModel from "../../detail/UserDetailModel";
import UserDetailSectionsModel from "../../section/detail/UserDetailSectionsModel";

const UserDetailPageBodyModel = async (user: UserEntity, userLoggedIn?: string): Promise<DetailPageBodyModel> => {
    const watchlists = await WatchlistService.getViewByUser(user.userName, userLoggedIn);
    return {
        detail: UserDetailModel(user),
        sections: UserDetailSectionsModel({}),
        ...watchlists,
    };
};

export default UserDetailPageBodyModel;