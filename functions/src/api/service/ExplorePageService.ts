import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { DetailPageBodyModel } from "../../shared/model/pages/detail/DetailPageModel";
import ExplorePageModel from "../../shared/model/pages/explore/ExplorePageModel";
import * as TitleHelper from "../helper/title/TitleHelper";
import MovieExplorePageBodyModel from "../model/body-page/explore/MovieExplorePageBodyModel";
import PersonExplorePageBodyModel from "../model/body-page/explore/PersonExplorePageBodyModel";
import ShowExplorePageBodyModel from "../model/body-page/explore/ShowExplorePageBodyModel";
import MovieSearchBarModel from "../model/searchbar/MovieSearchBarModel";
import PersonSearchBarModel from "../model/searchbar/PersonSearchBarModel";
import ShowSearchBarModel from "../model/searchbar/ShowSearchBarModel";

class ExplorePageService {
  public static async getMovie(query?: LanguageParams): Promise<ExplorePageModel> {
    const body: DetailPageBodyModel = await MovieExplorePageBodyModel(query);
    return {
      title: TitleHelper.movie.getExplore(),
      searchbar: MovieSearchBarModel(),
      body
    };
  }

  public static async getShow(query?: LanguageParams): Promise<ExplorePageModel> {
    const body: DetailPageBodyModel = await ShowExplorePageBodyModel(query);
    return {
      title: TitleHelper.show.getExplore(),
      searchbar: ShowSearchBarModel(),
      body
    };
  }

  public static async getPeople(): Promise<ExplorePageModel> {
    const body: DetailPageBodyModel = await PersonExplorePageBodyModel();
    return {
      title: TitleHelper.people.getExplore(),
      searchbar: PersonSearchBarModel(),
      body
    };
  }
}

export default ExplorePageService;
