import Modal, { CloseBtn } from "../modal";
import { Dialog } from "@kobalte/core/dialog";
import SearchInput from "../search";
import { Search as SearchIcon } from "../../icons/header";
import { createSignal, JSX, Show } from "solid-js";
import History from "./search/history";
import ToggleGroup from "../toggle-group";
import Results from "./search/results";
import { searchRecords } from "../../lib/db";
import { Person } from "../../icons";
import { Family } from "../../icons/form";
import { Home } from "../../icons/aside";
import { DBSearch } from "../../types/db";

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

const Search = () => {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<DBSearch[keyof DBSearch][]>([]);
  const [filter, setFilter] = createSignal<keyof DBSearch>("jefe");

  return (
    <Modal
      trigger={
        <Dialog.Trigger class="flex items-center gap-1.5">
          <SearchIcon class="!h-[24px] sm:!size-[1.2em]" />
          <span class="hidden sm:inline">Buscar</span>
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
          onChange={async (query) => {
            setQuery(query);
            if (!query) return setResults([]);
            setResults(await searchRecords(query, filter(), paths()));
          }}
        />
        <CloseBtn class="mr-3" />
      </div>
      <ToggleGroup
        class="p-2 gap-3 justify-center *:w-full *:p-1"
        options={SEARCH_FILTERS}
        defaultValue={filter()}
        onChange={(filter) => {
          setFilter(filter as keyof DBSearch);
          if (query()) {
            setResults([]);
            searchRecords(query(), filter as keyof DBSearch).then((r) =>
              setResults(r)
            );
          }
        }}
      />
      <Show when={!query()}>
        <History />
      </Show>
      <Show when={query()}>
        <Results results={results()} filter={filter()} />
      </Show>
    </Modal>
  );
};
export default Search;
