import MediaType from "../../../../types/MediaType";
import ImageModel from "../../../atom/ImageModel";
import CardHorizontalModel from "../../../components/CardHorizontalModel";
import { ListModel } from "../../../components/WatchlistModel";
import { DetailContentModel } from "./DetailContentModel";

export interface WatchlistButtonModel extends CardHorizontalModel {
    mediaType: MediaType;
    list?: ListModel;
    lists?: ListModel[];
}

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