import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import { getShowCard } from "../../card/CardHelper";
import getResults from "../../../helper/results/ResultsHelper";

const ShowSearchResultPageBodyModel = (shows: TVShowsResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(shows.results, getShowCard, query)
});

export default ShowSearchResultPageBodyModel;