import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { DetailPageBodyModel } from "../../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../../tmdb/TMDB";
import Header from "./MovieDetailPage.header";
import Sections from "./MovieDetailPage.sections";

const Body = async (movie: MovieResponse, viewerUid?: string): Promise<DetailPageBodyModel> => {
    const id = Number(movie.id);
    const video = await TMDB.movie.getVideos(id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(id);
    const credits = await TMDB.movie.getCredits(id);
    const images = await TMDB.movie.getImages(id);
    const detail = await Header(movie, video, viewerUid);
    
    return {
        detail,
        sections: Sections({ credits, moreLikeThis, images })
    };
};

export default Body;