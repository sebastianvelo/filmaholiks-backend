import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import MovieDetailModel from "../../detail/MovieDetailModel";
import MovieDetailSectionsModel from "../../section/detail/MovieDetailSectionsModel";

const MovieDetailPageBodyModel = async (movie: MovieResponse): Promise<DetailPageBodyModel> => {
    const id = Number(movie.id);
    const video = await TMDB.movie.getVideos(id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(id);
    const credits = await TMDB.movie.getCredits(id);
    const images = await TMDB.movie.getImages(id);
    const detail = await MovieDetailModel(movie, video);
    
    return {
        detail,
        sections: MovieDetailSectionsModel({ credits, moreLikeThis, images })
    };
};

export default MovieDetailPageBodyModel;