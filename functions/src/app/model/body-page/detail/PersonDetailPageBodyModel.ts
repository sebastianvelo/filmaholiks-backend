import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import * as DetailHelper from "../../detail/DetailHelper";
import PersonDetailSectionsModel from "../../section/detail/PersonDetailSectionsModel";

const PersonDetailPageBodyModel =  async (person: PersonDetailsResponse): Promise<DetailPageBodyModel> => {
    const id = Number(person.id);
    const shows = await TMDB.person.getTVShowCredits(id);
    const movies = await TMDB.person.getMovieCredits(id);

    return {
        detail: DetailHelper.getPerson(person),
        sections: PersonDetailSectionsModel({ shows, movies })
    };
};

export default PersonDetailPageBodyModel;