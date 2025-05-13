import getResults from "@api/helper/results/ResultsHelper";
import MovieCardVerticalModel from "@api/pages/common/card/vertical/MovieCardVerticalModel";
import { SearchResultPageBodyModel } from "@shared/model/pages/search-result/SearchResultPageModel";
import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

const Body = (movies: MoviesResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(movies.results, MovieCardVerticalModel, query)
});

export default Body;