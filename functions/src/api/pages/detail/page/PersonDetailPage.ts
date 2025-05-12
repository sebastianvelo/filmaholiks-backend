import { getTMDBImage } from "@api/helper/media/MediaHelper";
import DataItemModel from "@api/model/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import ImageModel from "shared/model/atom/ImageModel";
import SearchBarModel from "shared/model/components/SearchBarModel";
import { CardsSectionModel, DataItemSectionModel } from "shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "shared/model/pages/detail/header/DetailHeaderModel";
import PageRoute from "shared/routes/PageRoute";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import TMDB from "tmdb/TMDB";
import DetailPageModel, { DetailPageBodyModel } from "../../../../shared/model/pages/detail/DetailPageModel";
import * as TitleHelper from "../../../helper/title/TitleHelper";
import MovieAppareancesCardVerticalModel from "@api/model/card/vertical/MovieAppareancesCardVerticalModel";
import ShowAppareancesCardVerticalModel from "@api/model/card/vertical/ShowAppareancesCardVerticalModel";
import { CreditsResponse } from "tmdb-js/lib/api/common/response/CommonResponse";

const Header = (person: PersonDetailsResponse): DetailHeaderModel => {
  const Poster = (person: PersonDetailsResponse): ImageModel =>
    getTMDBImage(person.profile_path, person.name);

  const Backdrop = (person: PersonDetailsResponse): ImageModel =>
    getTMDBImage(person.profile_path, person.name);

  const ContentHeader = (person: PersonDetailsResponse): DetailContentHeaderModel => ({
    title: `${person.name}`,
  });

  const Description = (person: PersonDetailsResponse): DataItemSectionModel | undefined =>
    DataItemModel(`Biography`, person.biography);

  const Info = (person: PersonDetailsResponse): DetailContentInfoModel => ({
    data: [
      DataItemModel(`Birthday`, person.deathday ? DateHelper.getFullMessage(person.birthday, person.deathday) : DateHelper.getFullMessage(person.birthday)),
      DataItemModel(`Deathday`, person.deathday ? DateHelper.getFullMessage(person.deathday) : undefined),
      DataItemModel(`Place of birth`, person.place_of_birth),
      DataItemModel(`Known for`, person.known_for_department),
    ]
  });

  return ({
    poster: Poster(person),
    backdrop: Backdrop(person),
    header: ContentHeader(person),
    description: Description(person),
    info: Info(person),
  });
}

interface PersonDetail {
  shows: CreditsResponse;
  movies: CreditsResponse;
}

const Sections = (data: PersonDetail): CardsSectionModel[] => [
  {
    id: "tv-shows",
    title: "TV Shows",
    cards: data.shows.cast.map(ShowAppareancesCardVerticalModel)
  },
  {
    id: "movies",
    title: "Movies",
    cards: data.movies.cast.map(MovieAppareancesCardVerticalModel)
  },
];

const Body = async (person: PersonDetailsResponse): Promise<DetailPageBodyModel> => {
  const id = Number(person.id);
  const shows = await TMDB.person.getTVShowCredits(id);
  const movies = await TMDB.person.getMovieCredits(id);

  return {
    detail: Header(person),
    sections: Sections({ shows, movies })
  };
};

const SearchBar = (): SearchBarModel => ({
  placeholder: `Search people...`,
  path: PageRoute.PERSON_SEARCH
});

const PersonDetailPage = async ({ person }: { person: PersonDetailsResponse }): Promise<DetailPageModel> => {
  const body = await Body(person);

  return {
    title: TitleHelper.people.getDetail(person),
    searchbar: SearchBar(),
    body
  };
}

export default PersonDetailPage;
