import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import TMDB from "../../../tmdb/TMDB";
import { WatchlistTabModel } from "../../model/components/section/Section";
import { ListModel } from "../../model/components/WatchlistModel";
import WatchlistEntity, { ListEntity } from "../../repository/entity/watch-list/WatchlistEntity";
import { getShowHorizontalCard } from "../card/CardHelper";

export const getListModel = async (list: ListEntity): Promise<ListModel> => {
    const items: TVShowResponse[] = await Promise.all(list.items.map(async (item) => TMDB.tvShow.getDetails(Number(item))));
    return {
        title: list.title,
        items: items.map(getShowHorizontalCard),
        dynamic: false,
    };
};

export const getWatchlistTabModel = async (title: string, model: WatchlistEntity): Promise<WatchlistTabModel> => {
    const lists = await Promise.all(model.lists.map(getListModel));
    return {
        title,
        lists,
    }
};

export const getWatchlistEntity = (lists: ListModel[]): WatchlistEntity => ({
    lists: lists.map((list, idx) => ({
        order: idx,
        title: list.title,
        items: list.items.map(item => String(item.id))
    }))
});
