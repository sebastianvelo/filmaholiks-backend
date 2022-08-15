import ImageModel from "../atom/ImageModel";

export interface ChartBodyCellModel {
    rating: number;
    value: string | number;
    href: string;
    title?: string;
    image: ImageModel;
    isTopHalf?: boolean;
    isLeftHalf?: boolean;
}

export interface ChartBodyModel {
    episode: number[];
    ratings: ChartBodyCellModel[][];
};

export interface ChartHeaderModel {
    header: string[];
}

interface ChartModel extends ChartHeaderModel {
    body: ChartBodyModel;
}

export default ChartModel;
