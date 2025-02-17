import {
  Chart,
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Colors,
} from "chart.js";
import { useTheme } from "../../hooks/useTheme";
import { onMount, createEffect } from "solid-js";

Chart.register(
  DoughnutController,
  PieController,
  Legend,
  Title,
  ArcElement,
  Tooltip,
  Colors
);

type NamedLabel = {
  text: string;
  match: unknown;
};

export type ChartProps = {
  type: "doughnut" | "pie";
  title: string;
  labels: (string | NamedLabel)[];
  colors?: `hsl(${number}, ${number}%, ${number}%)`[];
  data: number[];
  size?: number;
  // se usa para actualizar el filtro aplicado
  onSelect?: (legend: unknown | undefined) => void;
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

export const RoundChart = (props: ChartProps) => {
  let c: HTMLCanvasElement;

  onMount(() => {
    if (c!) {
      const chart = new Chart(c!, {
        type: props.type,
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: props.colors,
            },
          ],
        },
        options: {
          layout: {
            padding: 5,
          },
          plugins: {
            colors: {
              forceOverride: !props.colors,
            },
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
                generateLabels(chart) {
                  const data = chart.data;
                  if (data.labels!.length && data.datasets.length) {
                    const {
                      labels: { pointStyle },
                    } = chart.legend!.options;

                    return data.labels!.map((label, i) => {
                      const text =
                        typeof label === "string"
                          ? label
                          : (label as NamedLabel).text;
                      const meta = chart.getDatasetMeta(0);
                      const style = meta.controller.getStyle(i, true);

                      return {
                        text: `${text}: ${data["datasets"][0].data[i]}`,
                        fillStyle: style.backgroundColor,
                        strokeStyle: style.borderColor,
                        lineWidth: style.borderWidth,
                        pointStyle: pointStyle,
                        borderRadius: 2,
                        fontColor:
                          theme() === "dark" || media.matches
                            ? "white"
                            : "black",
                        hidden: !chart.getDataVisibility(i),
                        index: i,
                        match: (label as NamedLabel).match,
                        named: typeof label !== "string",
                      };
                    });
                  }
                  return [];
                },
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
                if (props.onSelect)
                  props.onSelect(
                    shouldShowOnlyOne
                      ? // @ts-expect-error
                        legendItem.named
                        ? (legendItem as NamedLabel).match
                        : legendItem.text
                      : undefined
                  );
              },
            },
            tooltip: {
              callbacks: {
                title: (context) =>
                  (context[0].label as unknown as NamedLabel).text,
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
    }
  });

  return (
    !props.data.every((d) => d === 0) && (
      <canvas
        ref={c!}
        style={{
          "min-width": `${props.size || 200}px`,
          "min-height": `${props.size || 200}px`,
          "max-height": "400px",
          "max-width": "400px",
        }}
        class="rounded-2xl bg-neutral-50 dark:bg-neutral-800 shadow-[0_0_3px_0_hsla(0,0%,0%,0.2)] dark:shadow-[0_0_0_1px] dark:shadow-neutral-700"
      />
    )
  );
};
