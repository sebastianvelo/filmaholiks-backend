import ImageModel from "../../../atom/ImageModel";
import CardHorizontalModel from "../../../components/CardHorizontalModel";
import { DetailContentModel } from "./DetailContentModel";

export interface WatchlistButtonModel extends CardHorizontalModel { }

export interface DetailActionsModel {
    watchlistButton?: WatchlistButtonModel;
}

export interface DetailPostersModel {
    poster?: ImageModel;
    backdrop?: ImageModel;
}

export interface DetailHeaderModel extends DetailPostersModel, DetailContentModel {
    actions?: DetailActionsModel;
}