import { DetailPageBodyModel } from "@shared/model/pages/detail/DetailPageModel";
import ExplorePageModel from "@shared/model/pages/explore/ExplorePageModel";
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import SearchShow from "../../../common/search/Show.search";
import Body from "./ShowExplorePage.body";

const ShowExplorePage = async (query?: LanguageParams): Promise<ExplorePageModel> => {
  const body: DetailPageBodyModel = await Body(query);

  return {
    title: TitleHelper.show.getExplore(),
    searchbar: SearchShow(),
    body
  };
}

export default ShowExplorePage;