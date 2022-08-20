import ImageModel from "../atom/ImageModel";

interface CardHorizontalModel {
    id: number | string;
    title?: string;
    subtitle?: string;
    image?: ImageModel;
    path: string;
    tags?: string;
}

export default CardHorizontalModel;