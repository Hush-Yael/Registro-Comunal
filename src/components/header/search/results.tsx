import { For, Show } from "solid-js";
import Cedula from "../../../components/cedula";
import { RecordKey } from "../../../types/form";
import Familiar from "./familiar";
import Homes from "./homes";
import { DBSearch } from "../../../types/db";

type ToShowProps<K extends keyof DBSearch> = {
  filter: RecordKey;
  data: DBSearch[K];
};

const ToShow = <K extends keyof DBSearch>(props: ToShowProps<K>) => {
  switch (props.filter) {
    case "jefe":
      return (
        <Cedula
          link
          readOnly
          class="min-w-full max-w-[unset] dark:!border-neutral-600 dark:!bg-neutral-700 !shadow-none"
          data={(props as ToShowProps<"jefe">).data}
        />
      );
    case "family":
      return <Familiar data={(props as ToShowProps<"family">).data} />;
    case "homes":
      return <Homes data={(props as ToShowProps<"homes">).data} />;
    default:
      return (
        <p class="max-w-full p-3 break-words overflow-auto">
          {JSON.stringify(props.data)}
        </p>
      );
  }
};

const Results = (props: { results: any[]; filter: RecordKey }) => (
  <ul class="flex flex-col justify-center gap-4 p-2">
    <Show when={!props.results.length}>
      <li class="p-3 fore text-lg text-center">No se encontraron resultados</li>
    </Show>
    <Show when={props.results.length}>
      <For each={props.results}>
        {(data) => (
          <li class="*:rounded-lg *:bg-neutral-100 dark:*:bg-[#333] *:shadow">
            <ToShow filter={props.filter} data={data} />
          </li>
        )}
      </For>
    </Show>
  </ul>
);

export default Results;
