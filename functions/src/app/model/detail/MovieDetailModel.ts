import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import ImageModel from "../../../shared/model/atom/ImageModel";
import VideoModel from "../../../shared/model/atom/VideoModel";
import { DataItemSectionModel } from "../../../shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "../../../shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel, WatchlistButtonModel } from "../../../shared/model/pages/detail/header/DetailHeaderModel";
import MediaType from "../../../shared/types/MediaType";
import * as DateHelper from "../../helper/date/DateHelper";
import { getTrailer, getTMDBImage } from "../../helper/media/MediaHelper";
import WatchlistService from "../../service/WatchlistService";
import MovieCardHorizontalModel from "../card/horizontal/MovieCardHorizontalModel";
import ShowCardHorizontalModel from "../card/horizontal/ShowCardHorizontalModel";
import DataItemModel from "../data-item/DataItemModel";

const Poster = (movie: MovieResponse): ImageModel =>
    getTMDBImage(movie.poster_path, movie.title);

const Backdrop = (movie: MovieResponse): ImageModel =>
    getTMDBImage(movie.backdrop_path, movie.title);

const ContentHeader = (movie: MovieResponse): DetailContentHeaderModel => ({
    title: `${movie.title}`
});

const Description = (movie: MovieResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${movie.overview}`);

const Info = (movie: MovieResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Rating`, `${movie.vote_average?.toFixed(2)} ⭐️`),
        DataItemModel(`Genres`, movie.genres?.map((genre) => genre.name).join(", ")),
        DataItemModel(`Duration`, `${movie.runtime}m`),
        DataItemModel(`Language`, movie.original_language),
        DataItemModel(`Release`, DateHelper.getFullMessage(movie.release_date)),
        DataItemModel(`Budget`, `$${movie.budget}`),
        DataItemModel(`Revenue`, `$${movie.revenue}`),
        DataItemModel(`Status`, movie.status),
    ]
});

const Video = (videos: VideosResponse): VideoModel =>
    getTrailer(videos);

const WatchlistButton = async (movie: MovieResponse, userName: string): Promise<WatchlistButtonModel> => {
    const list = await WatchlistService.presenter.list.getByItem(MediaType.MOVIE, userName, Number(movie.id));
    const lists = await WatchlistService.presenter.list.getByUser(MediaType.MOVIE, userName);

    return {
        ...MovieCardHorizontalModel(movie),
        list,
        lists,
        mediaType: MediaType.MOVIE
    };
};

const Actions = async (movie: MovieResponse, userLoggedIn?: string) => {
    const watchlistButton = userLoggedIn ? await WatchlistButton(movie, userLoggedIn) : undefined;

    return {
        watchlistButton
    };
};

const MovieDetailModel = async (movie: MovieResponse, videos: VideosResponse, userLoggedIn?: string): Promise<DetailHeaderModel> => {
    const actions = await Actions(movie, userLoggedIn);
    
    return {
        poster: Poster(movie),
        backdrop: Backdrop(movie),
        header: ContentHeader(movie),
        description: Description(movie),
        info: Info(movie),
        video: Video(videos),
        actions
    };
};

export default MovieDetailModel;