import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import { getPersonCard } from "../../../helper/card/CardHelper";
import getResults from "../../../helper/results/ResultsHelper";

const PersonSearchResultPageModel = (people: PeopleResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(people.results, getPersonCard, query)
});

export default PersonSearchResultPageModel;