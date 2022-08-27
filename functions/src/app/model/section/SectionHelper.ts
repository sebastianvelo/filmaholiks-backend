import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { CardsSectionModel } from "../../../shared/model/components/section/Section";
import MovieCardVerticalModel from "../card/vertical/MovieCardVerticalModel";
import PersonCardVerticalModel from "../card/vertical/PersonCardVerticalModel";
import ShowCardVerticalModel from "../card/vertical/ShowCardVerticalModel";

interface MovieExplore {
  topRated: MoviesResponse;
  nowPlaying: MoviesResponse;
  upcoming: MoviesResponse;
  popular: MoviesResponse;
  dailyTrending: MoviesResponse;
  weeklyTrending: MoviesResponse;
}

interface ShowExplore {
  topRated: TVShowsResponse;
  onTheAir: TVShowsResponse;
  popular: TVShowsResponse;
  airingToday: TVShowsResponse;
  dailyTrending: TVShowsResponse;
  weeklyTrending: TVShowsResponse;
}

interface PersonExplore {
  popular: PeopleResponse;
}

interface UserDetail {

}

class SectionHelper {

  public static user = {
    getDetail: (data: UserDetail): CardsSectionModel[] => [
    ],
  };

  public static movie = {
    getExplore: (data: MovieExplore): CardsSectionModel[] => [
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
    ]
  };

  public static show = {
    getExplore: (data: ShowExplore): CardsSectionModel[] => [
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
    ],
  };

  public static people = {
    getExplore: (data: PersonExplore): CardsSectionModel[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(PersonCardVerticalModel)
      }
    ],
  }

}

export default SectionHelper;
