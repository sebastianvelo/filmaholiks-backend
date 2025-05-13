import SearchBar from "@api/pages/common/search/Show.search";
import * as TitleHelper from "@helper/title/TitleHelper";
import SearchResultPageModel from "@shared/model/pages/search-result/SearchResultPageModel";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import Body from "./PersonSearchResultPage.body";

/**
 * Creates a person search result page model
 * @param people The people response from API
 * @param query The search query
 */
const PersonSearchResultPage = (people: PeopleResponse, query: string): SearchResultPageModel => ({
    title: TitleHelper.search.getTitle(query),
    searchbar: SearchBar(),
    body: Body(people, query)
});

export default PersonSearchResultPage;