import MediaType from "../../shared/types/MediaType";
import WatchlistsDatabase from "../database/WatchlistsDatabase";
import WatchlistEntity, { ListEntity } from "../entity/watch-list/WatchlistEntity";

type ItemId = string | number;

class WatchlistMediaRepository {
    private database: WatchlistsDatabase;

    constructor(mediaType: MediaType) {
        this.database = new WatchlistsDatabase(mediaType);
    }

    public list = {
        getByUser: async (userId: string): Promise<WatchlistEntity> => {
            const lists = await this.database.list.getAll(userId);
            return { lists };
        },
        getByItem: async (userId: string, itemId: ItemId): Promise<ListEntity | undefined> => {
            const lists = await this.database.list.getAll(userId);
            return lists.find(list => list.items.includes(String(itemId)));
        },
        saveAll: async (userId: string, lists: WatchlistEntity): Promise<WatchlistEntity> => {
            this.database.list.addAll(userId, lists.lists);
            return this.list.getByUser(userId);
        },
        add: async (userId: string, listTitle: string): Promise<WatchlistEntity> => {
            const watchlist = await this.list.getByUser(userId);
            await this.database.list.add(userId, { title: listTitle, items: [], order: watchlist.lists.length });
            return this.list.getByUser(userId);
        },
        delete: async (userId: string, listIdx: number): Promise<WatchlistEntity> => {
            await this.database.list.deleteByOrder(userId, listIdx);
            return this.list.getByUser(userId);
        },
        swap: async (userId: string, listIdx1: number, listIdx2: number): Promise<WatchlistEntity> => {
            await this.database.list.swap(userId, listIdx1, listIdx2);
            return this.list.getByUser(userId);
        },
    };

    public item = {
        exists: async (userId: string, itemId: ItemId): Promise<boolean> => {
            const lists = await this.database.list.getAll(userId);
            return lists.some(list => list.items.includes(String(itemId)));
        },
        save: async (userId: string, listIdx: number, item: ItemId): Promise<WatchlistEntity> => {
            await this.database.item.add(userId, listIdx, item);
            return this.list.getByUser(userId);
        },
        swap: async (userId: string, listIdx: number, itemIdx1: number, itemIdx2: number): Promise<WatchlistEntity> => {
            await this.database.item.swap(userId, listIdx, itemIdx1, itemIdx2);
            return this.list.getByUser(userId);
        },
        move: async (userId: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): Promise<WatchlistEntity> => {
            await this.database.item.move(userId, sourceListIdx, targetListIdx, itemIdx);
            return this.list.getByUser(userId);
        },
        delete: async (userId: string, listIdx: number, itemId: string): Promise<WatchlistEntity> => {
            await this.database.item.delete(userId, listIdx, itemId);
            return this.list.getByUser(userId);
        }
    };
}

const WatchlistRepository = {
    show: new WatchlistMediaRepository(MediaType.SHOW),
    movie: new WatchlistMediaRepository(MediaType.MOVIE),
};

export default WatchlistRepository;