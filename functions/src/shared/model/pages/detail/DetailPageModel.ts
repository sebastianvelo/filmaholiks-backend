import SearchBarModel from "../../components/SearchBarModel";
import { CardsSectionModel, ChartSectionModel, WatchlistTabModel } from "../../components/section/Section";
import { DetailHeaderModel } from "./header/DetailHeaderModel";

export interface DetailWatchlistModel {
    watchlists?: WatchlistTabModel[];
}

export interface DetailChartModel {
    charts?: ChartSectionModel[];
}

export interface DetailSectionsModel {
    sections?: CardsSectionModel[],
}

export interface DetailPageBodyModel extends DetailSectionsModel, DetailChartModel, DetailWatchlistModel {
    detail?: DetailHeaderModel;
}

interface DetailPageModel {
    title: string;
    searchbar?: SearchBarModel;
    body: DetailPageBodyModel;
}

export default DetailPageModel;