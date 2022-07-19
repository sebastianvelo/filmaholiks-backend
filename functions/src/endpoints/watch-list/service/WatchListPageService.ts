import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import TMDB from "../../../tmdb/TMDB";
import CardService from "../../common/service/card/CardService";
import { ItemProps, WatchListPageProps } from "../model/WatchListPageProps";

const resp = (user: string) => ({
  columns: [
    {
      title: user || "Category 1",
      items: [
        {
          title: "Item 1",
          poster: {
            alt: "",
            src: "https://picsum.photos/200/300"
          },
          info: "1/4 seasons",
          path: ""
        }
      ]
    }
  ]
})

class WatchListPageService {
  public static async shows(user: string): Promise<WatchListPageProps> {
    return resp(user);
  }

  public static async movies(user: string): Promise<WatchListPageProps> {
    return resp(user);
  }

  public static async showsSuggestions(query: string): Promise<ItemProps[]> {
    const shows: TVShowsResponse = await TMDB.search.getTVShows({ query });

    return shows.results.map(CardService.getShowSuggestionCard);
  }
}

export default WatchListPageService;
