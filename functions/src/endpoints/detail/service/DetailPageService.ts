import TMDB from "../../../tmdb/TMDB";
import ChartService from "../../common/service/chart/ChartService";
import DetailService from "../../common/service/detail/DetailService";
import SearchBarService from "../../common/service/searchbar/SearchBarService";
import SectionService from "../../common/service/section/SectionService";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailPageService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(+id);
    const credits = await TMDB.movie.getCredits(+id);
    return {
      searchbar: SearchBarService.getMovieSearchbar(),
      detail: DetailService.getMovieDetail(movie, video),
      sections: SectionService.getMovieDetailSections({ credits, moreLikeThis })
    };
  }

  public static async getPersonDetailPage(id: string): Promise<DetailPageProps> {
    const person = await TMDB.person.getDetails(+id);
    return {
      searchbar: SearchBarService.getPeopleSearchbar(),
      detail: DetailService.getPersonDetail(person),
    };
  }

  public static async getShowDetailPage(id: string): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);
    const credits = await TMDB.tvShow.getCredits(+id);
    const chartSeasons = await ChartService.getShowEpisodesChart(show.id, show.seasons)
    return {
      searchbar: SearchBarService.getShowSearchbar(),
      detail: DetailService.getShowDetail(show, video),
      charts: [
        chartSeasons
      ],
      sections: SectionService.getShowDetailSections({
        show,
        moreLikeThis,
        credits
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
      detail: DetailService.getSeasonDetail(season, videos),
      sections: SectionService.getSeasonDetailSections({
        season,
        showId,
        credits
      })
    };
  }

  public static async getEpisodeDetailPage(
    id: string,
    seasonNumber: string,
    episode: string
  ): Promise<DetailPageProps> {
    const details = await TMDB.episode.getDetails(+id, +seasonNumber, +episode);
    const videos = await TMDB.episode.getVideos(+id, +seasonNumber, +episode);
    return {
      detail: DetailService.getEpisodeDetail(details, videos)
    };
  }
}

export default DetailPageService;
