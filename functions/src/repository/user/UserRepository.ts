import User from "../../model/user/User";

const userMocked = {
    id: "2412441",
    userName: "sebastianvelo",
    email: "bostjan@gmail.com",
    photoURL: "https://avatars.dicebear.com/api/personas/sebastianvelo.svg",
    displayName: "Sebastian Velo",
    phoneNumber: "2345232352323",
    createdAt: "2020-12-12T12:12:12.000Z",
};

class UserRepository {

    public static async getUser(id: string): Promise<User> {
        return await userMocked;
    }
}

export default UserRepository;