import { ActionProps } from "../../common/model/ActionProps";
import { ImageProps } from "../../common/model/ImageProps";
import { CardsSectionProps } from "../../common/model/CarouselSectionProps";
import ChartProps from "../../common/model/ChartProps";
import { SearchBarProps } from "../../common/model/SearchBarProps";

export interface DataItemProps {
  title: string;
  description: string;
}

export interface DetailInfoProps {
  data: (DataItemProps | undefined)[];
}

export interface DetailHeaderProps {
  title: string;
  subtitle?: string;
}

interface DetailVideoProps {
  title?: string;
  src?: string;
}

export interface DetailProps {
  poster?: ImageProps;
  backdrop?: ImageProps;
  header?: DetailHeaderProps;
  description?: DataItemProps;
  info?: DetailInfoProps;
  actions?: ActionProps[];
  video?: DetailVideoProps;
}

interface DetailSectionsProps {
  sections?: CardsSectionProps[],
}

interface DetailChartProps {
  charts?: {
    title: string;
    chart: ChartProps;
  }[];
}

export interface DetailPageBodyProps extends DetailSectionsProps, DetailChartProps {
  detail?: DetailProps,
}

export interface DetailPageProps {
  title: string;
  searchbar: SearchBarProps;
  body: DetailPageBodyProps;
}
