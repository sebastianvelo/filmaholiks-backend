import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { MediaSectionProps } from "../endpoints/common/model/MediaSectionProps";
import { getMovieCard, getPersonCard, getSeasonCard, getTVCard } from "./GetCard";

const getTVShowDetailSections = (
  show: TVShowResponse,
  moreLikeThis: TVShowsResponse
): MediaSectionProps[] => [
  {
    id: "seasons",
    title: "Seasons",
    cards: show.seasons.map(getSeasonCard)
  },
  {
    id: "moreLikeThis",
    title: "More like this",
    cards: moreLikeThis.results.map(getTVCard)
  }
];

const getMovieDetailSections = (
  show: MovieResponse,
  moreLikeThis: MoviesResponse
): MediaSectionProps[] => [
  {
    id: "moreLikeThis",
    title: "More like this",
    cards: moreLikeThis.results.map(getMovieCard)
  }
];

const getMovieExploreSections = (data: {
  topRated: MoviesResponse;
  nowPlaying: MoviesResponse;
  upcoming: MoviesResponse;
}) => [
  {
    id: "topRated",
    title: "Top rated",
    cards: data.topRated.results.map(getMovieCard)
  },
  {
    id: "latest",
    title: "Now playing",
    cards: data.nowPlaying.results.map(getMovieCard)
  },
  {
    id: "upcoming",
    title: "Upcoming movies",
    cards: data.upcoming.results.map(getMovieCard)
  }
];

const getTVShowExploreSections = (data: {
  topRated: TVShowsResponse;
  onTheAir: TVShowsResponse;
}) => [
  {
    id: "onTheAir",
    title: "On the air",
    cards: data.onTheAir.results.map(getTVCard)
  },
  {
    id: "topRated",
    title: "Top rated",
    cards: data.topRated.results.map(getTVCard)
  }
];

const getPeopleExploreSections = (data: {
  popular: PeopleResponse
}) =>  [
  {
    id: "popular",
    title: "Popular",
    cards: data.popular.results.map(getPersonCard)
  }
]

export {
  getTVShowDetailSections,
  getTVShowExploreSections,
  getMovieDetailSections,
  getMovieExploreSections,
  getPeopleExploreSections,
};
