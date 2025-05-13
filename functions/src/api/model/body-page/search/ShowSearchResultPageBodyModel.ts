import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import getResults from "../../../helper/results/ResultsHelper";
import ShowCardVerticalModel from "../../../pages/common/card/vertical/ShowCardVerticalModel";

const ShowSearchResultPageBodyModel = (shows: TVShowsResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(shows.results, ShowCardVerticalModel, query)
});

export default ShowSearchResultPageBodyModel;