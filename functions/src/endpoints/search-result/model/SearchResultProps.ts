import { CardsSectionProps } from "../../../model/cards/CardsSectionProps";
import { SearchBarProps } from "../../../model/searchbar/SearchBarProps";

export interface SearchResultPageBodyProps {
  results?: CardsSectionProps;
}

export interface SearchResultProps {
  title: string;
  searchbar: SearchBarProps;
  body: SearchResultPageBodyProps;
}