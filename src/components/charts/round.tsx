import { Chart as ChartJS, LegendItem } from "chart.js";
import { createSignal, Show, For, createUniqueId } from "solid-js";
import { effect } from "solid-js/web";
import Chart from ".";

export type NamedLabel = {
  text: string;
  match: unknown;
};

export type RoundChartProps = {
  class?: string;
  type: "doughnut" | "pie";
  title: string;
  labels: (string | NamedLabel)[];
  colors?: `hsl(${number}, ${number}%, ${number}%)`[];
  data: number[];
  size?: number;
  listClass?: string;
  // se usa para actualizar el filtro aplicado
  onSelect?: (legend: unknown | undefined) => void;
};

const [activeChart, setActiveChart] = createSignal("");

export const RoundChart = (props: RoundChartProps) => {
  let list: HTMLUListElement;
  const id = createUniqueId(),
    [chart, setChart] = createSignal<ChartJS>(),
    [legends, setLegends] = createSignal<LegendItem[]>([]);

  const handleClick = (legendItem: LegendItem) => {
    const { index, hidden } = legendItem;
    const Chart = chart()!,
      legends = Chart.legend!.legendItems!;

    const shouldShowOnlyOne = hidden || legends.every((l) => !l.hidden);

    for (let i = 0; i < legends.length; i++) {
      const l = legends[i];
      if (!hidden) Chart.toggleDataVisibility(l.index!);
      else if (!l.hidden || index === l.index)
        Chart.toggleDataVisibility(l.index!);
    }

    if (!hidden) Chart.toggleDataVisibility(index!);

    Chart.update();
    setLegends(Chart.legend!.legendItems!);

    if (props.onSelect) {
      const s = shouldShowOnlyOne
        ? // @ts-expect-error
          legendItem.named
          ? (legendItem as NamedLabel).match
          : legendItem.text
        : undefined;
      props.onSelect(s);
      setActiveChart(id);
    }
  };

  effect(() => {
    if (chart()) {
      setLegends(chart()!.legend!.legendItems!);

      if (activeChart() && id !== activeChart()) {
        const Chart = chart(),
          legends = Chart!.legend!.legendItems!;

        const toShow = legends.filter((l) => l.hidden).map((l) => l.index);
        if (!toShow.length) return;

        toShow.forEach((l) => Chart!.toggleDataVisibility(l!));
        Chart!.update();
        setLegends(Chart!.legend!.legendItems!);
      }
    }
  });

  return (
    <Chart
      data={props.data}
      w={props.size}
      h={props.size}
      title={props.title}
      type={props.type}
      chartConfig={{
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
          plugins: {
            colors: {
              forceOverride: !props.colors,
            },
            legend: {
              display: false,
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
                boxWidth: 12,
                boxHeight: 12,
              },
            },
            tooltip: {
              callbacks: {
                title: (context) =>
                  (context[0].label as unknown as NamedLabel).text,
                label: function (context) {
                  const currentValue = context.raw as number,
                    total =
                      //@ts-ignore
                      context.chart._metasets[context.datasetIndex].total;

                  const percentage = parseFloat(
                    ((currentValue / total) * 100).toFixed(1)
                  );

                  return ` ${percentage}% — (${currentValue})`;
                },
              },
            },
          },
        },
      }}
      // @ts-ignore
      setChart={setChart}
    >
      <ul
        ref={list!}
        class={`flex flex-wrap justify-center gap-1 gap-x-2.5 ${
          props.listClass || ""
        }`}
      >
        <Show when={legends().length}>
          <For each={legends()}>
            {(legend) => (
              <li>
                <button
                  onClick={() => handleClick(legend)}
                  data-hidden={legend.hidden}
                  class="//flex items-center gap-2 data-[hidden=true]:decoration-1 decoration-black dark:decoration-white data-[hidden=true]:line-through data-[hidden=true]:text-neutral-500 text-left"
                >
                  <span
                    class="inline-block mr-1.5 rounded-sm border border-[#0005] dark:border-[#fff9] size-[12px]"
                    style={{ background: legend.fillStyle as string }}
                  />
                  <span class="first-letter:uppercase">{legend.text}</span>
                </button>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </Chart>
  );
};
