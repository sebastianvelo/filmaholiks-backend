import { CreditsResponse, ImagesResponse, MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../@shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../../common/card/vertical/CastMemberCardVerticalModel";
import GalleryImageCardVerticalModel from "../../../common/card/vertical/GalleryImageCardVerticalModel";
import MovieCardVerticalModel from "../../../common/card/vertical/MovieCardVerticalModel";

interface MovieSections {
    credits: CreditsResponse;
    moreLikeThis: MoviesResponse;
    images: ImagesResponse;
}

const Sections = (sections: MovieSections): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: sections.credits.cast.map(CastMemberCardVerticalModel)
    },
    {
        id: "moreLikeThis",
        title: "More like this",
        cards: sections.moreLikeThis.results?.map(MovieCardVerticalModel)
    },
    {
        id: "posters-gallery",
        title: "Posters",
        cards: sections.images?.posters?.map(GalleryImageCardVerticalModel)
    },
];

export default Sections;