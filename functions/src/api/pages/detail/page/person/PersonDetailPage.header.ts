import { getTMDBImage } from "@api/helper/media/MediaHelper";
import DataItemModel from "@api/pages/detail/common/data-item/DataItemModel";
import * as DateHelper from "@helper/date/DateHelper";
import ImageModel from "@shared/model/atom/ImageModel";
import { DataItemSectionModel } from "@shared/model/components/section/Section";
import { DetailContentHeaderModel, DetailContentInfoModel } from "@shared/model/pages/detail/header/DetailContentModel";
import { DetailHeaderModel } from "@shared/model/pages/detail/header/DetailHeaderModel";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";

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

const Header = (person: PersonDetailsResponse): DetailHeaderModel => ({
  poster: Poster(person),
  backdrop: Backdrop(person),
  header: ContentHeader(person),
  description: Description(person),
  info: Info(person),
});

export default Header;