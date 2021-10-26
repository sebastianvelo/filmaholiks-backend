import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import TMDB from "../../../tmdb/TMDB";
import getImage from "../../../usecases/GetImage";
import { CardProps } from "../../common/model/CardProps";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExploreService {
  public static async getMovieExplorePage(
  ): Promise<ExplorePageProps> {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming();
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies();
    return {
      searchbar: {},
      sections: [
        {
          id: 'upcoming',
          title: 'Upcoming movies',
          cards: upcoming.results.map(ExploreService.getMovieCard)
        },
        {
          id: 'top',
          title: 'Top rated movies',
          cards: topRated.results.map(ExploreService.getMovieCard)
        }
      ]
    };
  }

  private static getMovieCard = (movie: MovieResponse): CardProps => ({
    title: movie.title,
    subtitle: movie.release_date,
    image: getImage(movie.poster_path, movie.title)
  });

  public static async getTVShowExplorePage(
  ): Promise<ExplorePageProps> {
    const onTheAir = await TMDB.tvShow.getOnTheAir();
    return {
      searchbar: {},
      sections: [
        {
          id: 'tv',
          title: 'On the air',
          cards: onTheAir.results.map(ExploreService.getTVCard)
        }
      ]
    };
  }

  private static getTVCard = (show: TVShowResponse): CardProps => ({
    title: show.title,
    subtitle: show.release_date,
    image: getImage(show.poster_path, show.title)
  });
}

export default ExploreService;
