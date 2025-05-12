// backend/src/database/UsersDatabase.ts
import UserEntity from "../../shared/entity/user/UserEntity";
import CollectionName from "./types/CollectionName";
import createCollection from "../../common/app/firebase/createCollection";

class UsersDatabase {
    private usersCol = createCollection<UserEntity>(CollectionName.USERS);

    public async getAll(): Promise<UserEntity[]> {
        const snap = await this.usersCol.get();
        return snap.docs.map(d => ({ ...(d.data() as UserEntity), id: d.id }));
    }

    public async getByUsername(userName: string): Promise<UserEntity | undefined> {
        const snap = await this.usersCol.where("userName", "==", userName).get();
        const doc = snap.docs[0];
        return doc ? { ...(doc.data() as UserEntity), id: doc.id } : undefined;
    }

    public async getByUid(uid: string): Promise<UserEntity | undefined> {
        const doc = await this.usersCol.doc(uid).get();
        return doc.exists ? { ...(doc.data() as UserEntity), id: doc.id } : undefined;
    }

    public async save(data: UserEntity): Promise<UserEntity> {
        await this.usersCol.doc(data.id).set(data);
        return data;
    }

    public async update(id: string, data: Partial<UserEntity>): Promise<void> {
        await this.usersCol.doc(id).update(data);
    }
}

export default new UsersDatabase();
