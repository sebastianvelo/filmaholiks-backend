import { SearchBarProps } from "../../model/SearchBarProps";

class SearchBarService {
  public static getMovieSearchbar = (): SearchBarProps => ({
    placeholder: `Search movies...`,
    path: `/movie/search/:query`
  });

  public static getShowSearchbar = (): SearchBarProps => ({
    placeholder: `Search shows...`,
    path: `/show/search/:query`
  });

  public static getPeopleSearchbar = (): SearchBarProps => ({
    placeholder: `Search people...`,
    path: `/person/search/:query`
  });
}

export default SearchBarService;
