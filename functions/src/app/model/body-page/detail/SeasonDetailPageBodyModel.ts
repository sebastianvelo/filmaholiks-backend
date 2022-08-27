import { CreditsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import * as DetailHelper from "../../../helper/detail/DetailHelper";
import SeasonDetailSectionsModel from "../../section/detail/SeasonDetailSectionsModel";

const SeasonDetailPageBodyModel = async (season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyModel> => {
    const videos: VideosResponse = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
    
    return {
        detail: DetailHelper.getSeason(season, videos),
        sections: SeasonDetailSectionsModel({
            season,
            showId,
            credits,
        })
    };
};

export default SeasonDetailPageBodyModel;