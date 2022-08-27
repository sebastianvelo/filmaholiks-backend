import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import { getShowCard } from "../../../helper/card/CardHelper";
import getResults from "../../../helper/results/ResultsHelper";

const ShowSearchResultPageModel = (shows: TVShowsResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(shows.results, getShowCard, query)
});

export default ShowSearchResultPageModel;