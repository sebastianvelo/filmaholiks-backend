import ExplorePageModel from "@shared/model/pages/explore/ExplorePageModel";
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import MovieExplorePage from "./page/movie/MovieExplorePage";
import PersonExplorePage from "./page/person/PersonExplorePage";
import ShowExplorePage from "./page/show/ShowExplorePage";
import { pipe } from "fp-ts/lib/function";
import * as TE from 'fp-ts/TaskEither';

const mapError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));


export const getMovie = (query?: LanguageParams): TE.TaskEither<Error, ExplorePageModel> =>
  pipe(
    TE.tryCatch(
      () => MovieExplorePage(query),
      mapError
    )
  );

export const getShow = (query?: LanguageParams) =>
  pipe(
    TE.tryCatch(
      () => ShowExplorePage(query),
      mapError
    )
  );

export const getPeople = () =>
  pipe(
    TE.tryCatch(
      () => PersonExplorePage(),
      mapError
    )
  );