import UserEntity from "../../../shared/entity/user/UserEntity";
import UserRepository from "./UserRepository";

class UserService {
  public static async getUser(userName: string): Promise<UserEntity | null> {
    try {
      const user = await UserRepository.getUser(userName);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (e) {
      return null;
    }
  }

  public static async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (e) {
      return null;
    }
  }

  public static getDefaultAvatar = (userName: string) =>
    `"https://api.dicebear.com/9.x/thumbs/svg?seed=${userName}"`;


  public static newUserByEmail = (email: string, uid: string): UserEntity => {
    const userName = email.split("@")[0];

    return {
      uid,
      userName,
      registered: new Date(Date.now()),
      email,
      avatar: UserService.getDefaultAvatar(userName),
      about: "Hi there!",
      name: "",
      status: "ACTIVE",
      index: 0
    };
  }


  public static async save(email: string, uid: string) {
    const user = await UserService.getUserByEmail(email);
    return !user && UserRepository.save(UserService.newUserByEmail(email, uid));
  }

  public static async update(userName: string, user: UserEntity) {
    return {};
  }

  public static async delete(userName: string) {
    return {};
  }
}

export default UserService;
