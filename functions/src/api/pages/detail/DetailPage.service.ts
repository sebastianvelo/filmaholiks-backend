import * as UserService from '@api/entities/user/User.service';
import { mapError } from '@api/helper/service/ServiceHelper';
import DetailPageModel from '@shared/model/pages/detail/DetailPageModel';
import TMDB from '@TMDB/TMDB';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import EpisodeDetailPage from './page/episode/EpisodeDetailPage';
import MovieDetailPage from './page/movie/MovieDetailPage';
import PersonDetailPage from './page/person/PersonDetailPage';
import SeasonDetailPage from './page/season/SeasonDetailPage';
import ShowDetailPage from './page/show/ShowDetailPage';
import UserDetailPage from './page/user/UserDetailPage';

/**
 * Obtiene detalle de usuario, incluyendo vistas de página
 */
export const getUser = (userName: string, viewerUid?: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    UserService.getUser(userName),
    TE.chain((user) => TE.tryCatch(
      () => UserDetailPage({ user, viewerUid }),
      mapError
    ))
  );

/**
 * Obtiene detalle de persona desde TMDB
 */
export const getPerson = (id: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.person.getDetails(+id),
      mapError
    ),
    TE.chain(person =>
      TE.tryCatch(
        () => PersonDetailPage({ person }),
        mapError
      )
    )
  );

/**
 * Obtiene detalle de película desde TMDB
 */
export const getMovie = (id: string, viewerUid?: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.movie.getDetails(+id),
      mapError
    ),
    TE.chain((movie) => TE.tryCatch(
      () => MovieDetailPage({ movie, viewerUid }),
      mapError
    ))
  );

/**
 * Obtiene detalle de serie desde TMDB
 */
export const getShow = (id: string, viewerUid?: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.tvShow.getDetails(+id),
      mapError
    ),
    TE.chain((show) => TE.tryCatch(
      () => ShowDetailPage({ show, viewerUid }),
      mapError
    ))
  );

/**
 * Obtiene detalles de una temporada específica desde TMDB
 */
export const getSeason = (showId: string, seasonNumber: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.season.getDetails(+showId, +seasonNumber),
      mapError
    ),
    TE.chain((season) => TE.tryCatch(
      () => SeasonDetailPage({ season, showId, seasonNumber }),
      mapError
    ))
  );

/**
 * Obtiene detalles de un episodio específico desde TMDB
 */
export const getEpisode = (showId: string, seasonNumber: string, episodeNumber: string): TE.TaskEither<Error, DetailPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber),
      mapError
    ),
    TE.chain((episode) => TE.tryCatch(
      () => EpisodeDetailPage({ episode, showId, seasonNumber }),
      mapError
    ))
  );
