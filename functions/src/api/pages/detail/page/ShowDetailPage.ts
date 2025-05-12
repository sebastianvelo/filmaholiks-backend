import WatchlistService from "@api/entities/watch-list/WatchlistService";
import ChartHelper from "@api/helper/chart/ChartHelper";
import { getTMDBImage, getTrailer } from "@api/helper/media/MediaHelper";
import ShowCardHorizontalModel from "@api/model/card/horizontal/ShowCardHorizontalModel";
import DataItemModel from "@api/model/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import ImageModel from "shared/model/atom/ImageModel";
import VideoModel from "shared/model/atom/VideoModel";
import SearchBarModel from "shared/model/components/SearchBarModel";
import { CardsSectionModel, DataItemSectionModel } from "shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "shared/model/pages/detail/header/DetailContentModel";
import { DetailActionsModel, DetailHeaderModel, WatchlistButtonModel } from "shared/model/pages/detail/header/DetailHeaderModel";
import PageRoute from "shared/routes/PageRoute";
import MediaType from "shared/types/MediaType";
import { CreditsResponse, ImagesResponse, TVShowsResponse, VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import DetailPageModel, { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import TMDB from "../../../../tmdb/TMDB";
import * as TitleHelper from "../../../helper/title/TitleHelper";
import CastMemberCardVerticalModel from "@api/model/card/vertical/CastMemberCardVerticalModel";
import GalleryImageCardVerticalModel from "@api/model/card/vertical/GalleryImageCardVerticalModel";
import SeasonCardVerticalModel from "@api/model/card/vertical/SeasonCardVerticalModel";
import ShowCardVerticalModel from "@api/model/card/vertical/ShowCardVerticalModel";
import TopRatedEpisodeCardVerticalModel from "@api/model/card/vertical/TopRatedEpisodeCardVerticalModel";

const getRating = (episode: Episode) => Number(episode.vote_average?.toFixed(1));

const sortByRating = (episodeA: Episode, episodeB: Episode) => getRating(episodeB) - getRating(episodeA);

const seasonEpisodes = async (show: TVShowResponse, seasonNumber: number) => {
  const season = await TMDB.season.getDetails(show.id ?? 0, seasonNumber);
  return season.episodes as Episode[];
};

const allEpisodes = (show: TVShowResponse) => Promise.all(
  show.seasons?.filter(season => season.season_number).map(async (season) => seasonEpisodes(show, season.season_number)) ?? []
);
//---------------------------------------------------------------
const WatchlistButton = async (show: TVShowResponse, uid: string): Promise<WatchlistButtonModel> => {
  const list = await WatchlistService.presenter.list.getByItem(MediaType.SHOW, uid, Number(show.id));
  const lists = await WatchlistService.presenter.list.getByUser(MediaType.SHOW, uid);

  return {
    ...ShowCardHorizontalModel(show),
    list,
    lists,
    mediaType: MediaType.SHOW
  };
};

const Actions = async (show: TVShowResponse, viewerUid?: string): Promise<DetailActionsModel> => {
  const watchlistButton = viewerUid ? await WatchlistButton(show, viewerUid) : undefined;

  return {
    watchlistButton
  };
};

const Header = async (show: TVShowResponse, videos: VideosResponse, viewerUid?: string): Promise<DetailHeaderModel> => {
  const actions = await Actions(show, viewerUid);

  const Poster = (show: TVShowResponse): ImageModel =>
    getTMDBImage(show.poster_path, show.original_name);

  const Backdrop = (show: TVShowResponse): ImageModel =>
    getTMDBImage(show.backdrop_path, show.original_name);

  const ContentHeader = (show: TVShowResponse): DetailContentHeaderModel => ({
    title: `${show.original_name}`,
  });

  const Description = (show: TVShowResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Description`, `${show.overview}`);

  const Info = (show: TVShowResponse): DetailContentInfoModel => ({
    data: [
      DataItemModel(`Rating`, `${show.vote_average?.toFixed(2)} ⭐️`),
      DataItemModel(`Genres`, show.genres?.map((genre) => genre.name).join(", ")),
      DataItemModel(`Language`, show.original_language),
      DataItemModel(`Release`, DateHelper.getFullMessage(show.first_air_date)),
      DataItemModel(`Status`, show.status),
    ]
  });

  const Video = (videos: VideosResponse): VideoModel =>
    getTrailer(videos);

  return {
    poster: Poster(show),
    backdrop: Backdrop(show),
    header: ContentHeader(show),
    description: Description(show),
    info: Info(show),
    video: Video(videos),
    actions
  };
};

//---------------------------------------------------------------

const SearchBar = (): SearchBarModel => ({
  placeholder: `Search shows...`,
  path: PageRoute.SHOW_SEARCH
});

//---------------------------------------------------------------

interface ShowDetail {
  show: TVShowResponse;
  moreLikeThis: TVShowsResponse;
  topRatedEpisodes: Episode[];
  credits: CreditsResponse;
  images: ImagesResponse;
}

const Sections = (data: ShowDetail): CardsSectionModel[] => [
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
];

const Body = async (show: TVShowResponse, viewerUid?: string): Promise<DetailPageBodyModel> => {
  const id = Number(show.id);
  const video: VideosResponse = await TMDB.tvShow.getVideos(id);
  const moreLikeThis: TVShowsResponse = await TMDB.tvShow.getTVRecommendations(id);
  const credits: CreditsResponse = await TMDB.tvShow.getCredits(id);
  const images: ImagesResponse = await TMDB.tvShow.getImages(id);
  const chartSeasons = await ChartHelper.showEpisodes.getChartSection(id, show.seasons);
  const topRatedEpisodes = (await allEpisodes(show)).flat().sort(sortByRating).slice(0, 30);
  const detail = await Header(show, video, viewerUid);

  return {
    detail,
    sections: Sections({
      show,
      moreLikeThis,
      credits,
      images,
      topRatedEpisodes
    }),
    charts: [
      chartSeasons
    ],
  };
};

//---------------------------------------------------------------

const ShowDetailPage = async ({ show, viewerUid }: { show: TVShowResponse, viewerUid?: string }): Promise<DetailPageModel> => {
  const body = await Body(show, viewerUid);

  return {
    title: TitleHelper.show.getDetail(show),
    searchbar: SearchBar(),
    body
  };
}

export default ShowDetailPage;