import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import CardVerticalModel from "../@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "../@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const SeasonCardVerticalModel = (season: SeasonResponse, show?: number): CardVerticalModel => ({
    title: `${season.name} `,
    subtitle: `${season.episode_count} episodes`,
    image: getTMDBImage(season.poster_path, season.name),
    path: PageRouteBuilder.SEASON_DETAIL(show!, season.season_number)
});

export default SeasonCardVerticalModel;