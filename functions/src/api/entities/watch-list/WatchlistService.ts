import { MoviesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ListEntity } from "../../../shared/entity/watch-list/WatchlistEntity";
import ActionableCardModel from "../../../shared/model/components/ActionableCardModel";
import { WatchlistTabModel } from "../../../shared/model/components/section/Section";
import { ListModel as IListModel } from "../../../shared/model/components/WatchlistModel";
import { DetailWatchlistModel } from "../../../shared/model/pages/detail/DetailPageModel";
import MediaType from "../../../shared/types/MediaType";
import TMDB from "../../../tmdb/TMDB";
import WatchlistRepository from "../../entities/watch-list/WatchListRepository";
import MovieActionableCardModel from "../../pages/common/actionable-card/MovieActionableCardModel";
import ShowActionableCardModel from "../../pages/common/actionable-card/ShowActionableCardModel";
import { ListModel, ListsModel, WatchlistModel } from "../../pages/common/watch-list/WatchlistModel";

interface IWatchlistService {
  search: (uid: string, query: string) => Promise<ActionableCardModel[]>;
  getViewByUser: (uid: string, viewerUid?: string) => Promise<WatchlistTabModel>;
}

class WatchlistService {

  public static getViewByUser = async (uid: string, viewerUid?: string): Promise<DetailWatchlistModel> => {
    const tvShowWatchlistModel = await WatchlistService.show.getViewByUser(uid, viewerUid);
    const movieWatchlistModel = await WatchlistService.movie.getViewByUser(uid, viewerUid);

    return {
      watchlists: [
        tvShowWatchlistModel,
        movieWatchlistModel
      ],
    };
  };

  public static presenter = {
    search: async (media: MediaType, uid: string, query: string): Promise<ActionableCardModel[]> =>
      WatchlistService[media].search(uid, query),
    getViewByUser: async (media: MediaType, uid: string, viewerUid?: string): Promise<WatchlistTabModel> =>
      WatchlistService[media].getViewByUser(uid, viewerUid),
    list: {
      saveAll: (media: MediaType, uid: string, lists: ListEntity[]): void => {
        WatchlistRepository[media].list.saveAll(uid, { lists });
      },
      add: (media: MediaType, uid: string, listTitle: string): void => {
        WatchlistRepository[media].list.add(uid, listTitle);
      },
      delete: (media: MediaType, uid: string, listIdx: number): void => {
        WatchlistRepository[media].list.delete(uid, listIdx);
      },
      swap: (media: MediaType, uid: string, listIdx1: number, listIdx2: number): void => {
        WatchlistRepository[media].list.swap(uid, listIdx1, listIdx2);
      },
      changeTitle: (media: MediaType, uid: string, listIdx: number, title: string): void => {
        WatchlistRepository[media].list.update(uid, listIdx, title);
      },
      getByItem: async (media: MediaType, uid: string, itemId: number): Promise<IListModel | undefined> => {
        const list = await WatchlistRepository[media].list.getByItem(uid, itemId);
        return list && ListModel(media, list);
      },
      getByUser: async (media: MediaType, uid: string): Promise<IListModel[] | undefined> =>
        ListsModel(media, await WatchlistRepository[media].list.getByUser(uid)),
    },
    item: {
      save: (media: MediaType, uid: string, listIdx: number, item: string): void => {
        WatchlistRepository[media].item.save(uid, listIdx, item);
      },
      swap: (media: MediaType, uid: string, listIdx: number, itemIdx1: number, itemIdx2: number): void => {
        WatchlistRepository[media].item.swap(uid, listIdx, itemIdx1, itemIdx2);
      },
      move: (media: MediaType, uid: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): void => {
        WatchlistRepository[media].item.move(uid, sourceListIdx, targetListIdx, itemIdx);
      },
      delete: (media: MediaType, uid: string, listIdx: number, itemId: string): void => {
        WatchlistRepository[media].item.delete(uid, listIdx, itemId);
      },
    },
  };

  public static show: IWatchlistService = {
    search: async (uid: string, query: string): Promise<ActionableCardModel[]> => {
      const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });
      const detailedShows = await Promise.all(shows.results.map(async (show) => TMDB.tvShow.getDetails(show.id ?? 0)));
      return Promise.all(detailedShows.map(async (show) => {
        const exists = await WatchlistRepository.show.item.exists(uid, String(show.id));
        return ShowActionableCardModel(show, exists);
      }));
    },
    getViewByUser: async (uid: string, viewerUid?: string): Promise<WatchlistTabModel> => {
      const tvShowWatchlist = await WatchlistRepository.show.list.getByUser(uid);
      return WatchlistModel("TV Shows", tvShowWatchlist, MediaType.SHOW, uid === viewerUid);
    },
  };

  public static movie: IWatchlistService = {
    search: async (uid: string, query: string): Promise<ActionableCardModel[]> => {
      const movies: MoviesResponse = await TMDB.search.getMovies({ query });
      const detailedMovies = await Promise.all(movies.results.map(async (movie) => TMDB.movie.getDetails(movie.id ?? 0)));
      return Promise.all(detailedMovies.map(async (movie) => {
        const exists = await WatchlistRepository.movie.item.exists(uid, String(movie.id));
        return MovieActionableCardModel(movie, exists);
      }));
    },
    getViewByUser: async (uid: string, viewerUid?: string): Promise<WatchlistTabModel> => {
      const movieWatchlist = await WatchlistRepository.movie.list.getByUser(uid);
      return WatchlistModel("Movies", movieWatchlist, MediaType.MOVIE, uid === viewerUid);
    },
  };
}

export default WatchlistService;
