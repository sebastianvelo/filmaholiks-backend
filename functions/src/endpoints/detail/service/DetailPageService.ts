import TMDB from "../../../tmdb/TMDB";
import ChartHelper from "../../common/helper/chart/ChartHelper";
import DetailHelper from "../../common/helper/detail/DetailHelper";
import SearchBarHelper from "../../common/helper/searchbar/SearchBarHelper";
import SectionHelper from "../../common/helper/section/SectionHelper";
import TitleHelper from "../../common/helper/title/TitleHelper";
import { DetailPageProps } from "../model/DetailPageProps";

class DetailPageService {
  public static async getMovieDetailPage(id: string): Promise<DetailPageProps> {
    const movie = await TMDB.movie.getDetails(+id);
    const video = await TMDB.movie.getVideos(+id);
    const moreLikeThis = await TMDB.movie.getMovieRecommendations(+id);
    const credits = await TMDB.movie.getCredits(+id);
    const images = await TMDB.movie.getImages(+id);
    return {
      title: TitleHelper.detail.getMovieTitle(movie),
      searchbar: SearchBarHelper.movie.getSearchbar(),
      detail: DetailHelper.getMovieDetail(movie, video),
      sections: SectionHelper.movie.getDetail({ credits, moreLikeThis, images })
    };
  }

  public static async getPersonDetailPage(id: string): Promise<DetailPageProps> {
    const person = await TMDB.person.getDetails(+id);
    const shows = await TMDB.person.getTVShowCredits(+id);
    const movies = await TMDB.person.getMovieCredits(+id);
    return {
      title: TitleHelper.detail.getPersonTitle(person),
      searchbar: SearchBarHelper.people.getSearchbar(),
      detail: DetailHelper.getPersonDetail(person),
      sections: SectionHelper.people.getDetail({ shows, movies, })
    };
  }

  public static async getShowDetailPage(id: string): Promise<DetailPageProps> {
    const show = await TMDB.tvShow.getDetails(+id);
    const video = await TMDB.tvShow.getVideos(+id);
    const moreLikeThis = await TMDB.tvShow.getTVRecommendations(+id);
    const credits = await TMDB.tvShow.getCredits(+id);
    const images = await TMDB.tvShow.getImages(+id);
    const chartSeasons = await ChartHelper.getShowEpisodesChart(show.id, show.seasons);
    return {
      title: TitleHelper.detail.getShowTitle(show),
      searchbar: SearchBarHelper.show.getSearchbar(),
      detail: DetailHelper.getShowDetail(show, video),
      charts: [
        chartSeasons
      ],
      sections: SectionHelper.show.getDetail({
        show,
        moreLikeThis,
        credits,
        images
      })
    };
  }

  public static async getSeasonDetailPage(showId: string, seasonNumber: string): Promise<DetailPageProps> {
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    const videos = await TMDB.season.getVideos(+showId, +seasonNumber);
    const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
    return {
      title: TitleHelper.detail.getSeasonTitle(season),
      searchbar: SearchBarHelper.show.getSearchbar(),
      detail: DetailHelper.getSeasonDetail(season, videos),
      sections: SectionHelper.season.getDetail({
        season,
        showId,
        credits,
      })
    };
  }

  public static async getEpisodeDetailPage(showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageProps> {
    const episode = await TMDB.episode.getDetails(+showId, +seasonNumber, +episodeNumber);
    const videos = await TMDB.episode.getVideos(+showId, +seasonNumber, +episodeNumber);
    const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
    const season = await TMDB.season.getDetails(+showId, +seasonNumber);
    return {
      title: TitleHelper.detail.getEpisodeTitle(episode),
      searchbar: SearchBarHelper.show.getSearchbar(),
      detail: DetailHelper.getEpisodeDetail(episode, videos),
      sections: SectionHelper.episode.getDetail({
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
