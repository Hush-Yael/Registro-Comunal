import { For, Show } from "solid-js";
import Cedula from "../../../pages/record/components/cedula";
import { ComunalRecord } from "../../../types/form";
import Familiar from "./familiar";
import Home from "./home";
import { DBSearch } from "../../../types/db";

interface ToShowProps {
  filter: keyof ComunalRecord;
  data: ComunalRecord[keyof ComunalRecord];
}

const ToShow = (props: ToShowProps) => {
  switch (props.filter) {
    case "jefe":
      return (
        <Cedula
          class="dark:!border-neutral-600 dark:!bg-neutral-700 !shadow-none"
          data={props.data as DBSearch["jefe"]}
        />
      );
    case "family":
      return <Familiar data={props.data as unknown as DBSearch["family"]} />;
    case "home":
      return <Home data={props.data as DBSearch["home"]} />;
    default:
      return (
        <p class="max-w-full p-3 break-words overflow-auto">
          {JSON.stringify(props.data)}
        </p>
      );
  }
};

const Results = (props: { results: any[]; filter: keyof ComunalRecord }) => (
  <ul class="flex flex-col gap-4 p-2">
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
