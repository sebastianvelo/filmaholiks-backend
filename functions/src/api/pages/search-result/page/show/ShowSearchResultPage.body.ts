import getResults from "@api/helper/results/ResultsHelper";
import ShowCardVerticalModel from "@api/pages/common/card/vertical/ShowCardVerticalModel";
import { SearchResultPageBodyModel } from "shared/model/pages/search-result/SearchResultPageModel";
import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

const Body = (shows: TVShowsResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(shows.results, ShowCardVerticalModel, query)
});

export default Body;