import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ExplorePageBodyModel } from "../../../../shared/model/pages/explore/ExplorePageModel";
import TMDB from "../../../../tmdb/TMDB";
import MovieExploreSectionsModel from "../../section/explore/MovieExploreSectionsModel";

const MovieExplorePageBodyModel = async (query?: LanguageParams): Promise<ExplorePageBodyModel> => {
    const upcoming: MoviesResponse = await TMDB.movie.getUpcoming(query);
    const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies(query);
    const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying(query);
    const popular: MoviesResponse = await TMDB.movie.getPopularMovies(query);
    const dailyTrending: MoviesResponse = await TMDB.trending.getMovies("day");
    const weeklyTrending: MoviesResponse = await TMDB.trending.getMovies("week");

    return {
        sections: MovieExploreSectionsModel({
            upcoming,
            topRated,
            nowPlaying,
            popular,
            dailyTrending,
            weeklyTrending
        })
    };
};

export default MovieExplorePageBodyModel;