import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Character, Episode, GuestStar } from "tmdb-js/lib/api/model/episode/Episode";
import { CardsSectionModel } from "@shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../../common/card/vertical/CastMemberCardVerticalModel";
import CrewCardVerticalModel from "../../../common/card/vertical/CrewCardVerticalModel";
import EpisodeCardVerticalModel from "../../../common/card/vertical/EpisodeCardVerticalModel";

interface EpisodeDetail {
    moreEpisodes?: Episode[];
    showId: string;
    credits: CreditsResponse;
    guestStars: GuestStar[];
    crew: Character[];
}

const Sections = (data: EpisodeDetail): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CastMemberCardVerticalModel)
    },
    {
        id: "crew",
        title: "Crew",
        cards: data.crew.map(CrewCardVerticalModel)
    },
    {
        id: "guest_stars",
        title: "Guest stars",
        cards: data.guestStars.map(CastMemberCardVerticalModel)
    },
    {
        id: "episodes",
        title: "More episodes",
        cards: data.moreEpisodes?.map((episode) =>
            EpisodeCardVerticalModel(episode, +data.showId)
        )
    },
]

export default Sections;