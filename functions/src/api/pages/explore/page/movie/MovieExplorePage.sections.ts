import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../../shared/model/components/section/Section";
import MovieCardVerticalModel from "../../../common/card/vertical/MovieCardVerticalModel";

interface MovieSections {
    topRated: MoviesResponse;
    nowPlaying: MoviesResponse;
    upcoming: MoviesResponse;
    popular: MoviesResponse;
    dailyTrending: MoviesResponse;
    weeklyTrending: MoviesResponse;
}

const Sections = (sections: MovieSections): CardsSectionModel[] => [
    {
        id: "daily-trending",
        title: "Trending today",
        cards: sections.dailyTrending.results?.map(MovieCardVerticalModel)
    },
    {
        id: "weekly-trending",
        title: "Trending this week",
        cards: sections.weeklyTrending.results?.map(MovieCardVerticalModel)
    },
    {
        id: "popular",
        title: "Popular movies",
        cards: sections.popular.results?.map(MovieCardVerticalModel)
    },
    {
        id: "topRated",
        title: "Top rated",
        cards: sections.topRated.results?.map(MovieCardVerticalModel)
    },
    {
        id: "latest",
        title: "Now playing",
        cards: sections.nowPlaying.results?.map(MovieCardVerticalModel)
    },
    {
        id: "upcoming",
        title: "Upcoming movies",
        cards: sections.upcoming.results?.map(MovieCardVerticalModel)
    }
];

export default Sections;