import { MoviesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import ActionableCardModel from "../../shared/model/components/ActionableCardModel";
import { WatchlistTabModel } from "../../shared/model/components/section/Section";
import { DetailWatchlistModel } from "../../shared/model/pages/detail/DetailPageModel";
import MediaType from "../../shared/types/MediaType";
import TMDB from "../../tmdb/TMDB";
import { ListEntity } from "../entity/watch-list/WatchlistEntity";
import { WatchlistModel } from "../model/watch-list/WatchlistModel";
import MovieActionableCardModel from "../model/actionable-card/MovieActionableCardModel";
import ShowActionableCardModel from "../model/actionable-card/ShowActionableCardModel";
import WatchlistRepository from "../repository/WatchlistRepository";

interface IWatchlistService {
  search: (userName: string, query: string) => Promise<ActionableCardModel[]>;
  getViewByUser: (userName: string) => Promise<WatchlistTabModel>;
}

class WatchlistService {

  public static getViewByUser = async (userName: string): Promise<DetailWatchlistModel> => {
    const tvShowWatchlistModel = await WatchlistService.show.getViewByUser(userName);
    const movieWatchlistModel = await WatchlistService.movie.getViewByUser(userName);

    return {
      watchlists: [
        tvShowWatchlistModel,
        movieWatchlistModel
      ],
    };
  };

  public static presenter = {
    search: async (media: MediaType, userName: string, query: string): Promise<ActionableCardModel[]> =>
      WatchlistService[media].search(userName, query),
    getViewByUser: async (media: MediaType, userName: string): Promise<WatchlistTabModel> =>
      WatchlistService[media].getViewByUser(userName),
    list: {
      saveAll: (media: MediaType, userName: string, lists: ListEntity[]): void => {
        WatchlistRepository[media].list.saveAll(userName, { lists });
      },
      add: (media: MediaType, userName: string, listTitle: string): void => {
        WatchlistRepository[media].list.add(userName, listTitle);
      },
      delete: (media: MediaType, userName: string, listIdx: number): void => {
        WatchlistRepository[media].list.delete(userName, listIdx);
      },
      swap: (media: MediaType, userName: string, listIdx1: number, listIdx2: number): void => {
        WatchlistRepository[media].list.swap(userName, listIdx1, listIdx2);
      },
    },
    item: {
      save: (media: MediaType, userName: string, listIdx: number, item: string): void => {
        WatchlistRepository[media].item.save(userName, listIdx, item);
      },
      swap: (media: MediaType, userName: string, listIdx: number, itemIdx1: number, itemIdx2: number): void => {
        WatchlistRepository[media].item.swap(userName, listIdx, itemIdx1, itemIdx2);
      },
      move: (media: MediaType, userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): void => {
        WatchlistRepository[media].item.move(userName, sourceListIdx, targetListIdx, itemIdx);
      },
      delete: (media: MediaType, userName: string, listIdx: number, itemId: string): void => {
        WatchlistRepository[media].item.delete(userName, listIdx, itemId);
      },
    },
  };

  public static show: IWatchlistService = {
    search: async (userName: string, query: string): Promise<ActionableCardModel[]> => {
      const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
      const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));
      return Promise.all(detailedShows.map(async (show) => {
        const exists = await WatchlistRepository.show.item.exists(userName, String(show.id));
        return ShowActionableCardModel(show, exists);
      }));
    },
    getViewByUser: async (userName: string): Promise<WatchlistTabModel> => {
      const tvShowWatchlist = await WatchlistRepository.show.list.getByUser(userName);
      return WatchlistModel("TV Shows", tvShowWatchlist, MediaType.SHOW);
    },
  };

  public static movie: IWatchlistService = {
    search: async (userName: string, query: string): Promise<ActionableCardModel[]> => {
      const movies: MoviesResponse = await TMDB.search.getMovies({ query });
      const detailedMovies = await Promise.all(movies.results.map(async (movie) => TMDB.movie.getDetails(movie.id ?? 0)));
      return Promise.all(detailedMovies.map(async (movie) => {
        const exists = await WatchlistRepository.movie.item.exists(userName, String(movie.id));
        return MovieActionableCardModel(movie, exists);
      }));
    },
    getViewByUser: async (userName: string): Promise<WatchlistTabModel> => {
      const movieWatchlist = await WatchlistRepository.movie.list.getByUser(userName);
      return WatchlistModel("Movies", movieWatchlist, MediaType.MOVIE);
    },
  };
}

export default WatchlistService;
