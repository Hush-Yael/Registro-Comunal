import { RoundChartProps, RoundChart } from "../../../components/charts/round";
import { setExternalFilter } from "./table";

type JefeRoundChartProps = Omit<
  RoundChartProps,
  "labels" | "data" | "onSelect"
> & {
  charts: any;
  path: string;
};

export const JefeChart = (props: JefeRoundChartProps) => {
  const labels: {}[] = [],
    data: number[] = [];

  props.charts[props.path].forEach(([{ text, match, value }]) => {
    labels.push({
      text: text,
      match:
        match === "1" ? 1 : match === "0" ? 0 : match === "null" ? null : match,
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
