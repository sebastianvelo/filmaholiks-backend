import SearchBarModel from "@shared/model/components/SearchBarModel";
import PageRoute from "@shared/routes/PageRoute";

const SearchBar = (): SearchBarModel => ({
  placeholder: `Search shows...`,
  path: PageRoute.SHOW_SEARCH
});


export default SearchBar;