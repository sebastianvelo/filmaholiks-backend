import { MediaSectionProps } from "../../common/model/MediaSectionProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface ExplorePageProps {
    searchbar: SearchBarProps;
    sections: MediaSectionProps[];
}