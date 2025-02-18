import { ChartProps, RoundChart } from "../../../components/charts/round";
import { setExternalFilter } from "./table";

type JefeChartProps = Omit<ChartProps, "labels" | "data" | "onSelect"> & {
  charts: any;
  path: string;
};

export const JefeChart = (props: JefeChartProps) => {
  const labels: {}[] = [],
    data: number[] = [];

  props.charts[props.path].forEach(([{ text, match, value }]) => {
    labels.push({
      text,
      match,
    });
    data.push(value);
  });

  return (
    <RoundChart
      class={`justify-between ${props.class || ""}`}
      listClass={props.listClass}
      title={props.title}
      type={props.type}
      labels={labels}
      data={data}
      colors={props.colors}
      size={props.size || 100}
      onSelect={(filter) => {
        setExternalFilter(
          filter === undefined ? undefined : { path: props.path, value: filter }
        );
      }}
    />
  );
};
