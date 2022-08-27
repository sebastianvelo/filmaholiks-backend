import { Movie } from "tmdb-js/lib/api/model/film/Film";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { WatchlistTabModel } from "../../../shared/model/components/section/Section";
import { ListModel as IListModel } from "../../../shared/model/components/WatchlistModel";
import MediaType from "../../../shared/types/MediaType";
import TMDB from "../../../tmdb/TMDB";
import WatchlistEntity, { ListEntity } from "../../entity/watch-list/WatchlistEntity";
import MovieCardHorizontalModel from "../card/horizontal/MovieCardHorizontalModel";
import ShowCardHorizontalModel from "../card/horizontal/ShowCardHorizontalModel";

export const ShowListModel = async (list: ListEntity): Promise<IListModel> => {
    const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));

    return {
        title: list.title,
        order: list.order,
        items: items.map(ShowCardHorizontalModel),
    };
};

export const MovieListModel = async (list: ListEntity): Promise<IListModel> => {
    const items: Movie[] = await Promise.all(list.items.map(async (item) => TMDB.movie.getDetails(Number(item))));

    return {
        title: list.title,
        order: list.order,
        items: items.map(MovieCardHorizontalModel),
    };
};

const getListModel = {
    [MediaType.SHOW]: ShowListModel,
    [MediaType.MOVIE]: MovieListModel,
};

export const ListModel = async (mediaType: MediaType, list: ListEntity): Promise<IListModel> =>
    getListModel[mediaType](list);

export const ListsModel = async (mediaType: MediaType, entity: WatchlistEntity): Promise<IListModel[]> =>
    Promise.all(entity.lists.map(getListModel[mediaType]));

export const WatchlistModel = async (title: string, entity: WatchlistEntity, mediaType: MediaType): Promise<WatchlistTabModel> => {
    const lists = await Promise.all(entity.lists.map(getListModel[mediaType]));

    return {
        title,
        lists,
        mediaType,
        dynamic: false
    }
};
