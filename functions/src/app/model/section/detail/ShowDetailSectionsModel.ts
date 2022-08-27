import { CreditsResponse, ImagesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../card/vertical/CastMemberCardVerticalModel";
import GalleryImageCardVerticalModel from "../../card/vertical/GalleryImageCardVerticalModel";
import SeasonCardVerticalModel from "../../card/vertical/SeasonCardVerticalModel";
import ShowCardVerticalModel from "../../card/vertical/ShowCardVerticalModel";
import TopRatedEpisodeCardVerticalModel from "../../card/vertical/TopRatedEpisodeCardVerticalModel";

interface ShowDetail {
    show: TVShowResponse;
    moreLikeThis: TVShowsResponse;
    topRatedEpisodes: Episode[];
    credits: CreditsResponse;
    images: ImagesResponse;
}

const ShowDetailSectionsModel = (data: ShowDetail): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast?.map(CastMemberCardVerticalModel)
    },
    {
        id: "seasons",
        title: "Seasons",
        cards: data.show.seasons?.map((season) =>
            SeasonCardVerticalModel(season, data.show.id)
        )
    },
    {
        id: "top-rated",
        title: "Top rated episodes",
        cards: data.topRatedEpisodes?.map((episode) =>
            TopRatedEpisodeCardVerticalModel(episode, data.show.id)
        )
    },
    {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(ShowCardVerticalModel)
    },
    {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(GalleryImageCardVerticalModel)
    },
];

export default ShowDetailSectionsModel;