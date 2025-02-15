import { QuestionLabel } from "../../types/form";
import { RoundChart } from "./round";

type QuestionChartProps = {
  title: string;
  data: [number, number, number];
  size?: number;
  onHide?: (legend: boolean | null | undefined) => void;
};

const parseLegend = (text: QuestionLabel) => {
  switch (text) {
    case "Sí":
      return true;
    case "No":
      return false;
    default:
      return null;
  }
};

export const QuestionChart = (props: QuestionChartProps) => (
  <RoundChart
    title={props.title}
    type="doughnut"
    labels={["Sí", "No", "Desconocido"]}
    colors={["hsl(130, 85%, 50%)", "hsl(0, 100%, 50%)", "hsl(30, 0%, 50%)"]}
    size={props.size}
    data={props.data}
    parseLegend={parseLegend as (legend: string) => unknown}
    onHide={props.onHide as (legend: unknown) => void}
  />
);
