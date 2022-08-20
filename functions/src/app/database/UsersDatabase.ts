import { getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import UserEntity from "../repository/entity/user/UserEntity";
import CollectionName from "./common/CollectionName";
import createCollection from "./common/FirestoreHelper";

const UsersCollection = createCollection<UserEntity>(CollectionName.USERS);

class UsersDatabase {

    public getAll = async (): Promise<UserEntity[]> => {
        const snapshot = await getDocs(UsersCollection);
        return snapshot.docs.map(document => ({
            ...document.data(),
            id: document.id
        }));
    };

    public getByUsername = async (userName: string): Promise<UserEntity | undefined> => {
        const snapshot = await getDocs(UsersCollection);
        const user = snapshot.docs.find(document => document.data().userName === userName);
        return user && { ...user.data(), id: user.id };
    };

    public update = async (id: string, data: UserEntity): Promise<void> => {
        const ref = doc(UsersCollection, id);
        await updateDoc(ref, data);
    };

    public add = async (data: UserEntity): Promise<void> => {
        await addDoc(UsersCollection, data);
    };
}

export default new UsersDatabase();