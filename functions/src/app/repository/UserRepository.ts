import UsersDatabase from "../database/UsersDatabase";
import UserEntity from "../entity/user/UserEntity";

class UserRepository {
    private database = UsersDatabase;

    public async getUser(userName: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.userName === userName);
    }

    public async save(user: UserEntity): Promise<UserEntity | null | undefined> {
        return this.database.save(user);
    }

}

export default new UserRepository();