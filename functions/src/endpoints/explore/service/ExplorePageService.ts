import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import BodyPageHelper from "../../../helper/body-page/BodyPageHelper";
import SearchBarHelper from "../../../helper/searchbar/SearchBarHelper";
import * as TitleHelper from "../../../helper/title/TitleHelper";
import { DetailPageBodyProps } from "../../detail/model/DetailPageProps";
import { ExplorePageProps } from "../model/ExplorePageProps";

class ExplorePageService {
  public static async getMovieExplorePage(query?: LanguageParams): Promise<ExplorePageProps> {
    const body: DetailPageBodyProps = await BodyPageHelper.movie.getExplore(query);
    return {
      title: TitleHelper.movie.getExplore(),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      body
    };
  }

  public static async getShowExplorePage(query?: LanguageParams): Promise<ExplorePageProps> {
    const body: DetailPageBodyProps = await BodyPageHelper.show.getExplore(query);
    return {
      title: TitleHelper.show.getExplore(),
      searchbar: SearchBarHelper.show.getSearchbar(),
      body
    };
  }

  public static async getPeopleExplorePage(): Promise<ExplorePageProps> {
    const body: DetailPageBodyProps = await BodyPageHelper.people.getExplore();
    return {
      title: TitleHelper.people.getExplore(),
      searchbar: SearchBarHelper.people.getSearchbar(),
      body
    };
  }
}

export default ExplorePageService;
