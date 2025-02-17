import { RoundChart, ChartProps } from "./round";

export type QuestionChartMatch = 1 | 0 | null | undefined;

type QuestionChartProps = Omit<ChartProps, "type" | "labels" | "onSelect"> & {
  data: [number, number, number];
  class?: string;
  onSelect?: (legend: QuestionChartMatch) => void;
};

export const QuestionChart = (props: QuestionChartProps) => (
  <div class={props.class}>
    <RoundChart
      title={props.title}
      type="doughnut"
      labels={[
        { text: "Sí", match: 1 },
        { text: "No", match: 0 },
        { text: "Desconocido", match: null },
      ]}
      colors={["hsl(130, 85%, 50%)", "hsl(0, 100%, 50%)", "hsl(30, 0%, 50%)"]}
      size={props.size}
      data={props.data}
      onSelect={props.onSelect as (legend: unknown) => void}
    />
  </div>
);
