import SearchBarModel from "../../../shared/model/components/SearchBarModel";
import PageRoute from "../../../shared/routes/PageRoute";

const ShowSearchBarModel = (): SearchBarModel => ({
    placeholder: `Search shpws...`,
    path: PageRoute.SHOW_SEARCH
});

export default ShowSearchBarModel;