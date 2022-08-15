import VideoModel from "../../../atom/VideoModel";
import { DataItemSectionModel } from "../../../components/section/Section";

export interface DetailContentHeaderModel {
    title: string;
    subtitle?: string;
}

export interface DetailContentDescriptionModel {
    title?: string;
    description?: string;
}

export interface DetailContentVideoModel extends VideoModel { }

export interface DetailContentInfoModel {
    data: (DataItemSectionModel | undefined)[];
    theresVideo?: boolean;
}

export interface DetailContentModel {
    header?: DetailContentHeaderModel;
    description?: DetailContentDescriptionModel;
    video?: DetailContentVideoModel;
    info?: DetailContentInfoModel;
}


