import { CardsSectionProps } from "../../common/model/CarouselSectionProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface SearchResultPageBodyProps {
  results?: CardsSectionProps;
}

export interface SearchResultProps {
  title: string;
  searchbar: SearchBarProps;
  body: SearchResultPageBodyProps;
}