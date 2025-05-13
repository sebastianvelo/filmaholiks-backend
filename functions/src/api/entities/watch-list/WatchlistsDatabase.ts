import { ListEntity } from '@shared/entity/watch-list/WatchlistEntity';
import MediaType from '@shared/types/MediaType';
import * as admin from 'firebase-admin';
import CollectionName from '../../../app/database/types/CollectionName';
import createCollection from '../../../app/firebase/createCollection';
import UserRepository from '../user/UserRepository';

const getWatchlistCollection = async (mediaType: MediaType, uid: string) => {
    const user = await UserRepository.getUserByUid(uid);
    if (!user) throw new Error("User not found");

    const collectionPath = mediaType === MediaType.SHOW
        ? `${CollectionName.USERS}/${user.id}/${CollectionName.SHOW_WATCHLIST}`
        : `${CollectionName.USERS}/${user.id}/${CollectionName.MOVIE_WATCHLIST}`;

    return createCollection<ListEntity>(collectionPath);
};

class WatchlistsDatabase {
    private mediaType: MediaType;

    constructor(mediaType: MediaType) {
        this.mediaType = mediaType;
    }

    public list = {
        getAll: async (uid: string): Promise<ListEntity[]> => {
            const collection = await getWatchlistCollection(this.mediaType, uid);
            const snapshot = await collection.get();

            return snapshot.docs
                .map(doc => ({
                    ...doc.data() as ListEntity,
                    id: doc.id
                }))
                .sort((a, b) => a.order - b.order);
        },

        getByOrder: async (uid: string, order: number): Promise<ListEntity | undefined> => {
            const collection = await getWatchlistCollection(this.mediaType, uid);
            const snapshot = await collection.where("order", "==", order).limit(1).get();

            if (snapshot.empty) return undefined;

            const doc = snapshot.docs[0];
            return {
                ...doc.data() as ListEntity,
                id: doc.id
            };
        },

        update: async (uid: string, id: string, data: ListEntity): Promise<void> => {
            const collection = await getWatchlistCollection(this.mediaType, uid);
            await collection.doc(id).update({ ...data });
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
            await Promise.all(lists.map((list, idx) =>
                this.list.update(uid, list.id ?? "", {
                    ...list,
                    order: idx
                })
            ));
        },

        add: async (uid: string, data: ListEntity): Promise<string> => {
            const collection = await getWatchlistCollection(this.mediaType, uid);
            const docRef = await collection.add(data);
            return docRef.id;
        },

        addAll: async (uid: string, data: ListEntity[]): Promise<string[]> => {
            const promises = data.map(list => this.list.add(uid, list));
            return Promise.all(promises);
        },

        delete: async (uid: string, id: string): Promise<void> => {
            const collection = await getWatchlistCollection(this.mediaType, uid);
            await collection.doc(id).delete();
            await this.list.updateOrders(uid);
        },

        deleteByOrder: async (uid: string, order: number): Promise<void> => {
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
                const batch = admin.firestore().batch();
                const collection = await getWatchlistCollection(this.mediaType, uid);

                // Usar batch para actualizar ambos documentos en una sola transacción
                batch.update(collection.doc(list1.id ?? ""), {
                    ...list1,
                    order: list2.order
                });

                batch.update(collection.doc(list2.id ?? ""), {
                    ...list2,
                    order: list1.order
                });

                await batch.commit();
            }
        }
    };

    public item = {
        add: async (uid: string, listOrder: number, itemId: string | number): Promise<void> => {
            const list = await this.list.getByOrder(uid, listOrder);
            if (list && list.id) {
                const { items } = list;
                items.push(String(itemId));
                await this.list.update(uid, list.id, { ...list, items });
            }
        },

        delete: async (uid: string, listOrder: number, itemId: string | number): Promise<void> => {
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

        swap: async (uid: string, listOrder: number, itemIdx: number, targetItemIdx: number): Promise<void> => {
            const list = await this.list.getByOrder(uid, listOrder);
            if (list && list.id) {
                const { items } = list;
                const temp = items[itemIdx];
                items[itemIdx] = items[targetItemIdx];
                items[targetItemIdx] = temp;
                await this.list.update(uid, list.id, { ...list, items });
            }
        },

        move: async (uid: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): Promise<void> => {
            const sourceList = await this.list.getByOrder(uid, sourceListIdx);
            const targetList = await this.list.getByOrder(uid, targetListIdx);

            if (sourceList && sourceList.id && targetList && targetList.id) {
                const batch = admin.firestore().batch();
                const collection = await getWatchlistCollection(this.mediaType, uid);

                const sourceItems = [...sourceList.items];
                const targetItems = [...targetList.items];
                const item = sourceItems[itemIdx];

                sourceItems.splice(itemIdx, 1);
                targetItems.push(item);

                // Usar batch para actualizar ambos documentos en una sola transacción
                batch.update(collection.doc(sourceList.id), {
                    items: sourceItems
                });

                batch.update(collection.doc(targetList.id), {
                    items: targetItems
                });

                await batch.commit();
            }
        }
    }
}

export default WatchlistsDatabase;