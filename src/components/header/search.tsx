import Modal, { CloseBtn } from "../modal";
import { Dialog } from "@kobalte/core/dialog";
import SearchInput from "../search";
import { Search as SearchIcon } from "../../icons/header";
import { createSignal, Show } from "solid-js";
import History from "./search/history";
import ToggleGroup from "../toggle-group";
import Results from "./search/results";
import { searchRecords } from "../../lib/db";

const SEARCH_FILTERS = [
  { label: "Cedula", value: "cedula" },
  { label: "Nombres", value: "nombres" },
  { label: "Apellidos", value: "apellidos" },
];

const Search = () => {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<any[]>([]);
  const [filters, setFilters] = createSignal<string[]>([]);

  return (
    <Modal
      trigger={
        <Dialog.Trigger aria-label="buscar">
          <SearchIcon class="!h-[24px]" />
        </Dialog.Trigger>
      }
      alert
      class="!w-[90vw] h-[90%] !p-0"
      contentClass="!gap-0 !p-0 div-y-neutral h-full max-h-full overflow-auto"
    >
      <div class="flex items-center gap-3">
        <SearchInput
          id="search"
          class="w-full focus:outline-0"
          placeholder="Buscar en los registros..."
          autocomplete="off"
          value={query()}
          debounce={500}
          onInput={async (query) => {
            setQuery(query);
            setResults(await searchRecords(query, filters()));
          }}
        />
        <CloseBtn class="mr-3" />
      </div>
      <ToggleGroup
        class="p-2"
        multiple
        options={SEARCH_FILTERS}
        onChange={(filters) => setFilters(filters as string[])}
      />
      <Show when={!query()}>
        <History />
      </Show>
      <Show when={query()}>
        <Results results={results()} />
      </Show>
    </Modal>
  );
};
export default Search;
