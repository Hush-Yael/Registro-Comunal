import { createEffect, createSignal, JSX } from "solid-js";
import Chart, { ChartProps } from ".";
import { Chart as ChartJS, ChartType } from "chart.js";
import { useTheme } from "../../hooks/useTheme";

type BarProps<T extends ChartType = "bar"> = Pick<
  ChartProps<T>,
  "class" | "title" | "data" | "w" | "h"
> & {
  labels: string[];
  colors?: string | string[];
  indexAxis?: "x" | "y";
  sMax?: number;
  sMin?: number;
  max?: number;
  min?: number;
  stepSize?: number;
  children?: JSX.Element;
};

const { theme } = useTheme(),
  media = window.matchMedia("(prefers-color-scheme: dark)");

const matchTheme = (dark: boolean, chart: ChartJS) => {
  if (!chart) return;
  const lines = [
      chart.options.scales!.y!.grid!,
      chart.options.scales!.x!.grid!,
    ],
    text = [chart.options.scales!.y!.ticks!, chart.options.scales!.x!.ticks!];

  if (dark) {
    lines.forEach((l) => (l.color = "hsl(0,0%,25%)"));
    text.forEach((l) => (l.color = "hsl(0,0%,70%)"));
  } else {
    lines.forEach((l) => (l.color = "rgb(0,0,0,0.1)"));
    text.forEach((l) => (l.color = "hsl(0,0%,50%)"));
  }

  chart.update();
};

const Bars = (props: BarProps) => {
  const [chart, setChart] = createSignal<ChartJS>();

  createEffect(() => {
    if (theme() === "dark") matchTheme(true, chart() as ChartJS);
    else if (theme() === "light") matchTheme(false, chart() as ChartJS);
    else matchTheme(media.matches, chart() as ChartJS);
  });

  if (theme() === "system") {
    media.addEventListener("change", (e) =>
      matchTheme(e.matches, chart() as ChartJS)
    );
  }

  return (
    <Chart
      data={props.data}
      type="bar"
      class={props.class}
      title={props.title}
      // @ts-ignore
      setChart={setChart}
      w={props.w}
      h={props.h}
      chartConfig={{
        data: {
          labels: props.labels,
          datasets: [
            {
              label: "",
              data: props.data,
              backgroundColor: "rgba(70, 192, 192, 0.6)",
              borderColor: props.colors || "rgba(150, 100, 255, 1)",
            },
          ],
        },
        options: {
          indexAxis: props.indexAxis,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const currentValue = context.raw as number,
                    total = context.dataset.data.reduce(
                      (a, b) => (a as number) + (b as number),
                      0
                    );

                  if (!total) return " " + currentValue;

                  const percentage = parseFloat(
                    ((currentValue / (total as number)) * 100).toFixed(1)
                  );

                  return ` ${currentValue} — (${percentage}%)`;
                },
              },
            },
          },
          scales: {
            [props.indexAxis === "y" ? "x" : "y"]: {
              min: props.min,
              max: props.max,
              suggestedMin: props.sMin,
              suggestedMax: props.sMax,
              ticks: {
                stepSize: props.stepSize,
              },
            },
          },
        },
      }}
    >
      {props.children}
    </Chart>
  );
};
export default Bars;
