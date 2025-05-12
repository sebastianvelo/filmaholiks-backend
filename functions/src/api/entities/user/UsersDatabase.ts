import CollectionName from "../../../app/database/types/CollectionName";
import createCollection from "../../../app/firebase/createCollection";
import UserEntity from "../../../shared/entity/user/UserEntity";

class UsersDatabase {
    private usersCol = createCollection<UserEntity>(CollectionName.USERS);

    public async getAll(): Promise<UserEntity[]> {
        const snap = await this.usersCol.get();
        return snap.docs.map(d => {
            const data = d.data() as UserEntity;
            return {
                ...data,
                id: d.id,  // ID del documento de Firestore
                uid: data.uid || d.id  // Usar uid si existe, de lo contrario usar id del documento
            };
        });
    }

    public async getByUsername(userName: string): Promise<UserEntity | undefined> {
        const snap = await this.usersCol.where("userName", "==", userName).get();
        const doc = snap.docs[0];
        return doc
            ? {
                ...(doc.data() as UserEntity),
                id: doc.id,
                uid: (doc.data() as UserEntity).uid || doc.id
            }
            : undefined;
    }

    public async getByUid(uid: string): Promise<UserEntity | undefined> {
        // Buscar por uid en lugar de usar doc(uid)
        const snap = await this.usersCol.where("uid", "==", uid).get();
        const doc = snap.docs[0];
        return doc
            ? {
                ...(doc.data() as UserEntity),
                id: doc.id,
                uid: (doc.data() as UserEntity).uid || doc.id
            }
            : undefined;
    }

    public async save(data: UserEntity): Promise<UserEntity> {
        // Si no hay id, Firestore generará uno automáticamente
        const docRef = data.id
            ? this.usersCol.doc(data.id)
            : this.usersCol.doc();

        const dataToSave = {
            ...data,
            id: docRef.id  // Asegurar que el id se establece
        };

        await docRef.set(dataToSave);
        return dataToSave;
    }

    public async update(id: string, data: Partial<UserEntity>): Promise<void> {
        await this.usersCol.doc(id).update(data);
    }
}

export default new UsersDatabase();