import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailWatchlistProps, WatchlistTabProps } from "../../endpoints/detail/model/DetailPageProps";
import { ListProps } from "../../model/watchlist/WatchListPageProps";
import UserModel from "../../repository/model/user/UserModel";
import WatchlistModel, { ListModel } from "../../repository/model/watch-list/WatchlistModel";
import WatchListRepository from "../../repository/watch-list/WatchListRepository";
import TMDB from "../../tmdb/TMDB";
import { getShowSuggestionCard } from "../card/CardHelper";

const transformToListProps = async (list: ListModel): Promise<ListProps> => {
    const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(getShowSuggestionCard),
    };
};

const transformToWatchlistTabProps = async (title: string, model: WatchlistModel): Promise<WatchlistTabProps> => {
    const lists = await Promise.all(model.lists.map(transformToListProps));
    return {
        title,
        lists,
    }
};

export const transformToWatchlistModel = (lists: ListProps[]): WatchlistModel => ({
    lists: lists.map(list => ({
        title: list.title,
        items: list.items.map(item => item.path.split("/")[2])
    }))
});

export const getWatchlistByUser = async (user: UserModel): Promise<DetailWatchlistProps> => {
    const tvShowWatchlist = await WatchListRepository.shows.getByUser(user.userName);
    const movieWatchlist = await WatchListRepository.movies.getByUser(user.userName);

    const tvShowWatchlistProps = await transformToWatchlistTabProps("TV Shows", tvShowWatchlist);
    const movieWatchlistProps = await transformToWatchlistTabProps("Movies", movieWatchlist);

    return {
        watchlists: [
            tvShowWatchlistProps,
            movieWatchlistProps
        ],
    };
};
