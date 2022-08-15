import SearchBarModel from "../../endpoints/model/components/SearchBarModel";

class SearchBarHelper {

  public static user = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search users...`,
      path: `/user/search/:query`
    })
  }

  public static movie = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search movies...`,
      path: `/movie/search/:query`
    })
  }

  public static show = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search shows...`,
      path: `/show/search/:query`
    })
  }

  public static people = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search people...`,
      path: `/person/search/:query`
    })
  }

}

export default SearchBarHelper;
