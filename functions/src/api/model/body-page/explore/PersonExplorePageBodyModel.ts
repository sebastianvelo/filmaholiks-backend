import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ExplorePageBodyModel } from "../../../../shared/model/pages/explore/ExplorePageModel";
import TMDB from "../../../../tmdb/TMDB";
import PersonExploreSectionsModel from "../../section/explore/PersonExploreSectionsModel";

const PersonExplorePageBodyModel = async (query?: LanguageParams): Promise<ExplorePageBodyModel> => {
    const popular: PeopleResponse = await TMDB.person.getPopular();

    return {
        sections: PersonExploreSectionsModel({ popular })
    };
};

export default PersonExplorePageBodyModel;