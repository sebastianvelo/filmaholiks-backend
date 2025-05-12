import { CreditsResponse, ImagesResponse, MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../../card/vertical/CastMemberCardVerticalModel";
import GalleryImageCardVerticalModel from "../../card/vertical/GalleryImageCardVerticalModel";
import MovieCardVerticalModel from "../../card/vertical/MovieCardVerticalModel";

interface MovieDetail {
    credits: CreditsResponse;
    moreLikeThis: MoviesResponse;
    images: ImagesResponse;
}

const MovieDetailSectionsModel = (data: MovieDetail): CardsSectionModel[] => [
    {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CastMemberCardVerticalModel)
    },
    {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(MovieCardVerticalModel)
    },
    {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(GalleryImageCardVerticalModel)
    },
];

export default MovieDetailSectionsModel;