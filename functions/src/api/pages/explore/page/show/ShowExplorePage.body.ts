import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ExplorePageBodyModel } from "@shared/model/pages/explore/ExplorePageModel";
import TMDB from "@TMDB/TMDB";
import Sections from "./ShowExplorePage.sections";

const Body = async (query?: LanguageParams): Promise<ExplorePageBodyModel> => {
    const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir(query);
    const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows(query);
    const popular: TVShowsResponse = await TMDB.tvShow.getPopularShows(query);
    const airingToday: TVShowsResponse = await TMDB.tvShow.getAiringToday(query);
    const dailyTrending: TVShowsResponse = await TMDB.trending.getTVShows("day");
    const weeklyTrending: TVShowsResponse = await TMDB.trending.getTVShows("week");

    return {
        sections: Sections({
            onTheAir,
            topRated,
            popular,
            airingToday,
            dailyTrending,
            weeklyTrending
        })
    };
};

export default Body;