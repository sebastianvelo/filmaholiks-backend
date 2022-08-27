import SearchBarModel from "../../../shared/model/components/SearchBarModel";
import PageRoute from "../../../shared/routes/PageRoute";

class SearchBarHelper {

  public static user = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search users...`,
      path: PageRoute.USER_SEARCH
    })
  }

  public static movie = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search movies...`,
      path: PageRoute.MOVIE_SEARCH
    })
  }

  public static show = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search shows...`,
      path: PageRoute.SHOW_SEARCH
    })
  }

  public static people = {
    getSearchbar: (): SearchBarModel => ({
      placeholder: `Search people...`,
      path: PageRoute.PERSON_SEARCH
    })
  }

}

export default SearchBarHelper;
