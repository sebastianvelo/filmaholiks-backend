import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import CardHorizontalModel from "../../../../../shared/model/components/CardHorizontalModel";
import { PageRouteBuilder } from "../../../../../shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const getTags = (show: TVShowResponse) => {
    const strTags = show.genres?.map((genre) => genre.name as string);
    const tags = [];

    if (strTags?.includes("Comedy")) tags.push("Comedy");
    else tags.push("Drama");
    
    if (strTags?.includes("Animation")) tags.push("Animation");

    return tags;
}

const ShowCardHorizontalModel = (show: TVShowResponse): CardHorizontalModel => ({
    id: show.id ?? -1,
    title: show.original_name,
    image: getTMDBImage(show.poster_path, show.title),
    subtitle: `${show.seasons?.filter(season => season.season_number).length} seasons`,
    tags: getTags(show),
    path: PageRouteBuilder.SHOW_DETAIL(show.id),
});

export default ShowCardHorizontalModel;