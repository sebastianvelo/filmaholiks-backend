import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import CardHelper from "../../common/helper/card/CardHelper";
import { ItemProps, WatchListPageProps } from "../model/WatchListPageProps";

const resp = (user: string) => ({
  columns: [
    { "title": "Plan to watch", "items": [] },
    { "title": "On hold", "items": [] },
    { "title": "Currently watching", "items": [] },
    { "title": "Completed", "items": [] },
    { "title": "Dropped", "items": [] }
  ]
});

class WatchListPageService {
  public static async shows(user: string): Promise<WatchListPageProps> {
    return resp(user);
  }

  public static async movies(user: string): Promise<WatchListPageProps> {
    return resp(user);
  }

  public static async showsSuggestions(query: string): Promise<ItemProps[]> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));

    return detailedShows.map(CardHelper.getShowSuggestionCard);
  }
}

export default WatchListPageService;
