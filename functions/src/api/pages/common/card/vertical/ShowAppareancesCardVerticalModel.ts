import CardVerticalModel from "@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const ShowAppareancesCardVerticalModel = (castMember: any): CardVerticalModel => ({
    title: castMember.name,
    subtitle: `as ${castMember.character}`,
    image: getTMDBImage(castMember.poster_path, castMember.name),
    path: PageRouteBuilder.SHOW_DETAIL(castMember.id),
});

export default ShowAppareancesCardVerticalModel;