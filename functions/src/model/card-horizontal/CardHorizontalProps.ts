import { ImageProps } from "../image/ImageProps";

export interface CardHorizontalProps {
    id?: number;
    title: string;
    subtitle?: string;
    image: ImageProps;
    path: string;
    tags?: string;
}