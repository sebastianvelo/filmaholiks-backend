import { Movie } from "tmdb-js/lib/api/model/film/Film";
import CardHorizontalModel from "../@shared/model/components/CardHorizontalModel";
import { PageRouteBuilder } from "../@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const MovieCardHorizontalModel = (movie: Movie): CardHorizontalModel => ({
    id: movie.id ?? -1,
    title: movie.title,
    image: getTMDBImage(movie.poster_path, movie.title),
    subtitle: `${movie.vote_average}/10 ⭐️`,
    path: PageRouteBuilder.MOVIE_DETAIL(movie.id)
});

export default MovieCardHorizontalModel;