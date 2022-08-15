import { CardHorizontalProps } from "../card-horizontal/CardHorizontalProps";

export interface ListProps {
    title?: string;
    items: CardHorizontalProps[];
}

export interface WatchlistProps {
    lists: ListProps[];
}
