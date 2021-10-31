import { ActionProps } from "../../common/model/ActionProps";
import { ImageProps } from "../../common/model/ImageProps";
import { CarouselSectionProps } from "../../common/model/CarouselSectionProps";

interface DataItemProps {
  title: string;
  description: string;
}

interface DetailInfoProps {
  data: DataItemProps[];
}

interface DetailHeaderProps {
  title: string;
  subtitle?: string;
}

interface DetailVideoProps {
  title?: string;
  src?: string;
}

export interface DetailProps {
  image?: ImageProps;
  header?: DetailHeaderProps;
  description?: DataItemProps;
  info?: DetailInfoProps;
  actions?: ActionProps[];
  video?: DetailVideoProps;
}

export interface DetailPageProps {
  detail: DetailProps;
  sections?: CarouselSectionProps[];
}
