import { getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import MediaType from "../../shared/types/MediaType";
import { ListEntity } from "../../shared/entity/watch-list/WatchlistEntity";
import CollectionName from "./common/CollectionName";
import createCollection from "./common/FirestoreHelper";
import UsersDatabase from "./UsersDatabase";

const WatchlistCollection = async (mediaType: MediaType, userName: string) => {
    const user = await UsersDatabase.getByUsername(userName);
    if (!user) throw new Error("User not found");
    if (mediaType === MediaType.SHOW) return createCollection<ListEntity>(`${CollectionName.USERS}/${user.id}/${CollectionName.SHOW_WATCHLIST}`);
    return createCollection<ListEntity>(`${CollectionName.USERS}/${user.id}/${CollectionName.MOVIE_WATCHLIST}`);
};

class WatchlistsDatabase {
    private mediaType: MediaType;

    constructor(mediaType: MediaType) {
        this.mediaType = mediaType;
    }

    public list = {
        getAll: async (userName: string): Promise<ListEntity[]> => {
            const snapshot = await getDocs(await WatchlistCollection(this.mediaType, userName));
            return snapshot.docs.map(document => ({
                ...document.data(),
                id: document.id
            })).sort((a, b) => a.order - b.order);
        },
        getByOrder: async (userName: string, order: number): Promise<ListEntity | undefined> => {
            const lists = await this.list.getAll(userName);
            return lists.find(list => list.order === order);
        },
        update: async (userName: string, id: string, data: ListEntity): Promise<void> => {
            const ref = doc(await WatchlistCollection(this.mediaType, userName), id);
            await updateDoc(ref, data);
        },
        updateByOrder: async (userName: string, order: number, data: ListEntity): Promise<void> => {
            const list = await this.list.getByOrder(userName, order);
            if (list && list.id) {
                await this.list.update(userName, list.id, data);
            }
        },
        updateTitleByOrder: async (userName: string, order: number, title: string): Promise<void> => {
            const list = await this.list.getByOrder(userName, order);
            if (list && list.id) {
                await this.list.update(userName, list.id, { ...list, title });
            }
        },
        updateOrders: async (userName: string): Promise<void> => {
            const lists = await this.list.getAll(userName);
            await Promise.all(lists.map((list, idx) => this.list.update(userName, list.id ?? "", {
                ...list,
                order: idx
            })));
        },
        add: async (userName: string, data: ListEntity) => {
            await addDoc(await WatchlistCollection(this.mediaType, userName), data);
        },
        addAll: async (userName: string, data: ListEntity[]) => {
            await Promise.all(data.map(list => this.list.add(userName, list)));
        },
        delete: async (userName: string, id: string) => {
            const ref = doc(await WatchlistCollection(this.mediaType, userName), id);
            await deleteDoc(ref);
            await this.list.updateOrders(userName);
        },
        deleteByOrder: async (userName: string, order: number) => {
            const list = await this.list.getByOrder(userName, order);
            if (list && list.id) {
                await this.list.delete(userName, list.id);
            }
        },
        swap: async (userName: string, listIdx1: number, listIdx2: number): Promise<void> => {
            const lists = await this.list.getAll(userName);
            const list1 = lists[listIdx1];
            const list2 = lists[listIdx2];
            if (list1 && list2) {
                await Promise.all([
                    this.list.update(userName, list1.id ?? "", {
                        ...list1,
                        order: list2.order
                    }),
                    this.list.update(userName, list2.id ?? "", {
                        ...list2,
                        order: list1.order
                    })
                ]);
            }
        }
    };

    public item = {
        add: async (userName: string, listOrder: number, itemId: string | number) => {
            const list = await this.list.getByOrder(userName, listOrder);
            if (list && list.id) {
                const { items } = list;
                items.push(String(itemId));
                await this.list.update(userName, list.id, { ...list, items });
            }
        },
        delete: async (userName: string, listOrder: number, itemId: string | number) => {
            const list = await this.list.getByOrder(userName, listOrder);
            if (list && list.id) {
                const { items } = list;
                const index = items.indexOf(String(itemId));
                if (index > -1) {
                    items.splice(index, 1);
                    await this.list.update(userName, list.id, { ...list, items });
                }
            }
        },
        swap: async (userName: string, listOrder: number, itemIdx: number, targetItemIdx: number) => {
            const list = await this.list.getByOrder(userName, listOrder);
            if (list && list.id) {
                const { items } = list;
                const temp = items[itemIdx];
                items[itemIdx] = items[targetItemIdx];
                items[targetItemIdx] = temp;
                await this.list.update(userName, list.id, { ...list, items });
            }
        },
        move: async (userName: string, sourceListIdx: number, targetListIdx: number, itemIdx: number) => {
            const sourceList = await this.list.getByOrder(userName, sourceListIdx);
            const targetList = await this.list.getByOrder(userName, targetListIdx);
            if (sourceList && sourceList.id && targetList && targetList.id) {
                const sourceItems = sourceList.items;
                const targetItems = targetList.items;
                const item = sourceItems[itemIdx];
                sourceItems.splice(itemIdx, 1);
                targetItems.push(item);
                await this.list.update(userName, sourceList.id, { ...sourceList, items: sourceItems });
                await this.list.update(userName, targetList.id, { ...targetList, items: targetItems });
            }
        }
    }

}

export default WatchlistsDatabase;