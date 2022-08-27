import { TVShow } from "tmdb-js/lib/api/model/film/Film";
import CardVerticalModel from "../../../../shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "../../../../shared/routes/PageRoute";
import { getTMDBImage } from "../../../helper/media/MediaHelper";

const ShowCardVerticalModel = (show: TVShow): CardVerticalModel => ({
    title: show.original_name,
    subtitle: `${show.first_air_date?.substring(0, 4)}`,
    image: getTMDBImage(show.poster_path, show.title),
    path: PageRouteBuilder.SHOW_DETAIL(show.id)
});

export default ShowCardVerticalModel;