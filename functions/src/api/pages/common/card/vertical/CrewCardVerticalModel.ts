import { CreditPerson } from "tmdb-js/lib/api/model/credit/Credit";
import CardVerticalModel from "../@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "../@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const CrewCardVerticalModel = (castMember: CreditPerson): CardVerticalModel => ({
  title: castMember.name,
  subtitle: `as ${castMember.character}`,
  image: getTMDBImage(castMember.profile_path, castMember.name),
  path: PageRouteBuilder.PERSON_DETAIL(castMember.id)
});

export default CrewCardVerticalModel;