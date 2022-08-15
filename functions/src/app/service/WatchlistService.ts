import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { getShowSuggestionCard } from "../helper/card/CardHelper";
import { transformToWatchlistModel } from "../helper/watch-list/WatchlistHelper";
import WatchListRepository from "../repository/WatchListRepository";
import TMDB from "../../tmdb/TMDB";
import CardHorizontalModel from "../model/components/CardHorizontalModel";
import { ListModel } from "../model/components/WatchlistModel";

class WatchlistService {
  public static saveShowsWatchlist = (userName: string, lists: ListModel[]): void => {
    WatchListRepository.shows.save(userName, transformToWatchlistModel(lists));
  }

  public static showsSuggestions = async (query: string): Promise<CardHorizontalModel[]> => {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
    const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));

    return detailedShows.map(getShowSuggestionCard);
  }

}

export default WatchlistService;
