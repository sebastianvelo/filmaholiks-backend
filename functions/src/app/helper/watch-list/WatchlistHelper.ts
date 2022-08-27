import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { WatchlistTabModel } from "../../../shared/model/components/section/Section";
import { ListModel } from "../../../shared/model/components/WatchlistModel";
import MediaType from "../../../shared/types/MediaType";
import TMDB from "../../../tmdb/TMDB";
import WatchlistEntity, { ListEntity } from "../../entity/watch-list/WatchlistEntity";
import MovieCardHorizontalModel from "../../model/card/horizontal/MovieCardHorizontalModel";
import ShowCardHorizontalModel from "../../model/card/horizontal/ShowCardHorizontalModel";

export const getShowListModel = async (list: ListEntity): Promise<ListModel> => {
    const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(ShowCardHorizontalModel),
    };
};

export const getMovieListModel = async (list: ListEntity): Promise<ListModel> => {
    const items: Movie[] = await Promise.all(list.items.map(async (item) => TMDB.movie.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(MovieCardHorizontalModel),
    };
};

const getListModel = {
    [MediaType.SHOW]: getShowListModel,
    [MediaType.MOVIE]: getMovieListModel,
}

export const getWatchlistTabModel = async (title: string, model: WatchlistEntity, mediaType: MediaType): Promise<WatchlistTabModel> => {
    const lists =  await Promise.all(model.lists.map(getListModel[mediaType]));
    return {
        title,
        lists,
        mediaType,
        dynamic: false
    }
};

export const getWatchlistEntity = (lists: ListModel[]): WatchlistEntity => ({
    lists: lists.map((list, idx) => ({
        order: idx,
        title: list.title,
        items: list.items.map(item => String(item.id))
    }))
});
