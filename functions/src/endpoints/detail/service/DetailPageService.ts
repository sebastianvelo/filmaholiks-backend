import TMDB from "../../../tmdb/TMDB";
import ChartService from "../../common/service/chart/ChartService";
import DetailService from "../../common/service/detail/DetailService";
import SearchBarService from "../../common/service/searchbar/SearchBarService";
import SectionService from "../../common/service/section/SectionService";
import TitleService from "../../common/service/title/TitleService";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailPageService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(+id);
    const credits = await TMDB.movie.getCredits(+id);
    const images = await TMDB.movie.getImages(+id);
    return {
      title: TitleService.detail.getMovieTitle(movie),
      searchbar: SearchBarService.getMovieSearchbar(),
      detail: DetailService.getMovieDetail(movie, video),
      sections: SectionService.getMovieDetailSections({ credits, moreLikeThis, images })
    };
  }

  public static async getPersonDetailPage(id: string): Promise<DetailPageProps> {
    const person = await TMDB.person.getDetails(+id);
    const shows = await TMDB.person.getTVShowCredits(+id);
    const movies = await TMDB.person.getMovieCredits(+id);
    return {
      title: TitleService.detail.getPersonTitle(person),
      searchbar: SearchBarService.getPeopleSearchbar(),
      detail: DetailService.getPersonDetail(person),
      sections: SectionService.getPersonDetailSections({ shows, movies, })
    };
  }

  public static async getShowDetailPage(id: string): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);
    const credits = await TMDB.tvShow.getCredits(+id);
    const chartSeasons = await ChartService.getShowEpisodesChart(show.id, show.seasons);
    const images = await TMDB.tvShow.getImages(+id);
    return {
      title: TitleService.detail.getShowTitle(show),
      searchbar: SearchBarService.getShowSearchbar(),
      detail: DetailService.getShowDetail(show, video),
      charts: [
        chartSeasons
      ],
      sections: SectionService.getShowDetailSections({
        show,
        moreLikeThis,
        credits,
        images
      })
    };
  }

  public static async getSeasonDetailPage(
    showId: string,
    seasonNumber: string
  ): Promise<DetailPageProps> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const videos = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
    return {
      title: TitleService.detail.getSeasonTitle(season),
      searchbar: SearchBarService.getShowSearchbar(),
      detail: DetailService.getSeasonDetail(season, videos),
      sections: SectionService.getSeasonDetailSections({
        season,
        showId,
        credits,
      })
    };
  }

  public static async getEpisodeDetailPage(
    showId: string,
    seasonNumber: string,
    episodeNumber: string
  ): Promise<DetailPageProps> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const videos = await TMDB.episode.getVideos(+showId, +seasonNumber, +episodeNumber);
    const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    return {
      title: TitleService.detail.getEpisodeTitle(episode),
      searchbar: SearchBarService.getShowSearchbar(),
      detail: DetailService.getEpisodeDetail(episode, videos),
      sections: SectionService.getEpisodeDetailSections({
        season,
        showId,
        credits,
        guestStars: episode.guest_stars ?? [],
        crew: episode.crew ?? [],
      })
    };
  }
}

export default DetailPageService;
