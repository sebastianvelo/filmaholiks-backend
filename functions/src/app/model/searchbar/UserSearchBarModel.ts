import SearchBarModel from "../../../shared/model/components/SearchBarModel";
import PageRoute from "../../../shared/routes/PageRoute";

const UserSearchBarModel = (): SearchBarModel => ({
    placeholder: `Search users...`,
    path: PageRoute.USER_SEARCH
});

export default UserSearchBarModel;