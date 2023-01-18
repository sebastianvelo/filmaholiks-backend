import UsersDatabase from "../database/UsersDatabase";
import UserEntity from "../../shared/entity/user/UserEntity";

class UserRepository {
    private database = UsersDatabase;

    public async getUser(userName: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.userName === userName);
    }

    public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.email === email);
    }

    public async save(user: UserEntity): Promise<UserEntity | null | undefined> {
        return this.database.save(user);
    }

}

export default new UserRepository();