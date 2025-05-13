import getResults from "@api/helper/results/ResultsHelper";
import PersonCardVerticalModel from "@api/pages/common/card/vertical/PersonCardVerticalModel";
import { SearchResultPageBodyModel } from "shared/model/pages/search-result/SearchResultPageModel";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

const Body = (people: PeopleResponse, query: string): SearchResultPageBodyModel => ({
    results: getResults(people.results, PersonCardVerticalModel, query)
});

export default Body;