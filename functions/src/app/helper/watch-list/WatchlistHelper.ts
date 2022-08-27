import { ListModel } from "../../../shared/model/components/WatchlistModel";
import WatchlistEntity from "../../entity/watch-list/WatchlistEntity";

export const getWatchlistEntity = (lists: ListModel[]): WatchlistEntity => ({
    lists: lists.map((list, idx) => ({
        order: idx,
        title: list.title,
        items: list.items.map(item => String(item.id))
    }))
});
