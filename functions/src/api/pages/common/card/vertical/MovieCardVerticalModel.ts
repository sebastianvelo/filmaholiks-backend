import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import CardVerticalModel from "@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const MovieCardVerticalModel = (movie: MovieResponse): CardVerticalModel => ({
    title: movie.title,
    subtitle: `${movie.release_date?.substring(0, 4)}`,
    image: getTMDBImage(movie.poster_path, movie.title),
    path: PageRouteBuilder.MOVIE_DETAIL(movie.id)
});

export default MovieCardVerticalModel;