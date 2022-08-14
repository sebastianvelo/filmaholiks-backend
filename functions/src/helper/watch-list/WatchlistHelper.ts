import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import UserModel from "../../repository/model/user/UserModel";
import WatchlistModel, { ListModel } from "../../repository/model/watch-list/WatchlistModel";
import { DetailWatchlistProps } from "../../endpoints/detail/model/DetailPageProps";
import { ListProps } from "../../model/watchlist/WatchListPageProps";
import WatchListRepository from "../../repository/watch-list/WatchListRepository";
import TMDB from "../../tmdb/TMDB";
import CardHelper from "../card/CardHelper";

class WatchlistHelper {
    public static getByUser = async (user: UserModel): Promise<DetailWatchlistProps> => {
        const tvShowWatchlist = await WatchListRepository.shows.getByUser(user.userName);
        const movieWatchlist = await WatchListRepository.movies.getByUser(user.userName);

        const tvShowWatchlistProps = await WatchlistHelper.transformToProps(tvShowWatchlist);
        const movieWatchlistProps = await WatchlistHelper.transformToProps(movieWatchlist);
        return {
            watchlists: [
                {
                    title: "TV Shows",
                    lists: tvShowWatchlistProps
                },
                {
                    title: "Movies",
                    lists: movieWatchlistProps
                },
            ],
        };
    };


    public static transformList = async (list: ListModel): Promise<ListProps> => {
        const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));
        return {
            title: list.title,
            items: items.map(CardHelper.getShowSuggestionCard),
        };
    }

    public static transformToProps = async (model: WatchlistModel): Promise<ListProps[]> =>
        Promise.all(model.lists.map(async (list) => WatchlistHelper.transformList(list)));

    public static transformToModel = (lists: ListProps[]): WatchlistModel => ({
        lists: lists.map(list => ({
            title: list.title,
            items: list.items.map(item => item.path.split("/")[2])
        }))
    });
}

export default WatchlistHelper;