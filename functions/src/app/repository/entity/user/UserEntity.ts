interface UserEntity {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    name: string;
    registered: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED" | "DELETED" | "BANNED";
    about: string;
    guid: string;
    index: number;
}

export default UserEntity;