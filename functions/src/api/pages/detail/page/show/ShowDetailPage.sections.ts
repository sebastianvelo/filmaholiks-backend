import CastMemberCardVerticalModel from "@api/pages/common/card/vertical/CastMemberCardVerticalModel";
import GalleryImageCardVerticalModel from "@api/pages/common/card/vertical/GalleryImageCardVerticalModel";
import SeasonCardVerticalModel from "@api/pages/common/card/vertical/SeasonCardVerticalModel";
import ShowCardVerticalModel from "@api/pages/common/card/vertical/ShowCardVerticalModel";
import TopRatedEpisodeCardVerticalModel from "@api/pages/common/card/vertical/TopRatedEpisodeCardVerticalModel";
import { CardsSectionModel } from "@shared/model/components/section/Section";
import { CreditsResponse, ImagesResponse, TVShowsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

interface ShowSections {
  show: TVShowResponse;
  moreLikeThis: TVShowsResponse;
  topRatedEpisodes: Episode[];
  credits: CreditsResponse;
  images: ImagesResponse;
}

const Sections = (sections: ShowSections): CardsSectionModel[] => [
  {
    id: "cast",
    title: "Cast",
    cards: sections.credits.cast?.map(CastMemberCardVerticalModel)
  },
  {
    id: "seasons",
    title: "Seasons",
    cards: sections.show.seasons?.map((season) =>
      SeasonCardVerticalModel(season, sections.show.id)
    )
  },
  {
    id: "top-rated",
    title: "Top rated episodes",
    cards: sections.topRatedEpisodes?.map((episode) =>
      TopRatedEpisodeCardVerticalModel(episode, sections.show.id)
    )
  },
  {
    id: "moreLikeThis",
    title: "More like this",
    cards: sections.moreLikeThis.results?.map(ShowCardVerticalModel)
  },
  {
    id: "posters-gallery",
    title: "Posters",
    cards: sections.images?.posters?.map(GalleryImageCardVerticalModel)
  },
];


export default Sections;