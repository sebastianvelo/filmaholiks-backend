import { ImageProps } from "../image/ImageProps";

export interface CardProps {
    title?: string;
    subtitle?: string;
    image?: ImageProps;
    path?: string;
    loading?: boolean;
}