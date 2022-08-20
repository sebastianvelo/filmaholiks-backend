import { MoviesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../tmdb/TMDB";
import MediaType from "../common/MediaType";
import { getMovieHorizontalCard, getShowHorizontalCard } from "../helper/card/CardHelper";
import { getWatchlistTabModel } from "../helper/watch-list/WatchlistHelper";
import CardHorizontalModel from "../model/components/CardHorizontalModel";
import { WatchlistTabModel } from "../model/components/section/Section";
import { DetailWatchlistModel } from "../model/pages/detail/DetailPageModel";
import { ListEntity } from "../repository/entity/watch-list/WatchlistEntity";
import WatchlistRepository from "../repository/WatchlistRepository";

interface IWatchlistService {
  search: (query: string) => Promise<CardHorizontalModel[]>;
  getViewByUser: (userName: string) => Promise<WatchlistTabModel>;
  list: {
    saveAll: (userName: string, lists: ListEntity[]) => void;
    add: (userName: string, listTitle: string) => void;
    delete: (userName: string, listIdx: number) => void;
    swap: (userName: string, listIdx1: number, listIdx2: number) => void;
  },
  item: {
    save: (userName: string, listIdx: number, item: string) => void;
    swap: (userName: string, listIdx: number, itemIdx1: number, itemIdx2: number) => void;
    move: (userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number) => void;
    delete: (userName: string, listIdx: number, itemId: string) => void;
  },
}

class WatchlistService {

  public static getViewByUser = async (userName: string): Promise<DetailWatchlistModel> => {
    const tvShowWatchlistModel = await WatchlistService.show.getViewByUser(userName);
    const movieWatchlistModel = await WatchlistService.movie.getViewByUser(userName);

    return {
      watchlists: [
        tvShowWatchlistModel,
        // movieWatchlistModel
      ],
    };
  };

  public static presenter = {
    search: async (media: MediaType, query: string): Promise<CardHorizontalModel[]> =>
      WatchlistService[media].search(query),
    getViewByUser: async (media: MediaType, userName: string): Promise<WatchlistTabModel> =>
      WatchlistService[media].getViewByUser(userName),
    list: {
      saveAll: (media: MediaType, userName: string, lists: ListEntity[]): void => {
        WatchlistService[media].list.saveAll(userName, lists);
      },
      add: (media: MediaType, userName: string, listTitle: string): void => {
        WatchlistService[media].list.add(userName, listTitle);
      },
      delete: (media: MediaType, userName: string, listIdx: number): void => {
        WatchlistService[media].list.delete(userName, listIdx);
      },
      swap: (media: MediaType, userName: string, listIdx1: number, listIdx2: number): void => {
        WatchlistService[media].list.swap(userName, listIdx1, listIdx2);
      },
    },
    item: {
      save: (media: MediaType, userName: string, listIdx: number, item: string): void => {
        WatchlistService[media].item.save(userName, listIdx, item);
      },
      swap: (media: MediaType, userName: string, listIdx: number, itemIdx1: number, itemIdx2: number): void => {
        WatchlistService[media].item.swap(userName, listIdx, itemIdx1, itemIdx2);
      },
      move: (media: MediaType, userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): void => {
        WatchlistService[media].item.move(userName, sourceListIdx, targetListIdx, itemIdx);
      },
      delete: (media: MediaType, userName: string, listIdx: number, itemId: string): void => {
        WatchlistService[media].item.delete(userName, listIdx, itemId);
      },
    },
  }

  public static show: IWatchlistService = {
    search: async (query: string): Promise<CardHorizontalModel[]> => {
      const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
      const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));
      return detailedShows.map(getShowHorizontalCard);
    },
    getViewByUser: async (userName: string): Promise<WatchlistTabModel> => {

      const tvShowWatchlist = await WatchlistRepository.show.list.getByUser(userName);
      return getWatchlistTabModel("TV Shows", tvShowWatchlist);
    },
    list: {
      saveAll: (userName: string, lists: ListEntity[]): void => {
        WatchlistRepository.show.list.saveAll(userName, { lists });
      },
      add: (userName: string, listTitle: string): void => {
        WatchlistRepository.show.list.add(userName, listTitle);
      },
      delete: (userName: string, listIdx: number): void => {
        WatchlistRepository.show.list.delete(userName, listIdx);
      },
      swap: (userName: string, listIdx1: number, listIdx2: number): void => {
        WatchlistRepository.show.list.swap(userName, listIdx1, listIdx2);
      },
    },
    item: {
      save: (userName: string, listIdx: number, item: string): void => {
        WatchlistRepository.show.item.save(userName, listIdx, item);
      },
      swap: (userName: string, listIdx: number, itemIdx1: number, itemIdx2: number): void => {
        WatchlistRepository.show.item.swap(userName, listIdx, itemIdx1, itemIdx2);
      },
      move: (userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): void => {
        WatchlistRepository.show.item.move(userName, sourceListIdx, targetListIdx, itemIdx);
      },
      delete: (userName: string, listIdx: number, itemId: string): void => {
        WatchlistRepository.show.item.delete(userName, listIdx, itemId);
      },
    },
  }

  public static movie: IWatchlistService = {
    search: async (query: string): Promise<CardHorizontalModel[]> => {
      const movies: MoviesResponse = await TMDB.search.getMovies({ query });
      const detailedMovies = await Promise.all(movies.results.map(async (movie) => TMDB.movie.getDetails(movie.id ?? 0)));

      return detailedMovies.map(getMovieHorizontalCard);
    },
    getViewByUser: async (userName: string): Promise<WatchlistTabModel> => {
      const movieWatchlist = await WatchlistRepository.movie.list.getByUser(userName);
      return getWatchlistTabModel("Movies", movieWatchlist);
    },
    list: {
      saveAll: (userName: string, lists: ListEntity[]): void => {
        WatchlistRepository.movie.list.saveAll(userName, { lists });
      },
      add: (userName: string, listTitle: string): void => {
        WatchlistRepository.movie.list.add(userName, listTitle);
      },
      delete: (userName: string, listIdx: number): void => {
        WatchlistRepository.movie.list.delete(userName, listIdx);
      },
      swap: (userName: string, listIdx1: number, listIdx2: number): void => {
        WatchlistRepository.movie.list.swap(userName, listIdx1, listIdx2);
      },
    },
    item: {
      save: (userName: string, listIdx: number, item: string): void => {
        WatchlistRepository.movie.item.save(userName, listIdx, item);
      },
      swap: (userName: string, listIdx: number, itemIdx1: number, itemIdx2: number): void => {
        WatchlistRepository.movie.item.swap(userName, listIdx, itemIdx1, itemIdx2);
      },
      move: (userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): void => {
        WatchlistRepository.movie.item.move(userName, sourceListIdx, targetListIdx, itemIdx);
      },
      delete: (userName: string, listIdx: number, itemId: string): void => {
        WatchlistRepository.movie.item.delete(userName, listIdx, itemId);
      },
    },
  }
}

export default WatchlistService;
