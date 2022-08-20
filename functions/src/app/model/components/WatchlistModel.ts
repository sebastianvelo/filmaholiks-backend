import MediaType from "../../common/MediaType";
import CardHorizontalModel from "./CardHorizontalModel";

export interface ListModel {
    title?: string;
    size?: number;
    dynamic: boolean;
    items: CardHorizontalModel[];
}

export interface WatchlistModel {
    mediaType: MediaType;
    lists: ListModel[];
}