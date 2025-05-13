import ShowCardVerticalModel from "@api/pages/common/card/vertical/ShowCardVerticalModel";
import { CardsSectionModel } from "@shared/model/components/section/Section";
import { TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

interface ShowSections {
    topRated: TVShowsResponse;
    onTheAir: TVShowsResponse;
    popular: TVShowsResponse;
    airingToday: TVShowsResponse;
    dailyTrending: TVShowsResponse;
    weeklyTrending: TVShowsResponse;
}

const Sections = (sections: ShowSections): CardsSectionModel[] => [
    {
        id: "daily-trending",
        title: "Trending today",
        cards: sections.dailyTrending.results?.map(ShowCardVerticalModel)
    },
    {
        id: "weekly-trending",
        title: "Trending this week",
        cards: sections.weeklyTrending.results?.map(ShowCardVerticalModel)
    },
    {
        id: "topRated",
        title: "Top rated",
        cards: sections.topRated.results?.map(ShowCardVerticalModel)
    },
    {
        id: "popular",
        title: "Popular shows",
        cards: sections.popular.results?.map(ShowCardVerticalModel)
    },
    {
        id: "airingToday",
        title: "Airing today",
        cards: sections.airingToday.results?.map(ShowCardVerticalModel)
    },
    {
        id: "onTheAir",
        title: "On the air",
        cards: sections.onTheAir.results?.map(ShowCardVerticalModel)
    },
];

export default Sections;