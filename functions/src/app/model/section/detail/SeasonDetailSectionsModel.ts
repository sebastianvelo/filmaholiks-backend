import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../card/vertical/CastMemberCardVerticalModel";
import EpisodeCardVerticalModel from "../../card/vertical/EpisodeCardVerticalModel";

interface SeasonDetail {
    season: SeasonWithEpisodesResponse;
    showId: string;
    credits: CreditsResponse;
}

const SeasonDetailSectionsModel = (data: SeasonDetail): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CastMemberCardVerticalModel)
    },
    {
        id: "episodes",
        title: "Episodes",
        cards: data.season.episodes?.map((episode) =>
            EpisodeCardVerticalModel(episode, +data.showId)
        )
    },
];

export default SeasonDetailSectionsModel;