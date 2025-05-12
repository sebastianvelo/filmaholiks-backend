import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { ListEntity } from "../../shared/entity/watch-list/WatchlistEntity";
import MediaType from "../../shared/types/MediaType";
import UserRepository from "../repository/UserRepository";
import CollectionName from "./common/CollectionName";
import createCollection from "./common/FirestoreHelper";

const WatchlistCollection = async (mediaType: MediaType, uid: string) => {
    const user = await UserRepository.getUserByUid(uid);
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
        getAll: async (uid: string): Promise<ListEntity[]> => {
            const snapshot = await getDocs(await WatchlistCollection(this.mediaType, uid));
            return snapshot.docs.map(document => ({
                ...document.data(),
                id: document.id
            })).sort((a, b) => a.order - b.order);
        },
        getByOrder: async (uid: string, order: number): Promise<ListEntity | undefined> => {
            const lists = await this.list.getAll(uid);
            return lists.find(list => list.order === order);
        },
        update: async (uid: string, id: string, data: ListEntity): Promise<void> => {
            const ref = doc(await WatchlistCollection(this.mediaType, uid), id);
            await updateDoc(ref, data);
        },
        updateByOrder: async (uid: string, order: number, data: ListEntity): Promise<void> => {
            const list = await this.list.getByOrder(uid, order);
            if (list && list.id) {
                await this.list.update(uid, list.id, data);
            }
        },
        updateTitleByOrder: async (uid: string, order: number, title: string): Promise<void> => {
            const list = await this.list.getByOrder(uid, order);
            if (list && list.id) {
                await this.list.update(uid, list.id, { ...list, title });
            }
        },
        updateOrders: async (uid: string): Promise<void> => {
            const lists = await this.list.getAll(uid);
            await Promise.all(lists.map((list, idx) => this.list.update(uid, list.id ?? "", {
                ...list,
                order: idx
            })));
        },
        add: async (uid: string, data: ListEntity) => {
            await addDoc(await WatchlistCollection(this.mediaType, uid), data);
        },
        addAll: async (uid: string, data: ListEntity[]) => {
            await Promise.all(data.map(list => this.list.add(uid, list)));
        },
        delete: async (uid: string, id: string) => {
            const ref = doc(await WatchlistCollection(this.mediaType, uid), id);
            await deleteDoc(ref);
            await this.list.updateOrders(uid);
        },
        deleteByOrder: async (uid: string, order: number) => {
            const list = await this.list.getByOrder(uid, order);
            if (list && list.id) {
                await this.list.delete(uid, list.id);
            }
        },
        swap: async (uid: string, listIdx1: number, listIdx2: number): Promise<void> => {
            const lists = await this.list.getAll(uid);
            const list1 = lists[listIdx1];
            const list2 = lists[listIdx2];
            if (list1 && list2) {
                await Promise.all([
                    this.list.update(uid, list1.id ?? "", {
                        ...list1,
                        order: list2.order
                    }),
                    this.list.update(uid, list2.id ?? "", {
                        ...list2,
                        order: list1.order
                    })
                ]);
            }
        }
    };

    public item = {
        add: async (uid: string, listOrder: number, itemId: string | number) => {
            const list = await this.list.getByOrder(uid, listOrder);
            if (list && list.id) {
                const { items } = list;
                items.push(String(itemId));
                await this.list.update(uid, list.id, { ...list, items });
            }
        },
        delete: async (uid: string, listOrder: number, itemId: string | number) => {
            const list = await this.list.getByOrder(uid, listOrder);
            if (list && list.id) {
                const { items } = list;
                const index = items.indexOf(String(itemId));
                if (index > -1) {
                    items.splice(index, 1);
                    await this.list.update(uid, list.id, { ...list, items });
                }
            }
        },
        swap: async (uid: string, listOrder: number, itemIdx: number, targetItemIdx: number) => {
            const list = await this.list.getByOrder(uid, listOrder);
            if (list && list.id) {
                const { items } = list;
                const temp = items[itemIdx];
                items[itemIdx] = items[targetItemIdx];
                items[targetItemIdx] = temp;
                await this.list.update(uid, list.id, { ...list, items });
            }
        },
        move: async (uid: string, sourceListIdx: number, targetListIdx: number, itemIdx: number) => {
            const sourceList = await this.list.getByOrder(uid, sourceListIdx);
            const targetList = await this.list.getByOrder(uid, targetListIdx);
            if (sourceList && sourceList.id && targetList && targetList.id) {
                const sourceItems = sourceList.items;
                const targetItems = targetList.items;
                const item = sourceItems[itemIdx];
                sourceItems.splice(itemIdx, 1);
                targetItems.push(item);
                await this.list.update(uid, sourceList.id, { ...sourceList, items: sourceItems });
                await this.list.update(uid, targetList.id, { ...targetList, items: targetItems });
            }
        }
    }

}

export default WatchlistsDatabase;