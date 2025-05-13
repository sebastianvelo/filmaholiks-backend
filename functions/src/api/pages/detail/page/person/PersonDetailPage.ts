import * as TitleHelper from "@helper/title/TitleHelper";
import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import Body from "./PersonDetailPage.body";
import SearchBar from "../../../common/search/Person.search";

const PersonDetailPage = async ({ person }: { person: PersonDetailsResponse }): Promise<DetailPageModel> => {
  const body = await Body(person);

  return {
    title: TitleHelper.people.getDetail(person),
    searchbar: SearchBar(),
    body
  };
}

export default PersonDetailPage;
