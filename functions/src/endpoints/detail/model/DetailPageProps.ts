import { CardsSectionProps } from "../../../model/cards/CardsSectionProps";
import ChartProps from "../../../model/chart/ChartProps";
import { ImageProps } from "../../../model/image/ImageProps";
import { SearchBarProps } from "../../../model/searchbar/SearchBarProps";
import { ItemProps, WatchlistProps } from "../../../model/watchlist/WatchListPageProps";

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
export interface DetailActionsProps {
  watchlistButton?: ItemProps;
}

export interface DetailProps {
  poster?: ImageProps;
  backdrop?: ImageProps;
  header?: DetailHeaderProps;
  description?: DataItemProps;
  info?: DetailInfoProps;
  actions?: DetailActionsProps;
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

export interface WatchlistTabProps extends WatchlistProps {
  title: string;
}

export interface DetailWatchlistProps {
  watchlists?: WatchlistTabProps[];
}

export interface DetailPageBodyProps extends DetailSectionsProps, DetailChartProps, DetailWatchlistProps {
  detail?: DetailProps;
}

export interface DetailPageProps {
  title: string;
  searchbar: SearchBarProps;
  body: DetailPageBodyProps;
}
