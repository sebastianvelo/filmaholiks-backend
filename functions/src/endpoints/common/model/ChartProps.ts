export interface ChartBodyCellProps {
  rating: number;
  value: string | number;
  href: string;
  title: string;
};

export interface ChartBodyProps {
  episode: number[];
  ratings: ChartBodyCellProps[][];
}

interface ChartProps {
  header?: string[];
  body?: ChartBodyProps;
}
export default ChartProps;
