export interface ListModel {
    title?: string;
    items: string[];
}

interface WatchlistModel {
    lists: ListModel[];
}

export const WatchlistModelEmpty: WatchlistModel = {
    lists: []
};

export default WatchlistModel;