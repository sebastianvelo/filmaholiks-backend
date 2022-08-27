import { CreditsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import * as DetailHelper from "../../../helper/detail/DetailHelper";
import SectionHelper from "../../../helper/section/SectionHelper";

const SeasonDetailPageBodyModel = async (season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyModel> => {
    const videos: VideosResponse = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
    return {
        detail: DetailHelper.getSeason(season, videos),
        sections: SectionHelper.season.getDetail({
            season,
            showId,
            credits,
        })
    };
};

export default SeasonDetailPageBodyModel;