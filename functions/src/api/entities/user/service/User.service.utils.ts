import UserEntity from "@shared/entity/user/UserEntity";

/**
 * Genera un avatar por defecto basado en el nombre de usuario
 * @param userName - Nombre de usuario
 * @returns URL del avatar generado
 */
const getDefaultAvatar = (userName: string): string =>
    `https://api.dicebear.com/9.x/thumbs/svg?seed=${userName}`;

/**
 * Crea una nueva entidad de usuario basada en email y uid
 * @param email - Correo electrónico
 * @param uid - ID de usuario
 * @returns Nueva entidad de usuario
 */
export const newUserByEmail = (email: string, uid: string): UserEntity => {
    const userName = email.split("@")[0];

    return {
        uid,
        userName,
        registered: new Date(Date.now()),
        email,
        avatar: getDefaultAvatar(userName),
        about: "Hi there!",
        name: "",
        status: "ACTIVE",
        index: 0
    };
};