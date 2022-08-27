import MediaType from "../../types/MediaType";
import CardHorizontalModel from "./CardHorizontalModel";

export interface ListModel {
    title?: string;
    items: CardHorizontalModel[];
}

export interface WatchlistModel {
    mediaType: MediaType;
    lists: ListModel[];
    dynamic?: boolean;
}