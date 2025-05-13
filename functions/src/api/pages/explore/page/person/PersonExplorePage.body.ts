import { ExplorePageBodyModel } from "@shared/model/pages/explore/ExplorePageModel";
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { PeopleResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "tmdb/TMDB";
import Sections from "./PersonExplorePage.sections";

const Body = async (query?: LanguageParams): Promise<ExplorePageBodyModel> => {
    const popular: PeopleResponse = await TMDB.person.getPopular();

    return {
        sections: Sections({ popular })
    };
};

export default Body;