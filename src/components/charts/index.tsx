import {
  ArcElement,
  BarController,
  Chart as ChartJS,
  Colors,
  DoughnutController,
  Legend,
  PieController,
  Tooltip,
  CategoryScale,
  LinearScale,
  registerables,
  ChartConfiguration,
  ChartType,
} from "chart.js";
import { JSX, onMount, Setter } from "solid-js";

ChartJS.register(
  BarController,
  DoughnutController,
  PieController,
  Legend,
  ArcElement,
  Tooltip,
  Colors,
  CategoryScale,
  LinearScale,
  ...registerables
);

type ChartProps<T extends ChartType> = {
  type: T;
  title: string;
  h?: number;
  w?: number;
  class?: string;
  data: number[];
  children?: JSX.Element;
  chartConfig: Omit<ChartConfiguration<T>, "type">;
  setChart?: Setter<ChartJS<T>>;
};

const Chart = <T extends ChartType>(props: ChartProps<T>) => {
  let c: HTMLCanvasElement;

  onMount(() => {
    const chart = new ChartJS(c!, {
      ...props.chartConfig,
      type: props.type,
    });

    props.setChart && props.setChart(chart);
  });

  return (
    !props.data.every((d) => d === 0) && (
      <div
        class={`flex flex-col items-center gap-2.5 p-2 px-4 rounded-xl bg-neutral-50 border div-border dark:bg-neutral-800 ${props.class}`}
      >
        <p class="text-xl font-bold text-center">{props.title}</p>
        <div
          style={{
            width: `${props.w || 125}px`,
            height: `${props.h || 125}px`,
          }}
        >
          <canvas ref={c!} />
        </div>
        {props.children}
      </div>
    )
  );
};
export default Chart;
