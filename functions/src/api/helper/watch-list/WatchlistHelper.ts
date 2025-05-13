import { ListModel } from "@shared/model/components/WatchlistModel";
import WatchlistEntity from "@shared/entity/watch-list/WatchlistEntity";

const getWatchlistEntity = (lists: ListModel[]): WatchlistEntity => ({
    lists: lists.map((list, idx) => ({
        order: idx,
        title: list.title,
        items: list.items.map(item => String(item.id))
    })) 
});

export default getWatchlistEntity;