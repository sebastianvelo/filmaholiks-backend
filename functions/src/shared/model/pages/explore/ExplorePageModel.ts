import SearchBarModel from "../../components/SearchBarModel";
import { CardsSectionModel } from "../../components/section/Section";

export interface ExplorePageBodyModel {
    sections?: CardsSectionModel[];
}

interface ExplorePageModel {
    title: string;
    searchbar: SearchBarModel;
    body: ExplorePageBodyModel;
}

export default ExplorePageModel;