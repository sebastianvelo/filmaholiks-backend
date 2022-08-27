import {
  CreditsResponse, ImagesResponse,
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { Character, Episode, GuestStar } from "tmdb-js/lib/api/model/episode/Episode";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardsSectionModel } from "../../../shared/model/components/section/Section";
import CastMemberCardVerticalModel from "../card/vertical/CastMemberCardVerticalModel";
import CrewCardVerticalModel from "../card/vertical/CrewCardVerticalModel";
import EpisodeCardVerticalModel from "../card/vertical/EpisodeCardVerticalModel";
import GalleryImageCardVerticalModel from "../card/vertical/GalleryImageCardVerticalModel";
import MovieAppareancesCardVerticalModel from "../card/vertical/MovieAppareancesCardVerticalModel";
import MovieCardVerticalModel from "../card/vertical/MovieCardVerticalModel";
import PersonCardVerticalModel from "../card/vertical/PersonCardVerticalModel";
import SeasonCardVerticalModel from "../card/vertical/SeasonCardVerticalModel";
import ShowAppareancesCardVerticalModel from "../card/vertical/ShowAppareancesCardVerticalModel";
import ShowCardVerticalModel from "../card/vertical/ShowCardVerticalModel";
import TopRatedEpisodeCardVerticalModel from "../card/vertical/TopRatedEpisodeCardVerticalModel";

interface ShowDetail {
  show: TVShowResponse;
  moreLikeThis: TVShowsResponse;
  topRatedEpisodes: Episode[];
  credits: CreditsResponse;
  images: ImagesResponse;
}

interface PersonDetail {
  shows: CreditsResponse;
  movies: CreditsResponse;
}

interface SeasonDetail {
  season: SeasonWithEpisodesResponse;
  showId: string;
  credits: CreditsResponse;
}

interface EpisodeDetail {
  moreEpisodes?: Episode[];
  showId: string;
  credits: CreditsResponse;
  guestStars: GuestStar[];
  crew: Character[];
}

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
    getDetail: (data: ShowDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast?.map(CastMemberCardVerticalModel)
      },
      {
        id: "seasons",
        title: "Seasons",
        cards: data.show.seasons?.map((season) =>
          SeasonCardVerticalModel(season, data.show.id)
        )
      },
      {
        id: "top-rated",
        title: "Top rated episodes",
        cards: data.topRatedEpisodes?.map((episode) =>
          TopRatedEpisodeCardVerticalModel(episode, data.show.id)
        )
      },
      {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(ShowCardVerticalModel)
      },
      {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(GalleryImageCardVerticalModel)
      },
    ]
  };

  public static people = {
    getExplore: (data: PersonExplore): CardsSectionModel[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(PersonCardVerticalModel)
      }
    ],
    getDetail: (data: PersonDetail): CardsSectionModel[] => [
      {
        id: "tv-shows",
        title: "TV Shows",
        cards: data.shows.cast.map(ShowAppareancesCardVerticalModel)
      },
      {
        id: "movies",
        title: "Movies",
        cards: data.movies.cast.map(MovieAppareancesCardVerticalModel)
      },
    ]
  }

  public static season = {
    getDetail: (data: SeasonDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CastMemberCardVerticalModel)
      },
      {
        id: "episodes",
        title: "Episodes",
        cards: data.season.episodes?.map((episode) =>
          EpisodeCardVerticalModel(episode, +data.showId)
        )
      },
    ]
  };

  public static episode = {
    getDetail: (data: EpisodeDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CastMemberCardVerticalModel)
      },
      {
        id: "crew",
        title: "Crew",
        cards: data.crew.map(CrewCardVerticalModel)
      },
      {
        id: "guest_stars",
        title: "Guest stars",
        cards: data.guestStars.map(CastMemberCardVerticalModel)
      },
      {
        id: "episodes",
        title: "More episodes",
        cards: data.moreEpisodes?.map((episode) =>
          EpisodeCardVerticalModel(episode, +data.showId)
        )
      },
    ]
  };

}

export default SectionHelper;
