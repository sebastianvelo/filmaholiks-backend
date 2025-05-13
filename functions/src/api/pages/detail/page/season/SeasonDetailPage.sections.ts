import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { CardsSectionModel } from "../@shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../../common/card/vertical/CastMemberCardVerticalModel";
import EpisodeCardVerticalModel from "../../../common/card/vertical/EpisodeCardVerticalModel";

interface SeasonSections {
    season: SeasonWithEpisodesResponse;
    showId: string;
    credits: CreditsResponse;
}

const Sections = (sections: SeasonSections): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: sections.credits.cast.map(CastMemberCardVerticalModel)
    },
    {
        id: "episodes",
        title: "Episodes",
        cards: sections.season.episodes?.map((episode) =>
            EpisodeCardVerticalModel(episode, +sections.showId)
        )
    },
];

export default Sections;