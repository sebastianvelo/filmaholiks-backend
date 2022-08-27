import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SearchResultPageBodyModel } from "../../../../shared/model/pages/search-result/SearchResultPageModel";
import getResults from "../../../helper/results/ResultsHelper";
import PersonCardVerticalModel from "../../card/vertical/PersonCardVerticalModel";

const PersonSearchResultPageBodyModel = (people: PeopleResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(people.results, PersonCardVerticalModel, query)
});

export default PersonSearchResultPageBodyModel;