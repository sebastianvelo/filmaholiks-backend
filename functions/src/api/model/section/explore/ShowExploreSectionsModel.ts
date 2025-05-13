import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import ShowCardVerticalModel from "../../../pages/common/card/vertical/ShowCardVerticalModel";

interface ShowExplore {
    topRated: TVShowsResponse;
    onTheAir: TVShowsResponse;
    popular: TVShowsResponse;
    airingToday: TVShowsResponse;
    dailyTrending: TVShowsResponse;
    weeklyTrending: TVShowsResponse;
}

const ShowExploreSectionsModel = (data: ShowExplore): CardsSectionModel[] => [
    {
        id: "daily-trending",
        title: "Trending today",
        cards: data.dailyTrending.results?.map(ShowCardVerticalModel)
    },
    {
        id: "weekly-trending",
        title: "Trending this week",
        cards: data.weeklyTrending.results?.map(ShowCardVerticalModel)
    },
    {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(ShowCardVerticalModel)
    },
    {
        id: "popular",
        title: "Popular shows",
        cards: data.popular.results?.map(ShowCardVerticalModel)
    },
    {
        id: "airingToday",
        title: "Airing today",
        cards: data.airingToday.results?.map(ShowCardVerticalModel)
    },
    {
        id: "onTheAir",
        title: "On the air",
        cards: data.onTheAir.results?.map(ShowCardVerticalModel)
    },
];

export default ShowExploreSectionsModel;