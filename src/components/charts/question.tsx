import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useTheme } from "../../hooks/useTheme";
import { createEffect, onMount } from "solid-js";
import { QuestionLabel } from "../../types/form";

Chart.register(DoughnutController, Legend, Title, ArcElement, Tooltip);

type ChartProps = {
  title: string;
  data: [number, number, number];
  size?: number;
  onHide?: (legend: boolean | null | undefined) => void;
};

const { theme } = useTheme(),
  media = window.matchMedia("(prefers-color-scheme: dark)");

const matchTheme = (dark: boolean, chart: Chart) => {
  const title = chart.options.plugins!.title!,
    labels = chart.options.plugins!.legend!.labels;

  if (dark) {
    title.color = "white";
    labels!.color = "white";
  } else {
    title.color = "black";
    labels!.color = "black";
  }

  chart.update();
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

export const QuestionChart = (props: ChartProps) => {
  let c: HTMLCanvasElement;

  onMount(() => {
    const chart = new Chart(c!, {
      type: "doughnut",
      data: {
        labels: ["Sí", "No", "Desconocido"] as QuestionLabel[],
        datasets: [
          {
            data: props.data,
            backgroundColor: [
              "hsl(130, 85%, 50%)",
              "hsl(0, 100%, 50%)",
              "hsl(30, 0%, 50%)",
            ],
          },
        ],
      },
      options: {
        layout: {
          padding: 5,
        },
        plugins: {
          title: {
            display: true,
            text: props.title,
            font: {
              family: "Afacad",
              size: 19,
            },
          },
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: { family: "Afacad", size: 15 },
            },
            onClick: function (_, legendItem, legend) {
              const { index, hidden } = legendItem;
              const shouldShowOnlyOne =
                hidden || legend.legendItems!.every((l) => !l.hidden);

              for (let i = 0; i < legend.legendItems!.length; i++) {
                const l = legend.legendItems![i];
                if (!hidden) chart.toggleDataVisibility(l.index!);
                else if (!l.hidden || index === l.index)
                  chart.toggleDataVisibility(l.index!);
              }

              if (!hidden) chart.toggleDataVisibility(index!);

              chart.update();
              if (props.onHide)
                props.onHide(
                  shouldShowOnlyOne
                    ? parseLegend(legendItem.text as QuestionLabel)
                    : undefined
                );
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const currentValue = context.raw as number,
                  //@ts-ignore
                  total = context.chart._metasets[context.datasetIndex].total;

                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );

                return ` ${percentage}% — (${currentValue})`;
              },
            },
          },
        },
      },
    });

    createEffect(() => {
      if (theme() === "dark") matchTheme(true, chart);
      else if (theme() === "light") matchTheme(false, chart);
      else matchTheme(media.matches, chart);
    });

    if (theme() === "system") {
      media.addEventListener("change", (e) => matchTheme(e.matches, chart));
    }
  });

  return (
    <canvas
      ref={c!}
      width={props.size || 200}
      height={props.size || 200}
      class="rounded-2xl bg-neutral-50 dark:bg-neutral-800 shadow-[0_0_3px_0_hsla(0,0%,0%,0.2)] dark:shadow-[0_0_0_1px] dark:shadow-neutral-700"
    />
  );
};
