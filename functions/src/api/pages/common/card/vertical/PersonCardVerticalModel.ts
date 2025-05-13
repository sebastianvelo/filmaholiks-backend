import { PersonDetail } from "tmdb-js/lib/api/model/person/Person";
import CardVerticalModel from "@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const PersonCardVerticalModel = (person: PersonDetail): CardVerticalModel => ({
    title: person.name,
    subtitle: person.birthday,
    image: getTMDBImage(person.profile_path, person.name),
    path: PageRouteBuilder.PERSON_DETAIL(person.id)
  });

export default PersonCardVerticalModel;