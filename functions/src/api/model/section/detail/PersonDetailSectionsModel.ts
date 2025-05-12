import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import MovieAppareancesCardVerticalModel from "../../card/vertical/MovieAppareancesCardVerticalModel";
import ShowAppareancesCardVerticalModel from "../../card/vertical/ShowAppareancesCardVerticalModel";

interface PersonDetail {
    shows: CreditsResponse;
    movies: CreditsResponse;
}

const PersonDetailSectionsModel = (data: PersonDetail): CardsSectionModel[] => [
    {
        id: "tv-shows",
        title: "TV Shows",
        cards: data.shows.cast.map(ShowAppareancesCardVerticalModel)
    },
    {
        id: "movies",
        title: "Movies",
        cards: data.movies.cast.map(MovieAppareancesCardVerticalModel)
    },
];

export default PersonDetailSectionsModel;