import { DetailPageBodyModel } from "shared/model/pages/detail/DetailPageModel";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import TMDB from "tmdb/TMDB";
import Header from "./PersonDetailPage.header";
import Sections from "./PersonDetailPage.sections";

const Body = async (person: PersonDetailsResponse): Promise<DetailPageBodyModel> => {
  const id = Number(person.id);
  const shows = await TMDB.person.getTVShowCredits(id);
  const movies = await TMDB.person.getMovieCredits(id);

  return {
    detail: Header(person),
    sections: Sections({ shows, movies })
  };
};

export default Body;
