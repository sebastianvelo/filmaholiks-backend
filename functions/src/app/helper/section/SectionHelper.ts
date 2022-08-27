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
import * as CardHelper from "../../model/card/CardHelper";

interface MovieDetail {
  credits: CreditsResponse;
  moreLikeThis: MoviesResponse;
  images: ImagesResponse;
}

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
    getDetail: (data: MovieDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardHelper.getCastMemberCard)
      },
      {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(CardHelper.getGalleryImage)
      },
    ],
    getExplore: (data: MovieExplore): CardsSectionModel[] => [
      {
        id: "daily-trending",
        title: "Trending today",
        cards: data.dailyTrending.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "weekly-trending",
        title: "Trending this week",
        cards: data.weeklyTrending.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "popular",
        title: "Popular movies",
        cards: data.popular.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "latest",
        title: "Now playing",
        cards: data.nowPlaying.results?.map(CardHelper.getMovieCard)
      },
      {
        id: "upcoming",
        title: "Upcoming movies",
        cards: data.upcoming.results?.map(CardHelper.getMovieCard)
      }
    ]
  };

  public static show = {
    getExplore: (data: ShowExplore): CardsSectionModel[] => [
      {
        id: "daily-trending",
        title: "Trending today",
        cards: data.dailyTrending.results?.map(CardHelper.getShowCard)
      },
      {
        id: "weekly-trending",
        title: "Trending this week",
        cards: data.weeklyTrending.results?.map(CardHelper.getShowCard)
      },
      {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(CardHelper.getShowCard)
      },
      {
        id: "popular",
        title: "Popular shows",
        cards: data.popular.results?.map(CardHelper.getShowCard)
      },
      {
        id: "airingToday",
        title: "Airing today",
        cards: data.airingToday.results?.map(CardHelper.getShowCard)
      },
      {
        id: "onTheAir",
        title: "On the air",
        cards: data.onTheAir.results?.map(CardHelper.getShowCard)
      },
    ],
    getDetail: (data: ShowDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast?.map(CardHelper.getCastMemberCard)
      },
      {
        id: "seasons",
        title: "Seasons",
        cards: data.show.seasons?.map((season) =>
          CardHelper.getSeasonCard(season, data.show.id)
        )
      },
      {
        id: "top-rated",
        title: "Top rated episodes",
        cards: data.topRatedEpisodes?.map((episode) =>
          CardHelper.getTopRatedEpisodeCard(episode, data.show.id)
        )
      },
      {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(CardHelper.getShowCard)
      },
      {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(CardHelper.getGalleryImage)
      },
    ]
  };

  public static people = {
    getExplore: (data: PersonExplore): CardsSectionModel[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(CardHelper.getPersonCard)
      }
    ],
    getDetail: (data: PersonDetail): CardsSectionModel[] => [
      {
        id: "tv-shows",
        title: "TV Shows",
        cards: data.shows.cast.map(CardHelper.getShowAppareances)
      },
      {
        id: "movies",
        title: "Movies",
        cards: data.movies.cast.map(CardHelper.getMovieAppareances)
      },
    ]
  }

  public static season = {
    getDetail: (data: SeasonDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardHelper.getCastMemberCard)
      },
      {
        id: "episodes",
        title: "Episodes",
        cards: data.season.episodes?.map((episode) =>
          CardHelper.getEpisodeCard(episode, +data.showId)
        )
      },
    ]
  };

  public static episode = {
    getDetail: (data: EpisodeDetail): CardsSectionModel[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardHelper.getCastMemberCard)
      },
      {
        id: "crew",
        title: "Crew",
        cards: data.crew.map(CardHelper.getCrewCard)
      },
      {
        id: "guest_stars",
        title: "Guest stars",
        cards: data.guestStars.map(CardHelper.getCastMemberCard)
      },
      {
        id: "episodes",
        title: "More episodes",
        cards: data.moreEpisodes?.map((episode) =>
          CardHelper.getEpisodeCard(episode, +data.showId)
        )
      },
    ]
  };

}

export default SectionHelper;
