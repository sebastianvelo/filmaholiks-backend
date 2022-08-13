import { CardProps } from "../card/CardProps";

export interface CardsSectionProps  {
    id?: string;
    title?: string;
    isGrid?: boolean;
    cards?: CardProps[];
}