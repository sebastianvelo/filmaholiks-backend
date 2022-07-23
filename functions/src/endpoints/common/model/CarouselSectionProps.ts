import { CardProps } from "./CardProps";

export interface CardsSectionProps  {
    id?: string;
    title?: string;
    isGrid?: boolean;
    cards?: CardProps[];
}