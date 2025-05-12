import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import UserEntity from "../../../../shared/entity/user/UserEntity";
import WatchlistService from "../../../service/WatchlistService";
import UserDetailModel from "../../detail/UserDetailModel";
import UserDetailSectionsModel from "../../section/detail/UserDetailSectionsModel";

const UserDetailPageBodyModel = async (user: UserEntity, viewerUid?: string): Promise<DetailPageBodyModel> => {
    const watchlists = await WatchlistService.getViewByUser(user.uid, viewerUid);
    return {
        detail: UserDetailModel(user),
        sections: UserDetailSectionsModel({}),
        ...watchlists,
    };
};

export default UserDetailPageBodyModel;