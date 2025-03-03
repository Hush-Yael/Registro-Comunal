import { RoundChartProps, RoundChart } from "../../../components/charts/round";
import { JefeMatch, TableRecords } from "../../../types/db";
import { RecordPath } from "../../../types/form";
import { setExternalFilter } from "./table";

type JefeRoundChartProps = Omit<
  RoundChartProps,
  "labels" | "data" | "onSelect"
> & {
  charts: TableRecords["jefe"]["charts"];
  path: RecordPath<"jefe">;
};

export const JefeChart = (props: JefeRoundChartProps) => {
  const labels: Omit<JefeMatch<"jefe", typeof props.path>, "value">[] = [],
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
          // @ts-ignore
          filter === undefined ? undefined : { path: props.path, value: filter }
        );
      }}
    />
  );
};
