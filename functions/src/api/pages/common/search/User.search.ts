import SearchBarModel from "@shared/model/components/SearchBarModel";
import PageRoute from "@shared/routes/PageRoute";

const SearchBar = (): SearchBarModel => ({
  placeholder: `Search users...`,
  path: PageRoute.USER_SEARCH,
  hide: true
});

export default SearchBar;
