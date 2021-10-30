import { MoviesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import { getMovieCard, getTVCard } from "../../../usecases/GetCard";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExploreService {
  public static async getMovieExplorePage(): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming();
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies();
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying();
    return {
      searchbar: {
        placeholder: `Search movies...`,
        path: `/movie/search/:query`
      },
      sections: [
        {
          id: "topRated",
          title: "Top rated",
          cards: topRated.results.map(getMovieCard)
        },
        {
          id: "latest",
          title: "Now playing",
          cards: nowPlaying.results.map(getMovieCard)
        },
        {
          id: "upcoming",
          title: "Upcoming movies",
          cards: upcoming.results.map(getMovieCard)
        },
      ]
    };
  }

  public static async getTVShowExplorePage(): Promise<ExplorePageProps> {
    const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir();
    const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows();
    return {
      searchbar: {
        placeholder: `Search shows...`,
        path: `/tv/search/:query`
      },
      sections: [
        {
          id: "onTheAir",
          title: "On the air",
          cards: onTheAir.results.map(getTVCard)
        },
        {
          id: "topRated",
          title: "Top rated",
          cards: topRated.results.map(getTVCard)
        },
      ]
    };
  }
}

export default ExploreService;
