import { mapError } from "@api/helper/service/ServiceHelper";
import { ListEntity } from "@shared/entity/watch-list/WatchlistEntity";
import ActionableCardModel from "@shared/model/components/ActionableCardModel";
import { WatchlistTabModel } from "@shared/model/components/section/Section";
import { DetailWatchlistModel } from "@shared/model/pages/detail/DetailPageModel";
import MediaType from "@shared/types/MediaType";
import { TaskEither, tryCatch } from "fp-ts/TaskEither";
import { searchMovies, searchShows, viewMovies, viewShows } from "./service/Watchlist.service.utils";
import WatchlistRepository from "./Watchlist.repository";

/**
 * Busca medios (películas o series) por una query
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param query - Consulta de búsqueda
 * @returns TaskEither con los resultados o un error
 */
export const search = (mediaType: MediaType, uid: string, query: string): TaskEither<Error, ActionableCardModel[]> =>
  tryCatch(
    async () => {
      if (mediaType === MediaType.SHOW) {
        return searchShows(uid, query);
      } 
      if (mediaType === MediaType.MOVIE) {
        return searchMovies(uid, query);
      }
      throw new Error("Invalid MediaType");
    },
    mapError
  );

/**
 * Obtiene la vista de watchlist para un usuario
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param viewerUid - ID del usuario que visualiza (opcional)
 * @returns TaskEither con la vista de watchlist o un error
 */
export const getViewByUser = (mediaType: MediaType, uid: string, viewerUid?: string): TaskEither<Error, WatchlistTabModel> =>
  tryCatch(
    async () => {
      if (mediaType === MediaType.SHOW) {
        return viewShows(uid, viewerUid);
      } 
      if (mediaType === MediaType.MOVIE) {
        return viewMovies(uid, viewerUid);
      }
      throw new Error("Invalid MediaType");
    },
    mapError
  );

/**
 * Obtiene las watchlists de ambos tipos de medios para un usuario
 * @param uid - ID del usuario
 * @param viewerUid - ID del usuario que visualiza (opcional)
 * @returns TaskEither con las watchlists o un error
 */
export const getAllWatchlists = (uid: string, viewerUid?: string): TaskEither<Error, DetailWatchlistModel> =>
  tryCatch(
    async () => {
      const tvShowWatchlistPromise = getViewByUser(MediaType.SHOW, uid, viewerUid)();
      const movieWatchlistPromise = getViewByUser(MediaType.MOVIE, uid, viewerUid)();

      const [tvShowResult, movieResult] = await Promise.all([
        tvShowWatchlistPromise.then(result => result._tag === 'Right' ? result.right : null),
        movieWatchlistPromise.then(result => result._tag === 'Right' ? result.right : null)
      ]);

      if (!tvShowResult || !movieResult) {
        throw new Error("Error getting watchlists");
      }

      return {
        watchlists: [tvShowResult, movieResult]
      };
    },
    mapError
  );

/**
 * Añade una nueva lista a la watchlist
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param title - Título de la lista
 * @returns TaskEither con void o un error
 */
export const addList = (mediaType: MediaType, uid: string, title: string): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (!title) {
        throw new Error("Title is required");
      }
      WatchlistRepository[mediaType].list.add(uid, title);
    },
    mapError
  );

/**
 * Guarda todas las listas de la watchlist
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param lists - Listas a guardar
 * @returns TaskEither con void o un error
 */
export const saveAllLists = (mediaType: MediaType, uid: string, lists: ListEntity[]): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (!Array.isArray(lists)) {
        throw new Error("Invalid list format");
      }
      WatchlistRepository[mediaType].list.saveAll(uid, { lists });
    },
    mapError
  );

/**
 * Elimina una lista de la watchlist
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx - Índice de la lista
 * @returns TaskEither con void o un error
 */
export const deleteList = (mediaType: MediaType, uid: string, listIdx: number): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx)) {
        throw new Error("List index must be a number");
      }
      WatchlistRepository[mediaType].list.delete(uid, listIdx);
    },
    mapError
  );

/**
 * Intercambia dos listas de posición
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx1 - Índice de la primera lista
 * @param listIdx2 - Índice de la segunda lista
 * @returns TaskEither con void o un error
 */
export const swapLists = (mediaType: MediaType, uid: string, listIdx1: number, listIdx2: number): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx1) || Number.isNaN(listIdx2)) {
        throw new Error("List indices must be numbers");
      }
      WatchlistRepository[mediaType].list.swap(uid, listIdx1, listIdx2);
    },
    mapError
  );

/**
 * Cambia el título de una lista
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx - Índice de la lista
 * @param title - Nuevo título
 * @returns TaskEither con void o un error
 */
export const changeListTitle = (mediaType: MediaType, uid: string, listIdx: number, title: string): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx)) {
        throw new Error("List index must be a number");
      }
      if (!title) {
        throw new Error("Title is required");
      }
      WatchlistRepository[mediaType].list.update(uid, listIdx, title);
    },
    mapError
  );

/**
 * Añade un ítem a una lista
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx - Índice de la lista
 * @param itemId - ID del ítem
 * @returns TaskEither con void o un error
 */
export const addItem = (mediaType: MediaType, uid: string, listIdx: number, itemId: string): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx)) {
        throw new Error("List index must be a number");
      }
      if (!itemId) {
        throw new Error("Item ID is required");
      }
      WatchlistRepository[mediaType].item.save(uid, listIdx, itemId);
    },
    mapError
  );

/**
 * Elimina un ítem de una lista
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx - Índice de la lista
 * @param itemId - ID del ítem
 * @returns TaskEither con void o un error
 */
export const deleteItem = (mediaType: MediaType, uid: string, listIdx: number, itemId: string): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx)) {
        throw new Error("List index must be a number");
      }
      if (!itemId) {
        throw new Error("Item ID is required");
      }
      WatchlistRepository[mediaType].item.delete(uid, listIdx, itemId);
    },
    mapError
  );

/**
 * Intercambia dos ítems de posición
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param listIdx - Índice de la lista
 * @param itemIdx1 - Índice del primer ítem
 * @param itemIdx2 - Índice del segundo ítem
 * @returns TaskEither con void o un error
 */
export const swapItems = (mediaType: MediaType, uid: string, listIdx: number, itemIdx1: number, itemIdx2: number): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(listIdx) || Number.isNaN(itemIdx1) || Number.isNaN(itemIdx2)) {
        throw new Error("All indices must be numbers");
      }
      WatchlistRepository[mediaType].item.swap(uid, listIdx, itemIdx1, itemIdx2);
    },
    mapError
  );

/**
 * Mueve un ítem de una lista a otra
 * @param mediaType - Tipo de medio (película o serie)
 * @param uid - ID del usuario
 * @param sourceListIdx - Índice de la lista origen
 * @param targetListIdx - Índice de la lista destino
 * @param itemIdx - Índice del ítem
 * @returns TaskEither con void o un error
 */
export const moveItem = (mediaType: MediaType, uid: string, sourceListIdx: number, targetListIdx: number, itemIdx: number): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      if (Number.isNaN(sourceListIdx) || Number.isNaN(targetListIdx) || Number.isNaN(itemIdx)) {
        throw new Error("All indices must be numbers");
      }
      WatchlistRepository[mediaType].item.move(uid, sourceListIdx, targetListIdx, itemIdx);
    },
    mapError
  );