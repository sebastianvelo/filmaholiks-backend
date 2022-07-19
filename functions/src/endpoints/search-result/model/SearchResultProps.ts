import { CarouselSectionProps } from "../../common/model/CarouselSectionProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface SearchResultProps {
  title: string;
  searchbar: SearchBarProps;
  results: CarouselSectionProps;
}