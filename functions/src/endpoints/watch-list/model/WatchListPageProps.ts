import { ImageProps } from "../../common/model/ImageProps";

export interface ItemProps {
    category?: string;
    title: string;
    info?: string;
    poster: ImageProps;
    path: string;
}

export interface ColumnProps {
    title?: string;
    items: ItemProps[];
}

export interface WatchListPageProps {
    columns: ColumnProps[];
}
