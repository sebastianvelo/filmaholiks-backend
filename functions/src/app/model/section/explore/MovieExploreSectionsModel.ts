import { MoviesResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../../shared/model/components/section/Section";
import MovieCardVerticalModel from "../../card/vertical/MovieCardVerticalModel";

interface MovieExplore {
    topRated: MoviesResponse;
    nowPlaying: MoviesResponse;
    upcoming: MoviesResponse;
    popular: MoviesResponse;
    dailyTrending: MoviesResponse;
    weeklyTrending: MoviesResponse;
}

const MovieExploreSectionsModel = (data: MovieExplore): CardsSectionModel[] => [
    {
        id: "daily-trending",
        title: "Trending today",
        cards: data.dailyTrending.results?.map(MovieCardVerticalModel)
    },
    {
        id: "weekly-trending",
        title: "Trending this week",
        cards: data.weeklyTrending.results?.map(MovieCardVerticalModel)
    },
    {
        id: "popular",
        title: "Popular movies",
        cards: data.popular.results?.map(MovieCardVerticalModel)
    },
    {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(MovieCardVerticalModel)
    },
    {
        id: "latest",
        title: "Now playing",
        cards: data.nowPlaying.results?.map(MovieCardVerticalModel)
    },
    {
        id: "upcoming",
        title: "Upcoming movies",
        cards: data.upcoming.results?.map(MovieCardVerticalModel)
    }
];

export default MovieExploreSectionsModel;