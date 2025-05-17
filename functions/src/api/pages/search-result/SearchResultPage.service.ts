import SearchResultPageModel from "@shared/model/pages/search-result/SearchResultPageModel";
import TMDB from "@TMDB/TMDB";
import { MoviesResponse, PeopleResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import MovieSearchResultPage from "./page/movie/MovieSearchResultPage";
import PersonSearchResultPage from "./page/person/PersonSearchResultPage";
import ShowSearchResultPage from "./page/show/ShowSearchResultPage";
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

const mapError = (reason: unknown): Error =>
  reason instanceof Error ? reason : new Error(String(reason));

/**
 * Busca películas y mapea a SearchResultPageModel
 */
export const getMovie = (query: string): TE.TaskEither<Error, SearchResultPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.search.getMovies({ query }),
      mapError
    ),
    TE.map((movies: MoviesResponse) => MovieSearchResultPage(movies, query))
  );

/**
 * Busca series y mapea a SearchResultPageModel
 */
export const getShow = (query: string): TE.TaskEither<Error, SearchResultPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.search.getTVShows({ query }),
      mapError
    ),
    TE.map((shows: TVShowsResponse) => ShowSearchResultPage(shows, query))
  );

/**
 * Busca personas y mapea a SearchResultPageModel
 */
export const getPeople = (query: string): TE.TaskEither<Error, SearchResultPageModel> =>
  pipe(
    TE.tryCatch(
      () => TMDB.search.getPeople({ query }),
      mapError
    ),
    TE.map((people: PeopleResponse) => PersonSearchResultPage(people, query))
  );
