import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import TMDB from "../../../tmdb/TMDB";
import MediaType from "../../common/MediaType";
import { WatchlistTabModel } from "../../model/components/section/Section";
import { ListModel } from "../../model/components/WatchlistModel";
import WatchlistEntity, { ListEntity } from "../../repository/entity/watch-list/WatchlistEntity";
import { getMoviCardHorizontal, getShowCardHorizontal } from "../card/CardHelper";

export const getShowListModel = async (list: ListEntity): Promise<ListModel> => {
    const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(getShowCardHorizontal),
        dynamic: false,
    };
};

export const getMovieListModel = async (list: ListEntity): Promise<ListModel> => {
    const items: Movie[] = await Promise.all(list.items.map(async (item) => TMDB.movie.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(getMoviCardHorizontal),
        dynamic: false,
    };
};

const getListModel = {
    "show": getShowListModel,
    "movie": getMovieListModel,
}

export const getWatchlistTabModel = async (title: string, model: WatchlistEntity, mediaType: MediaType): Promise<WatchlistTabModel> => {
    const lists =  await Promise.all(model.lists.map(getListModel[mediaType]));
    return {
        title,
        lists,
        mediaType
    }
};

export const getWatchlistEntity = (lists: ListModel[]): WatchlistEntity => ({
    lists: lists.map((list, idx) => ({
        order: idx,
        title: list.title,
        items: list.items.map(item => String(item.id))
    }))
});
