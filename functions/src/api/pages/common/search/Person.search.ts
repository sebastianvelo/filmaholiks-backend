import SearchBarModel from "shared/model/components/SearchBarModel";
import PageRoute from "shared/routes/PageRoute";

const SearchBar = (): SearchBarModel => ({
    placeholder: `Search people...`,
    path: PageRoute.PERSON_SEARCH
});

export default SearchBar;