import { For, Match, Show, Switch } from "solid-js";
import { Hour } from "../../../icons/header";
import { HistoryEntry } from "../search";
import { Person, X } from "../../../icons";
import { Family } from "../../../icons/form";
import { Home } from "../../../icons/aside";

const History = (props: {
  history: HistoryEntry[];
  setHistory: (history: HistoryEntry[]) => void;
  setQuery: (query: string) => void;
}) => (
  <div class="relative div-y-neutral h-full max-h-full overflow-auto *:p-3">
    <h2 class="flex items-center gap-2">
      <Hour class="!h-[1.5em]" />
      Búsquedas recientes
    </h2>
    <Show
      when={history.length}
      fallback={
        <p class="fore text-lg text-center">No hay búsquedas recientes</p>
      }
    >
      <ul class="flex flex-col-reverse *:not-last:border-t-1 *:not-last:border-neutral-200 dark:*:not-last:border-[hsl(0,0%,20%)] !py-0 *:flex *:justify-between *:gap-1 *:py-1">
        <For each={props.history}>
          {(data) => (
            <li class="*:hover:bg-neutral-100 *:dark:hover:bg-[hsl(0,0%,20%)] *:rounded-md *:transition-colors">
              <button
                onClick={() => props.setQuery(data.query)}
                class="flex items-center flex-1 gap-3 p-2 "
              >
                <Switch>
                  <Match when={data.filter === "jefe"}>
                    <Person class="fore" />
                  </Match>
                  <Match when={data.filter === "family"}>
                    <Family class="fore" />
                  </Match>
                  <Match when={data.filter === "home"}>
                    <Home class="fore" />
                  </Match>
                </Switch>
                {data.query}
              </button>
              <button
                class="px-2"
                onClick={() => {
                  props.setHistory(props.history.filter((e) => e !== data));
                }}
              >
                <X class="fore" />
              </button>
            </li>
          )}
        </For>
      </ul>
    </Show>
  </div>
);
export default History;
