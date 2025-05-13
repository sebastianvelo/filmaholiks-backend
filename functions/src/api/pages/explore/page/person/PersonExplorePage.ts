import { DetailPageBodyModel } from "shared/model/pages/detail/DetailPageModel";
import ExplorePageModel from "shared/model/pages/explore/ExplorePageModel";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import SearchPerson from "../../../common/search/Person.search";
import Body from "./PersonExplorePage.body";

const PersonExplorePage = async (): Promise<ExplorePageModel> => {
  const body: DetailPageBodyModel = await Body();
  
  return {
    title: TitleHelper.people.getExplore(),
    searchbar: SearchPerson(),
    body
  };
};

export default PersonExplorePage;
