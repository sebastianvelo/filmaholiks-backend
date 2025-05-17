import MovieActionableCardModel from "@api/pages/common/actionable-card/MovieActionableCardModel";
import ShowActionableCardModel from "@api/pages/common/actionable-card/ShowActionableCardModel";
import { WatchlistModel } from "@api/pages/common/watch-list/WatchlistModel";
import ActionableCardModel from "@shared/model/components/ActionableCardModel";
import { WatchlistTabModel } from "@shared/model/components/section/Section";
import MediaType from "@shared/types/MediaType";
import TMDB from "@TMDB/TMDB";
import WatchlistRepository from "../db/Watchlist.repository";

export async function searchShows(uid: string, query: string): Promise<ActionableCardModel[]> {
  const movies = await TMDB.search.getTVShows({ query });
  const detailed = await Promise.all(
    movies.results.map(r => TMDB.tvShow.getDetails(r.id ?? 0))
  );
  return Promise.all(
    detailed.map(async show => {
      const exists = await WatchlistRepository.show.item.exists(uid, String(show.id));
      return ShowActionableCardModel(show, exists);
    })
  );
}

export async function searchMovies(uid: string, query: string): Promise<ActionableCardModel[]> {
  const movies = await TMDB.search.getMovies({ query });
  const detailed = await Promise.all(
    movies.results.map(r => TMDB.movie.getDetails(r.id ?? 0))
  );
  return Promise.all(
    detailed.map(async movie => {
      const exists = await WatchlistRepository.movie.item.exists(uid, String(movie.id));
      return MovieActionableCardModel(movie, exists);
    })
  );
}

export async function viewShows(uid: string, viewerUid?: string): Promise<WatchlistTabModel> {
  const tvShowWatchlist = await WatchlistRepository.show.list.getByUser(uid);
  const result = WatchlistModel(
    "TV Shows",
    tvShowWatchlist,
    MediaType.SHOW,
    uid === viewerUid
  );
  if (!result) {
    throw new Error("Watchlist not found");
  }
  return result;
}

export async function viewMovies(uid: string, viewerUid?: string): Promise<WatchlistTabModel> {
  const movieWatchlist = await WatchlistRepository.movie.list.getByUser(uid);
  const result = WatchlistModel(
    "Movies",
    movieWatchlist,
    MediaType.MOVIE,
    uid === viewerUid
  );
  if (!result) {
    throw new Error("Watchlist not found");
  }
  return result;
}