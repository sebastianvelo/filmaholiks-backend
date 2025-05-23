import { CreditsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import TMDB from "@TMDB/TMDB";
import Header from "./EpisodeDetailPage.header";
import Sections from "./EpisodeDetailPage.sections";

const Body = async (episode: EpisodeResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyModel> => {
    const episodeNumber = Number(episode.episode_number);
    const videos: VideosResponse = await TMDB.episode.getVideos(+showId, +seasonNumber, episodeNumber);
    const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
    const season: SeasonWithEpisodesResponse = await TMDB.season.getDetails(+showId, +seasonNumber);

    return {
        detail: Header(episode, videos),
        sections: Sections({
            moreEpisodes: season.episodes,
            showId,
            credits,
            guestStars: episode.guest_stars ?? [],
            crew: episode.crew ?? [],
        })
    };
};

export default Body;