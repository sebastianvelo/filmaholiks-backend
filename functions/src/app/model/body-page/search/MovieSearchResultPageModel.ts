import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import { getMovieCard } from "../../../helper/card/CardHelper";
import getResults from "../../../helper/results/ResultsHelper";

const MovieSearchResultPageModel = (movies: MoviesResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(movies.results, getMovieCard, query)
});

export default MovieSearchResultPageModel;