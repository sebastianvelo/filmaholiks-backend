import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import PersonCardVerticalModel from "../../card/vertical/PersonCardVerticalModel";

interface PersonExplore {
    popular: PeopleResponse;
}

const PersonExploreSectionsModel = (data: PersonExplore): CardsSectionModel[] => [
    {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(PersonCardVerticalModel)
    }
];

export default PersonExploreSectionsModel;