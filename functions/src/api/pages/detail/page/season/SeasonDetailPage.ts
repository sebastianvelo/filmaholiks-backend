import SearchBar from "@api/pages/common/search/Show.search";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import Body from "./SeasonDetailPage.body";

const SeasonDetailPage = async ({ season, seasonNumber, showId }: { season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string }): Promise<DetailPageModel> => {
  const body = await Body(season, showId, seasonNumber);

  return {
    title: TitleHelper.season.getDetail(season),
    searchbar: SearchBar(),
    body
  };
};

export default SeasonDetailPage;