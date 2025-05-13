import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import getResults from "../../../helper/results/ResultsHelper";
import MovieCardVerticalModel from "../../../pages/common/card/vertical/MovieCardVerticalModel";

const MovieSearchResultPageBodyModel = (movies: MoviesResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(movies.results, MovieCardVerticalModel, query)
});

export default MovieSearchResultPageBodyModel;