import { CardsSectionProps } from "../../../model/cards/CardsSectionProps";
import { SearchBarProps } from "../../../model/searchbar/SearchBarProps";

export interface ExplorePageBodyProps {
    sections?: CardsSectionProps[];
}

export interface ExplorePageProps {
    title: string;
    searchbar: SearchBarProps;
    body: ExplorePageBodyProps;
}