import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ExplorePageBodyModel } from "../../../../shared/model/pages/explore/ExplorePageModel";
import TMDB from "../../../../tmdb/TMDB";
import SectionHelper from "../../../helper/section/SectionHelper";

const PersonExplorePageBodyModel = async (query?: LanguageParams): Promise<ExplorePageBodyModel> => {
    const popular: PeopleResponse = await TMDB.person.getPopular();

    return {
        sections: SectionHelper.people.getExplore({ popular })
    };
};

export default PersonExplorePageBodyModel;