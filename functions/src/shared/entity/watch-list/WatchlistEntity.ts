export interface ListEntity {
    id?: string;
    title?: string;
    items: string[];
    order: number;
}

interface WatchlistEntity {
    lists: ListEntity[];
}

export const WatchlistEntityEmpty = (userName: string): WatchlistEntity => ({
    lists: []
});

export default WatchlistEntity;