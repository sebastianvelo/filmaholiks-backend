export interface ListEntity {
    title?: string;
    items: string[];
}

interface WatchlistEntity {
    lists: ListEntity[];
}

export const WatchlistEntityEmpty: WatchlistEntity = {
    lists: []
};

export default WatchlistEntity;