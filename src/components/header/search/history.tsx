import { For, Match, Show, Switch } from "solid-js";
import { Hour } from "../../../icons/header";
import { HistoryEntry } from "../search";
import { PersonFilled, X } from "../../../icons";
import { FamilyFilled, ShopFilled } from "../../../icons/form";
import { HomeFilled } from "../../../icons/aside";

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
      when={props.history.length}
      fallback={
        <p class="fore text-lg text-center">No hay búsquedas recientes</p>
      }
    >
      <ul class="flex flex-col-reverse *:not-last:border-t-1 *:not-last:border-neutral-200 dark:*:not-last:border-[hsl(0,0%,20%)] !py-0 *:flex *:justify-between *:gap-1 *:py-1">
        <For each={props.history}>
          {(data) => (
            <li class="*:hover:bg-neutral-100 *:dark:hover:bg-[hsl(0,0%,20%)] *:rounded-md *:transition-colors">
              <button
                onClick={() => {
                  props.setQuery(data.query);
                  const input = document.getElementById(
                    "search-input"
                  ) as HTMLInputElement;

                  if (input)
                    setTimeout(() => {
                      input.focus();
                      input.setSelectionRange(
                        data.query.length,
                        data.query.length,
                        "forward"
                      );
                    });
                }}
                class="flex items-center flex-1 gap-3 p-2 "
              >
                <Switch>
                  <Match when={data.filter === "jefe"}>
                    <PersonFilled class="fore" />
                  </Match>
                  <Match when={data.filter === "family"}>
                    <FamilyFilled class="fore" />
                  </Match>
                  <Match when={data.filter === "homes"}>
                    <HomeFilled class="fore" />
                  </Match>
                  <Match when={data.filter === "businesses"}>
                    <ShopFilled class="fore" />
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
