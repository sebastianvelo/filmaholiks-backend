import {
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { MediaSectionProps } from "../endpoints/common/model/MediaSectionProps";
import {
  getEpisodeCard,
  getMovieCard,
  getPersonCard,
  getSeasonCard,
  getTVCard
} from "./GetCard";

const getShowDetailSections = (
  show: TVShowResponse,
  moreLikeThis: TVShowsResponse
): MediaSectionProps[] => [
  {
    id: "seasons",
    title: "Seasons",
    cards: show.seasons?.map((season) => getSeasonCard(season, show.id))
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

const getShowExploreSections = (data: {
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

const getPeopleExploreSections = (data: { popular: PeopleResponse }) => [
  {
    id: "popular",
    title: "Popular",
    cards: data.popular.results.map(getPersonCard)
  }
];

const getSeasonExploreSections = (
  season: SeasonWithEpisodesResponse,
  show: string
) => [
  {
    id: "episodes",
    title: "Episodes",
    cards: season.episodes?.map((episode) => getEpisodeCard(episode, season, show))
  }
];

export {
  getShowDetailSections,
  getShowExploreSections,
  getMovieDetailSections,
  getMovieExploreSections,
  getPeopleExploreSections,
  getSeasonExploreSections
};
