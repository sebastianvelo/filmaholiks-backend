import PersonCardVerticalModel from "@api/pages/common/card/vertical/PersonCardVerticalModel";
import { CardsSectionModel } from "shared/model/components/section/Section";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

interface PersonExplore {
    popular: PeopleResponse;
}

const Sections = (data: PersonExplore): CardsSectionModel[] => [
    {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(PersonCardVerticalModel)
    }
];

export default Sections;