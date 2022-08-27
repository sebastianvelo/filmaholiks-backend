import {
  PeopleResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../shared/model/components/section/Section";
import PersonCardVerticalModel from "../card/vertical/PersonCardVerticalModel";

interface PersonExplore {
  popular: PeopleResponse;
}

class SectionHelper {

  public static people = {
    getExplore: (data: PersonExplore): CardsSectionModel[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(PersonCardVerticalModel)
      }
    ],
  }

}

export default SectionHelper;
