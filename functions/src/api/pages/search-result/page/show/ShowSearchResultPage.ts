import SearchBar from "@api/pages/common/search/Show.search";
import * as TitleHelper from "@helper/title/TitleHelper";
import SearchResultPageModel from "@shared/model/pages/search-result/SearchResultPageModel";
import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import Body from "./ShowSearchResultPage.body";

/**
 * Creates a TV show search result page model
 * @param shows The TV shows response from API
 * @param query The search query
 */
const ShowSearchResultPage = (shows: TVShowsResponse, query: string): SearchResultPageModel => ({
    title: TitleHelper.search.getTitle(query),
    searchbar: SearchBar(),
    body: Body(shows, query)
});

export default ShowSearchResultPage;