import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import DetailPageModel from "../../../../shared/model/pages/detail/DetailPageModel";
import * as TitleHelper from "../../../helper/title/TitleHelper";
import Body from "./ShowDetailPage.body";
import SearchBar from "./ShowDetailPage.search";

const ShowDetailPage = async ({ show, viewerUid }: { show: TVShowResponse, viewerUid?: string }): Promise<DetailPageModel> => {
  const body = await Body(show, viewerUid);

  return {
    title: TitleHelper.show.getDetail(show),
    searchbar: SearchBar(),
    body
  };
}

export default ShowDetailPage;