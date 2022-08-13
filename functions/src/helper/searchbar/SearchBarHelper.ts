import { SearchBarProps } from "../../model/searchbar/SearchBarProps";

class SearchBarHelper {

  public static user = {
    getSearchbar: (): SearchBarProps => ({
      placeholder: `Search users...`,
      path: `/user/search/:query`
    })
  }

  public static movie = {
    getSearchbar: (): SearchBarProps => ({
      placeholder: `Search movies...`,
      path: `/movie/search/:query`
    })
  }

  public static show = {
    getSearchbar: (): SearchBarProps => ({
      placeholder: `Search shows...`,
      path: `/show/search/:query`
    })
  }

  public static people = {
    getSearchbar: (): SearchBarProps => ({
      placeholder: `Search people...`,
      path: `/person/search/:query`
    })
  }

}

export default SearchBarHelper;
