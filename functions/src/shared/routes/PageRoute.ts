enum PageRoute {
  HOME = "/home",
  LOGIN = "/login",
  ERROR = "/*",
  ACCOUNT = "/account",
  USER_DETAIL = "/user/:id",
  USER_SEARCH = "/user/search/:query",
  MOVIE_EXPLORE = "/movie",
  MOVIE_DETAIL = "/movie/:id",
  MOVIE_SEARCH = "/movie/search/:query",
  PERSON_EXPLORE = "/person",
  PERSON_DETAIL = "/person/:id",
  PERSON_SEARCH = "/person/search/:query",
  SHOW_EXPLORE = "/show",
  SHOW_DETAIL = "/show/:id",
  SHOW_SEARCH = "/show/search/:query",
  SEASON_DETAIL = "/show/:id/s/:season",
  EPISODE_DETAIL = "/show/:id/s/:season/e/:episode",
  WATCH_LIST_LOGGED_IN = "/user/my/watch-list",
  WATCH_LIST_BY_USER = "/user/:user/watch-list"
}

export const PageRouteBuilder = {
  HOME: () => `/home`,
  LOGIN: () => `/login`,
  ERROR: () => `/*`,
  ACCOUNT: () => `/account`,
  USER_DETAIL: (userName?: string) => `/user/${userName}`,
  MOVIE_EXPLORE: () => `/movie`,
  MOVIE_DETAIL: (movieId?: number) => `/movie/${movieId}`,
  MOVIE_SEARCH: (query: number) => `/movie/search/${query}`,
  PERSON_EXPLORE: () => `/person`,
  PERSON_DETAIL: (personId?: number) => `/person/${personId}`,
  PERSON_SEARCH: (query: number) => `/person/search/${query}`,
  SHOW_EXPLORE: () => `/show`,
  SHOW_DETAIL: (showId?: number) => `/show/${showId}`,
  SHOW_SEARCH: (query: number) => `/show/search/${query}`,
  SEASON_DETAIL: (showId: number, season: number) => `/show/${showId}/s/${season}`,
  EPISODE_DETAIL: (showId: number, season: number, episode: number) => `/show/${showId}/s/${season}/e/${episode}`,
  WATCH_LIST_LOGGED_IN: () => `/user/my/watch-list`,
  WATCH_LIST_BY_USER: () => `/user/:user/watch-list`
}

export default PageRoute;
