import UserEntity from "@shared/entity/user/UserEntity";
import UsersDatabase from "./db/Users.database";

class UserRepository {
    private database = UsersDatabase;

    public async getUser(userName: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.userName === userName);
    }

    public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.email === email);
    }

    public async getUserByUid(uid: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll())
            .find(u => u.uid === uid);
    }

    public async save(user: UserEntity): Promise<UserEntity | null | undefined> {
        const userToSave = {
            ...user,
            uid: user.uid
        };
        return this.database.save(userToSave);
    }
}

export default new UserRepository();