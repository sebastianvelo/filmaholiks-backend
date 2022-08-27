import { CreditsResponse, ImagesResponse, TVShowsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import ChartHelper from "../../../helper/chart/ChartHelper";
import * as DetailHelper from "../../../helper/detail/DetailHelper";
import ShowDetailSectionsModel from "../../section/detail/ShowDetailSectionsModel";

const ShowDetailPageBodyModel = async (show: TVShowResponse): Promise<DetailPageBodyModel> => {
    const id = Number(show.id);
    const video: VideosResponse = await TMDB.tvShow.getVideos(id);
    const moreLikeThis: TVShowsResponse = await TMDB.tvShow.getTVRecommendations(id);
    const credits: CreditsResponse = await TMDB.tvShow.getCredits(id);
    const images: ImagesResponse = await TMDB.tvShow.getImages(id);
    const chartSeasons = await ChartHelper.showEpisodes.getChartSection(id, show.seasons);

    const seasonEpisodes = async (season: number) => {
        const s = await TMDB.season.getDetails(show.id ?? 0, season);
        return s.episodes as Episode[];
    };
    const allEpisodes = await Promise.all(
        show.seasons?.filter(season => season.season_number).map(async (season) => seasonEpisodes(season.season_number)) ?? []
    );
    const getRating = (episode: Episode) => Number(episode.vote_average?.toFixed(1));
    const sortByRating = (episodeA: Episode, episodeB: Episode) => getRating(episodeB) - getRating(episodeA);
    const topRatedEpisodes = allEpisodes.flat().sort(sortByRating).slice(0, 30);

    return {
        detail: DetailHelper.getShow(show, video),
        charts: [
            chartSeasons
        ],
        sections: ShowDetailSectionsModel({
            show,
            moreLikeThis,
            credits,
            images,
            topRatedEpisodes
        })
    };
};

export default ShowDetailPageBodyModel;