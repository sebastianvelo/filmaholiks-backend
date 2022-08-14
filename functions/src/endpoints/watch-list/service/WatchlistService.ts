import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import CardHelper from "../../../helper/card/CardHelper";
import WatchlistHelper from "../../../helper/watch-list/WatchlistHelper";
import { ItemProps, ListProps } from "../../../model/watchlist/WatchListPageProps";
import WatchListRepository from "../../../repository/watch-list/WatchListRepository";
import TMDB from "../../../tmdb/TMDB";

class WatchlistService {
  public static saveShowsWatchlist = (userName: string, lists: ListProps[]): void => {
    WatchListRepository.shows.save(userName, WatchlistHelper.transformToWatchlistModel(lists));
  }

  public static showsSuggestions = async (query: string): Promise<ItemProps[]> => {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));

    return detailedShows.map(CardHelper.getShowSuggestionCard);
  }

}

export default WatchlistService;
