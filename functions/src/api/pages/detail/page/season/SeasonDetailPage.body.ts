import { CreditsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import TMDB from "@TMDB/TMDB";
import Sections from "./SeasonDetailPage.sections";
import Header from "./SeasonDetailPage.header";

const Body = async (season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyModel> => {
    const videos: VideosResponse = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
    
    return {
        detail: Header(season, videos),
        sections: Sections({
            season,
            showId,
            credits,
        })
    };
};

export default Body;