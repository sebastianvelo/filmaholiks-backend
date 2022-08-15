import SearchBarModel from "../../components/SearchBarModel";
import { CardsSectionModel } from "../../components/section/Section";

export interface SearchResultPageBodyModel {
    results?: CardsSectionModel;
}

interface SearchResultPageModel {
    title: string;
    searchbar: SearchBarModel;
    body: SearchResultPageBodyModel;
}

export default SearchResultPageModel;