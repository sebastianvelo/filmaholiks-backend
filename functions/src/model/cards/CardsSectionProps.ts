import { CardVerticalProps } from "../card-vertical/CardVerticalProps";

export interface CardsSectionProps  {
    id?: string;
    title?: string;
    isGrid?: boolean;
    cards?: CardVerticalProps[];
}