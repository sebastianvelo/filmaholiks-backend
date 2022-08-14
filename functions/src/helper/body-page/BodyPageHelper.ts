import { LanguageParams } from "tmdb-js/lib/api/common/params/CommonParams";
import { CreditsResponse, ImagesResponse, MoviesResponse, PeopleResponse, TVShowsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailPageBodyProps } from "../../endpoints/detail/model/DetailPageProps";
import { ExplorePageBodyProps } from "../../endpoints/explore/model/ExplorePageProps";
import { SearchResultPageBodyProps } from "../../endpoints/search-result/model/SearchResultProps";
import UserModel from "../../repository/model/user/UserModel";
import TMDB from "../../tmdb/TMDB";
import { getMovieCard, getPersonCard, getShowCard } from "../card/CardHelper";
import ChartHelper from "../chart/ChartHelper";
import DetailHelper from "../detail/DetailHelper";
import ResultsHelper from "../results/ResultsHelper";
import SectionHelper from "../section/SectionHelper";
import WatchlistHelper from "../watch-list/WatchlistHelper";

class BodyPageHelper {

    public static user = {
        getDetail: async (user: UserModel): Promise<DetailPageBodyProps> => {
            const watchlists = await WatchlistHelper.getByUser(user);
            return {
                detail: DetailHelper.getUser(user),
                sections: SectionHelper.user.getDetail({}),
                ...watchlists,
            };
        },
    };

    public static movie = {
        getDetail: async (movie: MovieResponse): Promise<DetailPageBodyProps> => {
            const id = Number(movie.id);
            const video = await TMDB.movie.getVideos(id);
            const moreLikeThis = await TMDB.movie.getMovieRecommendations(id);
            const credits = await TMDB.movie.getCredits(id);
            const images = await TMDB.movie.getImages(id);

            return {
                detail: DetailHelper.getMovie(movie, video),
                sections: SectionHelper.movie.getDetail({ credits, moreLikeThis, images })
            };
        },
        getExplore: async (query?: LanguageParams): Promise<ExplorePageBodyProps> => {
            const upcoming: MoviesResponse = await TMDB.movie.getUpcoming(query);
            const topRated: MoviesResponse = await TMDB.movie.getTopRatedMovies(query);
            const nowPlaying: MoviesResponse = await TMDB.movie.getNowPlaying(query);
            const popular: MoviesResponse = await TMDB.movie.getPopularMovies(query);
            const dailyTrending: MoviesResponse = await TMDB.trending.getMovies("day");
            const weeklyTrending: MoviesResponse = await TMDB.trending.getMovies("week");

            return {
                sections: SectionHelper.movie.getExplore({
                    upcoming,
                    topRated,
                    nowPlaying,
                    popular,
                    dailyTrending,
                    weeklyTrending
                })
            };
        },
        getSearch: (movies: MoviesResponse, query: string): SearchResultPageBodyProps => ({
            results: ResultsHelper.getResults(movies.results, getMovieCard, query)
        })
    };

    public static people = {
        getDetail: async (person: PersonDetailsResponse): Promise<DetailPageBodyProps> => {
            const id = Number(person.id);
            const shows = await TMDB.person.getTVShowCredits(id);
            const movies = await TMDB.person.getMovieCredits(id);

            return {
                detail: DetailHelper.getPerson(person),
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
            results: ResultsHelper.getResults(people.results, getPersonCard, query)
        })
    };

    public static show = {
        getDetail: async (show: TVShowResponse): Promise<DetailPageBodyProps> => {
            const id = Number(show.id);
            const video: VideosResponse = await TMDB.tvShow.getVideos(id);
            const moreLikeThis: TVShowsResponse = await TMDB.tvShow.getTVRecommendations(id);
            const credits: CreditsResponse = await TMDB.tvShow.getCredits(id);
            const images: ImagesResponse = await TMDB.tvShow.getImages(id);
            const chartSeasons = await ChartHelper.showEpisodes.getChartSection(id, show.seasons);

            const seasonEpisodes = async (season: number) => {
                const s = await TMDB.season.getDetails(show.id ?? 0, season);
                return s.episodes as Episode[];
            };
            const allEpisodes = await Promise.all(
                show.seasons?.filter(season => season.season_number).map(async (season) => seasonEpisodes(season.season_number)) ?? []
            );
            const getRating = (episode: Episode) => Number(episode.vote_average?.toFixed(1));
            const sortByRating = (episodeA: Episode, episodeB: Episode) => getRating(episodeB) - getRating(episodeA);
            const topRatedEpisodes = allEpisodes.flat().sort(sortByRating).slice(0, 30);

            return {
                detail: DetailHelper.getShow(show, video),
                charts: [
                    chartSeasons
                ],
                sections: SectionHelper.show.getDetail({
                    show,
                    moreLikeThis,
                    credits,
                    images,
                    topRatedEpisodes
                })
            };
        },
        getExplore: async (query?: LanguageParams): Promise<ExplorePageBodyProps> => {
            const onTheAir: TVShowsResponse = await TMDB.tvShow.getOnTheAir(query);
            const topRated: TVShowsResponse = await TMDB.tvShow.getTopRatedShows(query);
            const popular: TVShowsResponse = await TMDB.tvShow.getPopularShows(query);
            const airingToday: TVShowsResponse = await TMDB.tvShow.getAiringToday(query);
            const dailyTrending: TVShowsResponse = await TMDB.trending.getTVShows("day");
            const weeklyTrending: TVShowsResponse = await TMDB.trending.getTVShows("week");

            return {
                sections: SectionHelper.show.getExplore({
                    onTheAir,
                    topRated,
                    popular,
                    airingToday,
                    dailyTrending,
                    weeklyTrending
                })
            };
        },
        getSearch: (shows: TVShowsResponse, query: string): SearchResultPageBodyProps => ({
            results: ResultsHelper.getResults(shows.results, getShowCard, query)
        })
    };

    public static season = {
        getDetail: async (season: SeasonWithEpisodesResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyProps> => {
            const videos: VideosResponse = await TMDB.season.getVideos(+showId, +seasonNumber);
            const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
            return {
                detail: DetailHelper.getSeason(season, videos),
                sections: SectionHelper.season.getDetail({
                    season,
                    showId,
                    credits,
                })
            };
        },
    };

    public static episode = {
        getDetail: async (episode: EpisodeResponse, showId: string, seasonNumber: string): Promise<DetailPageBodyProps> => {
            const episodeNumber = Number(episode.episode_number);
            const videos: VideosResponse = await TMDB.episode.getVideos(+showId, +seasonNumber, episodeNumber);
            const credits: CreditsResponse = await TMDB.season.getCredits(+showId, +seasonNumber);
            const season: SeasonWithEpisodesResponse = await TMDB.season.getDetails(+showId, +seasonNumber);
            return {
                detail: DetailHelper.getEpisode(episode, videos),
                sections: SectionHelper.episode.getDetail({
                    moreEpisodes: season.episodes,
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