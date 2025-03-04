import Modal from "../dialog/modal";
import { Dialog } from "@kobalte/core/dialog";
import SearchInput from "../form/search";
import { Search as SearchIcon } from "../../icons/header";
import { createSignal, JSX, onCleanup, onMount, Show } from "solid-js";
import History from "./search/history";
import ToggleGroup from "../form/toggle-group";
import Results from "./search/results";
import { searchRecords } from "../../lib/db";
import { Person } from "../../icons";
import { Family } from "../../icons/form";
import { Home } from "../../icons/aside";
import { DBSearch } from "../../types/db";
import { RecordPath } from "../../types/form";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { effect } from "solid-js/web";
import { X } from "../../icons";
import Btn from "../layout/btn";

const SEARCH_FILTERS: {
  label: JSX.Element;
  value: keyof DBSearch;
}[] = [
  {
    label: (
      <>
        <Person />
        Jefe
      </>
    ),
    value: "jefe",
  },
  {
    label: (
      <>
        <Family />
        Familia
      </>
    ),
    value: "family",
  },
  {
    label: (
      <>
        <Home />
        Vivienda
      </>
    ),
    value: "home",
  },
];

const COMMON_PATHS = [
  { value: "cedula", label: "cédula" },
  "nombres",
  "apellidos",
];

type FilterPath<K extends keyof DBSearch, P = RecordPath<K>> =
  | P
  | { label: string; value: P };

const FILTERS_PATHS: { [K in keyof DBSearch]: FilterPath<K>[] } = {
  jefe: [
    ...(COMMON_PATHS as FilterPath<keyof DBSearch>[]),
    { label: "teléfono", value: "tel" },
    { label: "correo", value: "email" },
  ],
  family: [
    // @ts-ignore
    ...(COMMON_PATHS as FilterPath<"family">[]),
    // @ts-ignore
    { label: "Cédula del jefe", value: "jefeCedula" },
    // @ts-ignore
    { label: "Nombres del jefe", value: "jefeNombres" },
    // @ts-ignore
    { label: "Apellidos del jefe", value: "jefeApellidos" },
  ],
  home: [
    ...(COMMON_PATHS as FilterPath<"home">[]),
    { label: "número de casa", value: "numCasa" },
    "calle",
    "avenida",
    "referencia",
  ],
};

export type HistoryEntry = {
  filter: keyof DBSearch;
  query: string;
};

const Search = () => {
  const [results, setResults] = createSignal<DBSearch[keyof DBSearch][]>([]);
  const [filter, setFilter] = useLocalStorage<keyof DBSearch>(
    "search-table",
    "jefe"
  );

  const [lcPaths, setLcPaths] = useLocalStorage<typeof FILTERS_PATHS>(
    "search-paths",
    FILTERS_PATHS
  );

  const [paths, setPaths] = createSignal<RecordPath<keyof DBSearch>[]>(
    lcPaths()["jefe" as keyof typeof FILTERS_PATHS].map((p) =>
      typeof p === "string"
        ? p
        : (p as unknown as { value: RecordPath<keyof DBSearch> }).value
    ) as RecordPath<keyof DBSearch>[]
  );

  const [query, setQuery] = createSignal("");
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("history", []);
  const pushToHistory = () => {
    const _history = history(),
      last = _history[_history.length - 1];
    if (
      !query().trim() ||
      (last && filter() === last.filter && query() === last.query)
    )
      return;

    const newEntry = { filter: filter(), query: query() };

    setHistory(
      _history.length < 10
        ? [..._history, newEntry]
        : [..._history.slice(1), newEntry]
    );
  };

  effect(async () => {
    if (!query()) return setResults([]);
    else setResults(await searchRecords(query(), filter(), paths()));
  });

  const [modalOpen, setModalOpen] = createSignal(false);

  const k = (e: KeyboardEvent) => {
    if (e.ctrlKey && !modalOpen() && e.key.toLowerCase() === "k")
      setModalOpen(true);
  };

  onMount(() => {
    window.addEventListener("keydown", k);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", k);
  });

  return (
    <Modal
      open={modalOpen}
      setOpen={setModalOpen}
      onCleanup={pushToHistory}
      trigger={
        <Dialog.Trigger
          class="flex items-center gap-1.5"
          title="Buscar (Ctrl + K)"
        >
          <SearchIcon class="!h-[24px] sm:!size-[1.2em]" />
          <span class="items-center gap-2.5 hidden sm:flex">
            <span>Buscar</span>
            <span class="inline-flex gap-1 items-center px-1 bg-neutral-200 dark:bg-neutral-700 rounded-md *:font-[inherit] text-[.825rem] gray">
              <kbd>Ctrl</kbd>+<kbd>K</kbd>
            </span>
          </span>
        </Dialog.Trigger>
      }
      alert
      class="!w-[90vw] h-[90%] !p-0"
      contentClass="!gap-0 !p-0 div-y-neutral h-full max-h-full overflow-auto"
    >
      <div class="flex items-center gap-3">
        <SearchInput
          type="text"
          id="search"
          class="p-2 w-full focus:outline-0"
          inputClass="outline-0"
          placeholder="Buscar en los registros..."
          value={query()}
          debounce={500}
          onChange={setQuery}
        />
        <Btn onClick={[setQuery, ""]}>
          <X class="fore" />
        </Btn>
      </div>
      <ToggleGroup
        class="p-2 gap-3 justify-center *:w-full *:p-1"
        options={SEARCH_FILTERS}
        defaultValue={filter()}
        notNull
        onChange={(filter) => {
          setFilter(filter as keyof DBSearch);
          setPaths(
            lcPaths()[filter].map(
              (p: RecordPath<keyof DBSearch>) =>
                (typeof p === "string"
                  ? p
                  : (p as unknown as { value: RecordPath<keyof DBSearch> })
                      .value) as string
            )
          );

          // vuelve a buscar
          if (query()) {
            setResults([]);
            searchRecords(query(), filter as keyof DBSearch, paths()).then(
              (r) => setResults(r)
            );
          }
        }}
      />
      <ToggleGroup
        class="p-2 gap-3 *:px-2.5"
        options={
          FILTERS_PATHS[filter() as keyof typeof FILTERS_PATHS] as string[]
        }
        notNull
        value={paths() as string[]}
        multiple
        onChange={(p) => {
          setPaths(p as RecordPath<keyof DBSearch>[]);
          setLcPaths({
            ...lcPaths(),
            [filter()]: p,
          });
        }}
      />
      <Show when={!query()}>
        <History
          history={history()}
          setHistory={setHistory}
          setQuery={setQuery}
        />
      </Show>
      <Show when={query()}>
        <Results results={results()} filter={filter()} />
      </Show>
    </Modal>
  );
};
export default Search;
