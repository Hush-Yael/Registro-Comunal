import { RoundChart } from "./round";

export type QuestionChartMatch = 1 | 0 | null | undefined;
type QuestionChartProps = {
  title: string;
  data: [number, number, number];
  size?: number;
  onSelect?: (legend: QuestionChartMatch) => void;
};

export const QuestionChart = (props: QuestionChartProps) => (
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
);
