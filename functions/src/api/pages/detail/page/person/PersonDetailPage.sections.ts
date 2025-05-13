import MovieAppareancesCardVerticalModel from "@api/pages/common/card/vertical/MovieAppareancesCardVerticalModel";
import ShowAppareancesCardVerticalModel from "@api/pages/common/card/vertical/ShowAppareancesCardVerticalModel";
import { CardsSectionModel } from "shared/model/components/section/Section";
import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

interface PersonSections {
  shows: CreditsResponse;
  movies: CreditsResponse;
}

const Sections = (sections: PersonSections): CardsSectionModel[] => [
  {
    id: "tv-shows",
    title: "TV Shows",
    cards: sections.shows.cast.map(ShowAppareancesCardVerticalModel)
  },
  {
    id: "movies",
    title: "Movies",
    cards: sections.movies.cast.map(MovieAppareancesCardVerticalModel)
  },
];

export default Sections;
