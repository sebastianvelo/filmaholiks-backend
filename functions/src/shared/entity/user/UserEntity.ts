interface UserEntity {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    name: string;
    registered: Date;
    status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED" | "DELETED" | "BANNED";
    about: string;
    index: number;
}

export default UserEntity;