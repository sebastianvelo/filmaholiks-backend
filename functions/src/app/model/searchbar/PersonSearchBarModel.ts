import SearchBarModel from "../../../shared/model/components/SearchBarModel";
import PageRoute from "../../../shared/routes/PageRoute";

const PersonSearchBarModel = (): SearchBarModel => ({
    placeholder: `Search people...`,
    path: PageRoute.PERSON_SEARCH
});

export default PersonSearchBarModel;