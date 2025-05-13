import ExplorePageModel from "shared/model/pages/explore/ExplorePageModel";
import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import MovieExplorePage from "./page/movie/MovieExplorePage";
import PersonExplorePage from "./page/person/PersonExplorePage";
import ShowExplorePage from "./page/show/ShowExplorePage";

class ExplorePageService {
  public static async getMovie(query?: LanguageParams): Promise<ExplorePageModel> {
    return MovieExplorePage(query);
  }

  public static async getShow(query?: LanguageParams): Promise<ExplorePageModel> {
    return ShowExplorePage(query);
  }

  public static async getPeople(): Promise<ExplorePageModel> {
    return PersonExplorePage();
  }
}

export default ExplorePageService;
