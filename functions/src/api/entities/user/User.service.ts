import UserEntity from "@shared/entity/user/UserEntity";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import UserRepository from "./User.repository";
import { newUserByEmail } from "./service/User.service.utils";

/**
 * Obtiene un usuario por su nombre de usuario
 * @param userName - Nombre de usuario
 * @returns TaskEither con el usuario o un error
 */
export const getUser = (userName: string): TE.TaskEither<Error, UserEntity> => {
  return TE.tryCatch(
    async () => {
      const user = await UserRepository.getUser(userName);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    (reason) => reason instanceof Error ? reason : new Error(String(reason))
  );
};

/**
 * Obtiene un usuario por su correo electrónico
 * @param email - Correo electrónico
 * @returns TaskEither con el usuario o un error
 */
export const getUserByEmail = (email: string): TE.TaskEither<Error, UserEntity> => {
  return TE.tryCatch(
    async () => {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    (reason) => reason instanceof Error ? reason : new Error(String(reason))
  );
};

/**
 * Guarda un nuevo usuario si no existe previamente
 * @param email - Correo electrónico
 * @param uid - ID de usuario
 * @returns TaskEither con el usuario guardado o un error
 */
export const save = (
  email: string,
  uid: string
): TE.TaskEither<Error, UserEntity> => {
  return pipe(
    getUserByEmail(email),
    TE.chain(() => TE.left(new Error("User already exists"))),
    TE.orElse(() =>
      pipe(
        TE.right(newUserByEmail(email, uid)),
        TE.chain(TE.tryCatchK(UserRepository.save, reason =>
          reason instanceof Error ? reason : new Error(String(reason))
        )),
        TE.chain(saved =>
          saved
            ? TE.right(saved)
            : TE.left(new Error("Failed to save user"))
        )
      )
    )
  );
};

/**
 * Actualiza un usuario existente
 * @param userName - Nombre de usuario
 * @param userData - Datos del usuario a actualizar
 * @returns TaskEither con el usuario actualizado o un error
 */
export const update = (userName: string, userData: Partial<UserEntity>): TE.TaskEither<Error, UserEntity> => {
  return TE.tryCatch(
    async () => {
      // Verificar que el usuario existe
      const user = await UserRepository.getUser(userName);
      if (!user) {
        throw new Error("User not found");
      }

      // Actualizar usuario
      const updatedUser = ""; //await UserRepository.update(userName, userData);
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }

      return updatedUser;
    },
    (reason) => reason instanceof Error ? reason : new Error(String(reason))
  );
};

/**
 * Elimina un usuario existente
 * @param userName - Nombre de usuario
 * @returns TaskEither con un booleano indicando éxito o un error
 */
export const deleteUser = (userName: string): TE.TaskEither<Error, boolean> => {
  return TE.tryCatch(
    async () => {
      // Verificar que el usuario existe
      const user = await UserRepository.getUser(userName);
      if (!user) {
        throw new Error("User not found");
      }

      // Eliminar usuario
      const result = "";//await UserRepository.delete(userName);
      if (!result) {
        throw new Error("Failed to delete user");
      }

      return true;
    },
    (reason) => reason instanceof Error ? reason : new Error(String(reason))
  );
};