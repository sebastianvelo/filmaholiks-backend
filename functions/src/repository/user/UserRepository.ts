import mock from "../../mock/users-mocked";
import UserModel from "../model/user/UserModel";

class UserRepository {

    public static getUser(id: string): UserModel | undefined {
        return mock.find(user => user.userName === id);
    }

}

export default UserRepository;