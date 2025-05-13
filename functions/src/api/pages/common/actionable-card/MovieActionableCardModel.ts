import { Movie } from "tmdb-js/lib/api/model/film/Film";
import ActionableCardModel from "@shared/model/components/ActionableCardModel";
import MovieCardHorizontalModel from "../card/horizontal/MovieCardHorizontalModel";

const MovieActionableCardModel = (movie: Movie, del: boolean): ActionableCardModel => ({
    item: MovieCardHorizontalModel(movie),
    delete: del,
});

export default MovieActionableCardModel;