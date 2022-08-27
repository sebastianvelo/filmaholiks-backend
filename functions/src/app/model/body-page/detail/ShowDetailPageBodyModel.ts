import { CreditsResponse, ImagesResponse, TVShowsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import ChartHelper from "../../../helper/chart/ChartHelper";
import ShowDetailModel from "../../detail/ShowDetailModel";
import ShowDetailSectionsModel from "../../section/detail/ShowDetailSectionsModel";

const getRating = (episode: Episode) => Number(episode.vote_average?.toFixed(1));

const sortByRating = (episodeA: Episode, episodeB: Episode) => getRating(episodeB) - getRating(episodeA);

const seasonEpisodes = async (show: TVShowResponse, seasonNumber: number) => {
    const season = await TMDB.season.getDetails(show.id ?? 0, seasonNumber);
    return season.episodes as Episode[];
};

const allEpisodes = (show: TVShowResponse) => Promise.all(
    show.seasons?.filter(season => season.season_number).map(async (season) => seasonEpisodes(show, season.season_number)) ?? []
);

const ShowDetailPageBodyModel = async (show: TVShowResponse): Promise<DetailPageBodyModel> => {
    const id = Number(show.id);
    const video: VideosResponse = await TMDB.tvShow.getVideos(id);
    const moreLikeThis: TVShowsResponse = await TMDB.tvShow.getTVRecommendations(id);
    const credits: CreditsResponse = await TMDB.tvShow.getCredits(id);
    const images: ImagesResponse = await TMDB.tvShow.getImages(id);
    const chartSeasons = await ChartHelper.showEpisodes.getChartSection(id, show.seasons);
    const topRatedEpisodes = (await allEpisodes(show)).flat().sort(sortByRating).slice(0, 30);
    const detail = await ShowDetailModel(show, video);

    return {
        detail,
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