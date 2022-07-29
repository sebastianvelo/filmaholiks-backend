import {
  CreditsResponse, ImagesResponse,
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { Character, GuestStar } from "tmdb-js/lib/api/model/episode/Episode";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardsSectionProps } from "../../model/CarouselSectionProps";
import CardHelper from "../card/CardHelper";

interface MovieDetail {
  credits: CreditsResponse;
  moreLikeThis: MoviesResponse;
  images: ImagesResponse;
}

interface ShowDetail {
  show: TVShowResponse;
  moreLikeThis: TVShowsResponse;
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
  season: SeasonWithEpisodesResponse;
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
}

interface ShowExplore {
  topRated: TVShowsResponse;
  onTheAir: TVShowsResponse;
  popular: TVShowsResponse;
  airingToday: TVShowsResponse;
}

interface PersonExplore {
  popular: PeopleResponse;
}

class SectionHelper {

  public static movie = {
    getDetail: (data: MovieDetail): CardsSectionProps[] => [
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
    getExplore: (data: MovieExplore): CardsSectionProps[] => [
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
    getExplore: (data: ShowExplore): CardsSectionProps[] => [
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
      }, {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(CardHelper.getShowCard)
      },
    ],
    getDetail: (data: ShowDetail): CardsSectionProps[] => [
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
    getExplore: (data: PersonExplore): CardsSectionProps[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(CardHelper.getPersonCard)
      }
    ],
    getDetail: (data: PersonDetail): CardsSectionProps[] => [
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
    getDetail: (data: SeasonDetail): CardsSectionProps[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardHelper.getCastMemberCard)
      },
      {
        id: "episodes",
        title: "Episodes",
        cards: data.season.episodes?.map((episode) =>
          CardHelper.getEpisodeCard(episode, data.season, data.showId)
        )
      },
    ]
  };

  public static episode = {
    getDetail: (data: EpisodeDetail): CardsSectionProps[] => [
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
        cards: data.season.episodes?.map((episode) =>
          CardHelper.getEpisodeCard(episode, data.season, data.showId)
        )
      },
    ]
  };

}

export default SectionHelper;
