import SearchBarModel from "../../../../shared/model/components/SearchBarModel";
import PageRoute from "../../../../shared/routes/PageRoute";

const SearchBar = (): SearchBarModel => ({
    placeholder: `Search movies...`,
    path: PageRoute.MOVIE_SEARCH
});

export default SearchBar;