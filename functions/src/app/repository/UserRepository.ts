import UsersDatabase from "../database/UsersDatabase";
import UserEntity from "./entity/user/UserEntity";

class UserRepository {
    private database = UsersDatabase;

    public async getUser(userName: string): Promise<UserEntity | undefined> {
        return (await this.database.getAll()).find(user => user.userName === userName);
    }

}

export default new UserRepository();