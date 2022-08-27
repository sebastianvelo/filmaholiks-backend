import { CreditsResponse, ImagesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../card/vertical/CastMemberCardVerticalModel";
import SeasonCardVerticalModel from "../../card/vertical/SeasonCardVerticalModel";

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
    }
];

export default ShowDetailSectionsModel;