import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import DetailPageModel from "@shared/model/pages/detail/DetailPageModel";
import * as TitleHelper from "../../../../helper/title/TitleHelper";
import Body from "./EpisodeDetailPage.body";
import SearchBar from "../../../common/search/Show.search";

const EpisodeDetailPage = async ({ episode, showId, seasonNumber }: { showId: string, seasonNumber: string, episode: EpisodeResponse }): Promise<DetailPageModel> => {
  const body = await Body(episode, showId, seasonNumber);

  return {
    title: TitleHelper.episode.getDetail(episode),
    searchbar: SearchBar(),
    body
  };
}

export default EpisodeDetailPage;
