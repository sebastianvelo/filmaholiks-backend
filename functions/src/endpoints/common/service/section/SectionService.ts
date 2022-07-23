import {
  CreditsResponse,
  ImagesResponse,
  MoviesResponse,
  PeopleResponse,
  TVShowsResponse
} from "tmdb-js/lib/api/common/response/CommonResponse";
import { Character, GuestStar } from "tmdb-js/lib/api/model/episode/Episode";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { CardsSectionProps } from "../../model/CarouselSectionProps";
import CardService from "../card/CardService";

class SectionService {
  public static getShowDetailSections = (data: {
    show: TVShowResponse;
    moreLikeThis: TVShowsResponse;
    credits: CreditsResponse;
    images: ImagesResponse;
  }): CardsSectionProps[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast?.map(CardService.getCastMemberCard)
      },
      {
        id: "seasons",
        title: "Seasons",
        cards: data.show.seasons?.map((season) =>
          CardService.getSeasonCard(season, data.show.id)
        )
      },
      {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(CardService.getShowCard)
      },
      {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(CardService.getGalleryImage)
      },
    ];

  public static getMovieDetailSections = (data: {
    credits: CreditsResponse;
    moreLikeThis: MoviesResponse;
    images: ImagesResponse;
  }): CardsSectionProps[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardService.getCastMemberCard)
      },
      {
        id: "moreLikeThis",
        title: "More like this",
        cards: data.moreLikeThis.results?.map(CardService.getMovieCard)
      },
      {
        id: "posters-gallery",
        title: "Posters",
        cards: data.images?.posters?.map(CardService.getGalleryImage)
      },
    ];

  public static getPersonDetailSections = (data: {
    shows: CreditsResponse;
    movies: CreditsResponse;
  }): CardsSectionProps[] => [
      {
        id: "tv-shows",
        title: "TV Shows",
        cards: data.shows.cast.map(CardService.getShowAppareances)
      },
      {
        id: "movies",
        title: "Movies",
        cards: data.movies.cast.map(CardService.getMovieAppareances)
      }
    ];

  public static getMovieExploreSections = (data: {
    topRated: MoviesResponse;
    nowPlaying: MoviesResponse;
    upcoming: MoviesResponse;
    popular: MoviesResponse;
  }): CardsSectionProps[] => [
      {
        id: "popular",
        title: "Popular movies",
        cards: data.popular.results?.map(CardService.getMovieCard)
      },
      {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(CardService.getMovieCard)
      },
      {
        id: "latest",
        title: "Now playing",
        cards: data.nowPlaying.results?.map(CardService.getMovieCard)
      },
      {
        id: "upcoming",
        title: "Upcoming movies",
        cards: data.upcoming.results?.map(CardService.getMovieCard)
      }
    ];

  public static getShowExploreSections = (data: {
    topRated: TVShowsResponse;
    onTheAir: TVShowsResponse;
    popular: TVShowsResponse;
    airingToday: TVShowsResponse;
  }): CardsSectionProps[] => [
      {
        id: "topRated",
        title: "Top rated",
        cards: data.topRated.results?.map(CardService.getShowCard)
      },
      {
        id: "airingToday",
        title: "Airing today",
        cards: data.airingToday.results?.map(CardService.getShowCard)
      },
      {
        id: "popular",
        title: "Popular shows",
        cards: data.popular.results?.map(CardService.getShowCard)
      },
      {
        id: "onTheAir",
        title: "On the air",
        cards: data.onTheAir.results?.map(CardService.getShowCard)
      }
    ];

  public static getPeopleExploreSections = (data: {
    popular: PeopleResponse;
  }): CardsSectionProps[] => [
      {
        id: "popular",
        title: "Popular",
        cards: data.popular.results?.map(CardService.getPersonCard)
      }
    ];

  public static getSeasonDetailSections = (data: {
    season: SeasonWithEpisodesResponse;
    showId: string;
    credits: CreditsResponse;

  }): CardsSectionProps[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardService.getCastMemberCard)
      },
      {
        id: "episodes",
        title: "Episodes",
        cards: data.season.episodes?.map((episode) =>
          CardService.getEpisodeCard(episode, data.season, data.showId)
        )
      },
    ];

  public static getEpisodeDetailSections = (data: {
    season: SeasonWithEpisodesResponse;
    showId: string;
    credits: CreditsResponse;
    guestStars: GuestStar[];
    crew: Character[];
  }): CardsSectionProps[] => [
      {
        id: "cast",
        title: "Cast",
        cards: data.credits.cast.map(CardService.getCastMemberCard)
      },
      {
        id: "crew",
        title: "Crew",
        cards: data.crew.map(CardService.getCrewCard)
      },
      {
        id: "guest_stars",
        title: "Guest stars",
        cards: data.guestStars.map(CardService.getCastMemberCard)
      },
      {
        id: "episodes",
        title: "More episodes",
        cards: data.season.episodes?.map((episode) =>
          CardService.getEpisodeCard(episode, data.season, data.showId)
        )
      },
    ];
}

export default SectionService;
