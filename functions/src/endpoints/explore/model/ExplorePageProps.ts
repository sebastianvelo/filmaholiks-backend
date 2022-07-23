import { CardsSectionProps } from "../../common/model/CarouselSectionProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface ExplorePageProps {
    title: string;
    searchbar: SearchBarProps;
    sections: CardsSectionProps[];
}