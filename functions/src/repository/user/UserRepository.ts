import mock from "../../mock/users-mocked";
import UserEntity from "../model/user/UserEntity";

class UserRepository {

    public static getUser(id: string): UserEntity | undefined {
        return mock.find(user => user.userName === id);
    }

}

export default UserRepository;