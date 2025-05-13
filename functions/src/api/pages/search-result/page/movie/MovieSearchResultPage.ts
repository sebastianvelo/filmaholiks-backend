import SearchBar from "@api/pages/common/search/Movie.search";
import * as TitleHelper from "@helper/title/TitleHelper";
import SearchResultPageModel from "shared/model/pages/search-result/SearchResultPageModel";
import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import Body from "./MovieSearchResultPage.body";

/**
 * Creates a movie search result page model
 * @param movies The movies response from API
 * @param query The search query
 */
const MovieSearchResultPage = (movies: MoviesResponse, query: string): SearchResultPageModel => {
    return {
        title: TitleHelper.search.getTitle(query),
        searchbar: SearchBar(),
        body: Body(movies, query)
    };
};

export default MovieSearchResultPage;