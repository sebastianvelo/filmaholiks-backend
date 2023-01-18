import UserEntity from "../../shared/entity/user/UserEntity";
import UserRepository from "../repository/UserRepository";

class UserService {
  public static async getUser(userName: string, userLoggedIn: string): Promise<UserEntity | null> {
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
    `https://avatars.dicebear.com/api/bottts/${userName}.svg`;

  public static newUserByEmail = (email: string): UserEntity => {
    const userName = email.split("@")[0];
    return {
      userName,
      about: "",
      email,
      avatar: UserService.getDefaultAvatar(userName),
      id: "",
      name: "",
      registered: "",
      status: "ACTIVE",
      guid: "",
      index: 0
    };
  }


  public static async save(email: string) {
    const user = await UserService.getUserByEmail(email);
    return !user && UserRepository.save(UserService.newUserByEmail(email));
  }
}

export default UserService;
