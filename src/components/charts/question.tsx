import { RoundChart } from "./round";

type QuestionChartProps = {
  title: string;
  data: [number, number, number];
  size?: number;
  onHide?: (legend: boolean | null | undefined) => void;
};

export const QuestionChart = (props: QuestionChartProps) => (
  <RoundChart
    title={props.title}
    type="doughnut"
    labels={[
      { text: "Sí", match: true },
      { text: "No", match: false },
      { text: "Desconocido", match: null },
    ]}
    colors={["hsl(130, 85%, 50%)", "hsl(0, 100%, 50%)", "hsl(30, 0%, 50%)"]}
    size={props.size}
    data={props.data}
    onSelect={props.onHide as (legend: unknown) => void}
  />
);
