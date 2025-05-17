import { mapError } from "@api/helper/service/ServiceHelper";
import ExplorePageModel from "@shared/model/pages/explore/ExplorePageModel";
import { pipe } from "fp-ts/lib/function";
import * as TE from 'fp-ts/TaskEither';
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import MovieExplorePage from "./movie/MovieExplorePage";
import PersonExplorePage from "./person/PersonExplorePage";
import ShowExplorePage from "./show/ShowExplorePage";

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