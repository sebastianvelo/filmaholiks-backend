import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { MoviesResponse, PeopleResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import TMDB from "../../../../tmdb/TMDB";
import { DetailPageBodyProps } from "../../../detail/model/DetailPageProps";
import { ExplorePageBodyProps } from "../../../explore/model/ExplorePageProps";
import { SearchResultPageBodyProps } from "../../../search-result/model/SearchResultProps";
import CardHelper from "../card/CardHelper";
import ChartHelper from "../chart/ChartHelper";
import DetailHelper from "../detail/DetailHelper";
import ResultsHelper from "../results/ResultsHelper";
import SectionHelper from "../section/SectionHelper";

class BodyPageHelper {

    public static movie = {
        getDetail: async (movie: MovieResponse): Promise<DetailPageBodyProps> => {
            const video = await TMDB.movie.getVideos(Number(movie.id));
            const moreLikeThis = await TMDB.movie.getMovieRecommendations(Number(movie.id));
            const credits = await TMDB.movie.getCredits(Number(movie.id));
            const images = await TMDB.movie.getImages(Number(movie.id));
            return {
                detail: DetailHelper.getMovieDetail(movie, video),
                sections: SectionHelper.movie.getDetail({ credits, moreLikeThis, images })
            };
        },
        getExplore: async (query?: LanguageParams): Promise<ExplorePageBodyProps> => {
            const upcoming: MoviesResponse = await TMDB.movie.getUpcoming(query);
            const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies(query);
            const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying(query);
            const popular: MoviesResponse = await TMDB.movie.getPopularMovies(query);
            return {
                sections: SectionHelper.movie.getExplore({
                    upcoming,
                    topRated,
                    nowPlaying,
                    popular
                })
            };
        },
        getSearch: (movies: MoviesResponse, query: string): SearchResultPageBodyProps => ({
            results: ResultsHelper.getResults(movies.results, CardHelper.getMovieCard, query)
        })
    };


    public static people = {
        getDetail: async (person: PersonDetailsResponse): Promise<DetailPageBodyProps> => {
            const shows = await TMDB.person.getTVShowCredits(Number(person.id));
            const movies = await TMDB.person.getMovieCredits(Number(person.id));
            return {
                detail: DetailHelper.getPersonDetail(person),
                sections: SectionHelper.people.getDetail({ shows, movies })
            };
        },
        getExplore: async (query?: LanguageParams): Promise<ExplorePageBodyProps> => {
            const popular: PeopleResponse = await TMDB.person.getPopular();
            return {
                sections: SectionHelper.people.getExplore({ popular })
            };
        },
        getSearch: (people: PeopleResponse, query: string): SearchResultPageBodyProps => ({
            results: ResultsHelper.getResults(people.results, CardHelper.getPersonCard, query)
        })
    };

    public static show = {
        getDetail: async (show: TVShowResponse): Promise<DetailPageBodyProps> => {
            const video = await TMDB.tvShow.getVideos(Number(show.id));
            const moreLikeThis = await TMDB.tvShow.getTVRecommendations(Number(show.id));
            const credits = await TMDB.tvShow.getCredits(Number(show.id));
            const images = await TMDB.tvShow.getImages(Number(show.id));
            const chartSeasons = await ChartHelper.getShowEpisodesChart(show.id, show.seasons);
            return {
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
        },
        getExplore: async (query?: LanguageParams): Promise<ExplorePageBodyProps> => {
            const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir(query);
            const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows(query);
            const popular: TVShowsResponse = await TMDB.tvShow.getPopularShows(query);
            const airingToday: TVShowsResponse = await TMDB.tvShow.getAiringToday(query);
            return {
                sections: SectionHelper.show.getExplore({
                    onTheAir,
                    topRated,
                    popular,
                    airingToday
                })
            };
        },
        getSearch: (shows: TVShowsResponse, query: string): SearchResultPageBodyProps => ({
            results: ResultsHelper.getResults(shows.results, CardHelper.getShowCard, query)
        })
    };

    public static season = {
        getDetail: async (season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyProps> => {
            const videos = await TMDB.season.getVideos(+showId, +seasonNumber);
            const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
            return {
                detail: DetailHelper.getSeasonDetail(season, videos),
                sections: SectionHelper.season.getDetail({
                    season,
                    showId,
                    credits,
                })
            };
        },
    };

    public static episode = {
        getDetail: async (episode: EpisodeResponse, showId: string, seasonNumber: string, episodeNumber: string): Promise<DetailPageBodyProps> => {
            const videos = await TMDB.episode.getVideos(+showId, +seasonNumber, +episodeNumber);
            const credits = await TMDB.season.getCredits(+showId, +seasonNumber);
            const season = await TMDB.season.getDetails(+showId, +seasonNumber);
            return {
                detail: DetailHelper.getEpisodeDetail(episode, videos),
                sections: SectionHelper.episode.getDetail({
                    season,
                    showId,
                    credits,
                    guestStars: episode.guest_stars ?? [],
                    crew: episode.crew ?? [],
                })
            };
        },
    };

}

export default BodyPageHelper;