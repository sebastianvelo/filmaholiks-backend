import { CardsSectionProps } from "../../common/model/CarouselSectionProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface ExplorePageBodyProps {
    sections?: CardsSectionProps[];
}

export interface ExplorePageProps {
    title: string;
    searchbar: SearchBarProps;
    body: ExplorePageBodyProps;
}